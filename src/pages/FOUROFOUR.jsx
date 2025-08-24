import { Link } from "react-router-dom";

// 404 Page
const FOUROFOUR = () => {
  return (
    <main
      className="container"
      style={{
        textAlign: "center",
        padding: "5rem 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          color: "crimson",
          marginBottom: "1rem",
          textShadow: "0 0 10px rgba(255,0,0,0.6), 0 0 20px rgba(255,0,0,0.4)",
          animation: "pulse 1.5s infinite",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        🚀 Oops! You’ve wandered into the cosmic void.  
        The page you seek does not exist in this universe.
      </p>

      <figure style={{ marginBottom: "2rem" }}>
        <img
          src="https://media.giphy.com/media/l3q2XB76CaWPggiNW/giphy.gif"
          alt="Lost in space"
          style={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 0 15px rgba(255,0,0,0.3)",
          }}
        />
        <figcaption style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
          Our astronauts couldn’t find the page either.
        </figcaption>
      </figure>

      <Link to="/" role="button">
        🏠 Beam Me Back Home
      </Link>

      {/* Inline keyframes for the glowing 404 */}
      <style>
        {`
          @keyframes pulse {
            0% { text-shadow: 0 0 10px rgba(255,0,0,0.6), 0 0 20px rgba(255,0,0,0.4); }
            50% { text-shadow: 0 0 20px rgba(255,0,0,1), 0 0 40px rgba(255,0,0,0.8); }
            100% { text-shadow: 0 0 10px rgba(255,0,0,0.6), 0 0 20px rgba(255,0,0,0.4); }
          }
        `}
      </style>
    </main>
  );
};

export default FOUROFOUR;