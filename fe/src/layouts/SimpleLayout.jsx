import { Outlet } from "react-router-dom";

const SimpleLayout = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,155,60,0.08) 0%, transparent 60%), linear-gradient(180deg, #1A1C29 0%, #0B0C10 50%, #13151F 100%)",
      }}
    >
      {/* Decorative corner runes */}
      <div
        className="absolute top-6 left-8 text-4xl pointer-events-none select-none"
        style={{ color: "rgba(200,155,60,0.06)", fontFamily: "'Cinzel', Georgia, serif" }}
      >
        ✦
      </div>
      <div
        className="absolute top-6 right-8 text-4xl pointer-events-none select-none"
        style={{ color: "rgba(200,155,60,0.06)", fontFamily: "'Cinzel', Georgia, serif" }}
      >
        ✦
      </div>
      <div
        className="absolute bottom-6 left-8 text-4xl pointer-events-none select-none"
        style={{ color: "rgba(200,155,60,0.06)", fontFamily: "'Cinzel', Georgia, serif" }}
      >
        ✦
      </div>
      <div
        className="absolute bottom-6 right-8 text-4xl pointer-events-none select-none"
        style={{ color: "rgba(200,155,60,0.06)", fontFamily: "'Cinzel', Georgia, serif" }}
      >
        ✦
      </div>

      {/* Radial glow behind form */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(200,155,60,0.05) 0%, transparent 70%)",
        }}
      />

      <Outlet />
    </div>
  );
};

export default SimpleLayout;
