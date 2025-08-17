import '@picocss/pico/css/pico.min.css';

const Footer = () => {
  return (
    <footer className="container-fluid">
      <div className="container">
        <p>
          <strong>Creatorverse</strong> &copy; {new Date().getFullYear()}
        </p>
        <nav>
          <ul>
            <li><a href="https://github.com/DiandreMiller" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;