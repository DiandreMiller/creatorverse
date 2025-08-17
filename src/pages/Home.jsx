import { useState, useEffect, useRef } from "react";
import "@picocss/pico/css/pico.min.css";
import "../components/cosmic.css"; 

const Home = () => {
  const creatorsArray = [
    "https://yt3.googleusercontent.com/PlAIozzj7_kpNBrKr7QthpfrPQ4zXCdgq1qWPLLCoujUz8i0IQ3CxK2mehF1YBrCyFlQ9r7wwHE=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/ytc/AIdro_mP1aza51ezNHZdlu-31Djm4ahXXq4nvFfPd_Vsi6FjpYg=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/avEB_XnXgDUjG5-s8aCxXSNC5ttkWxdfxup4m_XB2Kmsis-P2uzzkhXgg-HnRbyjpdUkRw8KZg=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/GOwlwlIMVnfQ3MXusklwRa7O44_V5ydopPYwuLD0BXNDDEvD7TB_n5qv-LUAoyznRjAkHwuiSw=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/ytc/AIdro_mnbbz7MFKX9-cW9WT9sOq6xoWqf0S9VF_C3W00vz9C2UA=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/8qn2MIOXj7QqigkzBKFAOcDV24h3ZvYGvMMl22HBm9RGoyL-9-th1PaC45zsyrBQmx9AlVISSkg=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/83vLzxAWN8Fa0Tzo56n5i6PrXQtEri0Sz28LecGgZF5rGuv8YDvo7qU2yGcq1_yRYRviHtWz=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/ytc/AIdro_k9-AutVZhQRS68PVGPZKZt3sccHvhnY0wyWihEKeG-6Q=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.ggpht.com/cuzJXw7E5zQFjubsBTCwO7joRnvuhekyBXmvJTCondxWiOBpANxxoxXvU0fEx0rOaL6ueJORbQ=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/ZTgTKC0JyuYCXjocrB-kyftYVRQ_q5AwoHb-5geIscRPXBluZv7laz0QMF_HICjY7Lqe4b_g-Qs=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/yLBjfGExL_iEyNmOd5VjEVt6tQWg8Upr1mpafHQfsv-MU3875DnCI74VsslG0lZtiGjg0lf1wTk=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.ggpht.com/OAONz3oAx1BmChjbCCG9ZFMGiOXsBkoTX-qc2noEI9Aik7hK4FuV1n2EiiEZZJ4M3raCiuOdkQ=s88-c-k-c0x00ffffff-no-rj",
  ];

  const [mode, setMode] = useState("single"); // "single" | "grid"
  const [currentCreator, setCurrentCreator] = useState("");
  const lastIndexRef = useRef(-1);

  // Rotate featured image every 3s in "single" mode
  useEffect(() => {
    const pickRandom = () => {
      if (!creatorsArray.length) return;
      let idx = Math.floor(Math.random() * creatorsArray.length);
      if (creatorsArray.length > 1 && idx === lastIndexRef.current) {
        idx = (idx + 1) % creatorsArray.length;
      }
      lastIndexRef.current = idx;
      setCurrentCreator(creatorsArray[idx]);
    };

    if (mode === "single") {
      pickRandom();
      const id = setInterval(pickRandom, 3000);
      return () => clearInterval(id);
    }
  }, [mode]);

  // Switch to grid after 36s
  useEffect(() => {
    const toGrid = setTimeout(() => setMode("grid"), 36000);
    return () => clearTimeout(toGrid);
  }, []);

  // When in grid, go back to single after 5s
  useEffect(() => {
    if (mode !== "grid") return;
    const back = setTimeout(() => setMode("single"), 5000);
    return () => clearTimeout(back);
  }, [mode]);

  return (
    <main className="container cosmic-background">
      <header style={{ textAlign: "center", paddingTop: "1.5rem" }}>
        <h1 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>
          Discover Creators
        </h1>
        <p style={{ opacity: 0.9 }}>A little cosmic magic while you browse ✨</p>
      </header>

      {mode === "single" ? (
        <article style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <figure style={{ display: "inline-block" }}>
            {currentCreator ? (
              <img
                src={currentCreator}
                alt="Featured creator"
                className="featured-creator"
              />
            ) : (
              <progress aria-busy="true" />
            )}
            <figcaption style={{ marginTop: "0.75rem", opacity: 0.85 }}>
              Featured Creator
            </figcaption>
          </figure>
        </article>
      ) : (
        <div className="creator-grid">
          {creatorsArray.slice(0, 12).map((url, i) => (
            <div key={i}>
              <article className="creator-card">
                <figure style={{ padding: "12px" }}>
                  <img
                    src={url}
                    alt={`Creator ${i + 1}`}
                    loading="lazy"
                    className="creator-image"
                  />
                  <figcaption style={{ marginTop: "8px", opacity: 0.86 }}>
                    Creator {i + 1}
                  </figcaption>
                </figure>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;