export const ScanlineOverlay = () => {
    return (
        <>
            <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
            <style jsx global>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          opacity: 0.15;
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        @keyframes flicker {
          0% {
            opacity: 0.9;
          }
          5% {
            opacity: 0.8;
          }
          10% {
            opacity: 0.9;
          }
          15% {
            opacity: 0.85;
          }
          20% {
            opacity: 0.9;
          }
          25% {
            opacity: 0.8;
          }
          30% {
            opacity: 0.9;
          }
          35% {
            opacity: 0.85;
          }
          40% {
            opacity: 0.9;
          }
          45% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.85;
          }
          100% {
            opacity: 0.9;
          }
        }
        .animate-glitch {
          animation: glitch 500ms infinite;
        }
        .animate-flicker {
          animation: flicker 2s infinite;
        }
      `}</style>
        </>
    )
}
