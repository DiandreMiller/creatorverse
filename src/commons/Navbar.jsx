import { Link, useLocation } from "react-router-dom";
import "@picocss/pico/css/pico.min.css";
import "../components/cosmic.css"; // keep consistent cosmic vibe

const Navbar = () => {
  const location = useLocation();

  return (
    <header
      style={{
        background:
          "linear-gradient(90deg, rgba(32,0,64,0.9) 0%, rgba(0,0,32,0.9) 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.55)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
        }}
      >
      
        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            color: "#fff",
            textShadow: "0 0 12px rgba(200,100,255,0.9)",
            letterSpacing: "1px",
          }}
        >
          ✨ CreatorVerse ✨
        </div>

        {/* Navigation Links */}
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            margin: 0,
            listStyle: "none",
          }}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/show-creators", label: "Show Creators" },
            { to: "/add-creator", label: "Add Creator" },
          ].map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    color: isActive ? "#ffd700" : "#eee",
                    fontWeight: isActive ? "700" : "400",
                    textDecoration: "none",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    background: isActive
                      ? "rgba(255, 215, 0, 0.15)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 0 12px rgba(255,215,0,0.4)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffd700";
                    e.currentTarget.style.textShadow =
                      "0 0 8px rgba(255,215,0,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? "#ffd700" : "#eee";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;