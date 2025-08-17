import "@picocss/pico/css/pico.min.css";

const Footer = () => {
  return (
    <footer className="container-fluid" style={{ borderTop: "1px solid #ddd", marginTop: "2rem", padding: "1rem 0" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Branding */}
        <p style={{ margin: 0 }}>
          <strong>CreatorVerse</strong> &copy; {new Date().getFullYear()}
        </p>

        {/* Navigation Links */}
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "1rem",
              margin: 0,
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>
              <a
                href="https://github.com/DiandreMiller"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="/privacy">Privacy</a>
            </li>
            <li>
              <a href="/terms">Terms</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;