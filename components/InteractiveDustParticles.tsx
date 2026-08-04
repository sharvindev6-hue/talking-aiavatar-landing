'use client';

/* =============================================================================
   InteractiveDustParticles  (FULL-PAGE)
   -----------------------------------------------------------------------------
   A React Three Fiber particle system that fills the ENTIRE viewport.
   Designed to mount ONCE as a `position: fixed; inset: 0` layer behind all
   page content, so motes are visible across the whole scroll length.

   The particle volume is large in Y so motes exist above and below the
   camera's current view, but we keep the camera Z small so the full screen
   is always populated. Mouse position is tracked globally (window-level),
   so the influence field works regardless of scroll position.

   TUNING KNOBS:
     - PARTICLE_COUNT      : how many motes
     - FIELD_RADIUS        : how far mouse influence reaches (world units)
     - REPULSION_STRENGTH  : close-range push force
     - ATTRACTION_STRENGTH : far-range drift force
     - DAMPING             : velocity decay per frame
     - NOISE_AMPLITUDE     : ambient idle jitter
     - Y_VOLUME            : vertical extent of particle spawn area
     - X_VOLUME            : horizontal extent
   ============================================================================= */

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ---- TUNING -----------------------------------------------------------------
const PARTICLE_COUNT = 2200;
const FIELD_RADIUS = 1.6;          // mouse influence radius (world units)
const REPULSION_STRENGTH = 0.05;   // close-range push
const ATTRACTION_STRENGTH = 0.003; // far-range drift
const DAMPING = 0.94;              // velocity decay per frame
const NOISE_AMPLITUDE = 0.0009;   // ambient idle jitter
const X_VOLUME = 10;               // horizontal spread
const Y_VOLUME = 18;               // vertical spread (tall = full page feel)
const Z_VOLUME = 4;                // depth spread
// -----------------------------------------------------------------------------

function useParticleBuffers(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    // Seed particles across a tall 3D volume
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * X_VOLUME;
      positions[i * 3 + 1] = (Math.random() - 0.5) * Y_VOLUME;
      positions[i * 3 + 2] = (Math.random() - 0.5) * Z_VOLUME - 1; // pushed back
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, velocities };
  }, [count]);
}

function WebGLContextGuard() {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
    };
    const handleContextRestored = () => {
      invalidate();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl, invalidate]);

  return null;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, size } = useThree();
  const particleCount = size.width < 768 ? 1200 : PARTICLE_COUNT;
  const { positions, velocities } = useParticleBuffers(particleCount);
  const isPaused = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePausedState = () => {
      isPaused.current = document.hidden || reducedMotion.matches;
    };
    updatePausedState();
    document.addEventListener('visibilitychange', updatePausedState);
    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener('change', updatePausedState);
    } else {
      reducedMotion.addListener(updatePausedState);
    }
    return () => {
      document.removeEventListener('visibilitychange', updatePausedState);
      if (reducedMotion.removeEventListener) {
        reducedMotion.removeEventListener('change', updatePausedState);
      } else {
        reducedMotion.removeListener(updatePausedState);
      }
    };
  }, []);

  // Mouse position in world space. Default far away so particles rest.
  const mouseWorld = useRef(new THREE.Vector3(999, 999, 999));

  useEffect(() => {
    const updatePointerPosition = (clientX: number, clientY: number) => {
      // Pixel -> NDC (-1..1), shared by mouse and touch input.
      const ndcX = (clientX / size.width) * 2 - 1;
      const ndcY = -((clientY / size.height) * 2 - 1);
      mouseWorld.current.set(
        ndcX * (viewport.width / 2),
        ndcY * (viewport.height / 2),
        0
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updatePointerPosition(touch.clientX, touch.clientY);
    };
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updatePointerPosition(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = () => {
      mouseWorld.current.set(999, 999, 999);
    };

    // Window-level listeners keep the field active while the user touches
    // anywhere on the page. The canvas remains pointer-events-none for links.
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [size, viewport]);

  useFrame(() => {
    if (isPaused.current) return;

    const positionsAttr = pointsRef.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (!positionsAttr) return;

    const arr = positionsAttr.array as Float32Array;
    const m = mouseWorld.current;

    const X_HALF = X_VOLUME / 2;
    const Y_HALF = Y_VOLUME / 2;

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      const dx = m.x - positions[ix];
      const dy = m.y - positions[ix + 1];
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq) || 0.0001;

      if (dist < FIELD_RADIUS) {
        if (dist < FIELD_RADIUS * 0.35) {
          // Close: strong repulsion
          const force = REPULSION_STRENGTH / dist;
          velocities[ix] -= (dx / dist) * force;
          velocities[ix + 1] -= (dy / dist) * force;
        } else {
          // Far-ish: gentle attraction toward cursor
          velocities[ix] += dx * ATTRACTION_STRENGTH;
          velocities[ix + 1] += dy * ATTRACTION_STRENGTH;
        }
      }

      // Ambient noise for life
      velocities[ix] += (Math.random() - 0.5) * NOISE_AMPLITUDE;
      velocities[ix + 1] += (Math.random() - 0.5) * NOISE_AMPLITUDE;

      // Damping
      velocities[ix] *= DAMPING;
      velocities[ix + 1] *= DAMPING;

      // Integrate
      positions[ix] += velocities[ix];
      positions[ix + 1] += velocities[ix + 1];

      // Soft wrap so motes never escape the volume
      if (positions[ix] > X_HALF) positions[ix] = -X_HALF;
      if (positions[ix] < -X_HALF) positions[ix] = X_HALF;
      if (positions[ix + 1] > Y_HALF) positions[ix + 1] = -Y_HALF;
      if (positions[ix + 1] < -Y_HALF) positions[ix + 1] = Y_HALF;

      arr[ix] = positions[ix];
      arr[ix + 1] = positions[ix + 1];
      arr[ix + 2] = positions[ix + 2];
    }

    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={new THREE.Color('#9ad6ff')}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function InteractiveDustParticles() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 3], fov: 55 }}
      style={{
        background: 'transparent',
        // Critical: make every pixel of the canvas pass clicks through
        // to whatever sits underneath (e.g. the Launch Avatar App link).
        pointerEvents: 'none',
      }}
    >
      <WebGLContextGuard />
      <ParticleField />
    </Canvas>
  );
}
