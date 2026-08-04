'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: '#050608',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, fontSize: '72px', fontWeight: 600, opacity: 0.15 }}>
            Oops
          </p>
          <h1 style={{ margin: '16px 0 0', fontSize: '24px', fontWeight: 500 }}>
            The avatar needs a moment.
          </h1>
          <p style={{ maxWidth: '420px', margin: '8px 0 0', color: 'rgba(255,255,255,.5)', fontSize: '14px' }}>
            Something went wrong while loading the page. You can safely try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '32px',
              border: '1px solid rgba(255,255,255,.15)',
              borderRadius: '999px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,.05)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
