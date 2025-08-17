import { useState, useEffect, useRef } from "react";
import "@picocss/pico/css/pico.min.css";

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

  const [mode, setMode] = useState("single");
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

  // Schedule: show grid at 36s, then return to single at 41s
  useEffect(() => {
    const toGrid = setTimeout(() => setMode("grid"), 36000);
    const backToSingle = setTimeout(() => setMode("single"), 36000 + 5000);
    return () => {
      clearTimeout(toGrid);
      clearTimeout(backToSingle);
    };
  }, []);

  return (
    <main className="container" style={{ position: "relative", overflow: "hidden" }}>
      {/* Cosmic animated background layers */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background:
            "radial-gradient(1200px 800px at 10% 10%, rgba(255,0,128,0.12), transparent), radial-gradient(1000px 700px at 90% 20%, rgba(0,150,255,0.12), transparent), radial-gradient(900px 700px at 50% 100%, rgba(120,255,120,0.10), transparent), linear-gradient(120deg, #0a0a12 0%, #0b0f2a 50%, #120a1a 100%)",
          animation: "hueshift 16s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,0.8), transparent 60%), radial-gradient(2px 2px at 30% 80%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(1.5px 1.5px at 50% 30%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(1.75px 1.75px at 70% 60%, rgba(255,255,255,0.8), transparent 60%), radial-gradient(1.25px 1.25px at 85% 40%, rgba(255,255,255,0.6), transparent 60%)",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.6,
          animation: "twinkle 3s ease-in-out infinite alternate",
        }}
      />

      <header style={{ textAlign: "center", paddingTop: "1.5rem" }}>
        <h1 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>Discover Creators</h1>
        <p style={{ opacity: 0.9 }}>A little cosmic magic while you browse ✨</p>
      </header>

      {mode === "single" ? (
        <article style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <figure style={{ display: "inline-block" }}>
            {currentCreator ? (
              <img
                src={currentCreator}
                alt="Featured creator"
                style={{
                  width: "340px",
                  height: "340px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.45), 0 0 40px rgba(100,170,255,0.25), 0 0 80px rgba(255,120,200,0.18)",
                  animation: "float 6s ease-in-out infinite",
                }}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 280px)",
            gap: "20px",
            marginTop: "1.25rem",
          }}
        >
          {creatorsArray.slice(0, 12).map((url, i) => (
            <div key={i}>
              <article
                style={{
                  height: "100%",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "14px",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 36px rgba(0,0,0,0.45), 0 0 30px rgba(120,180,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
                }}
              >
                <figure style={{ padding: "12px" }}>
                  <img
                    src={url}
                    alt={`Creator ${i + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    }}
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

      {/* Inline keyframes and small helpers */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-8px) }
          100% { transform: translateY(0px) }
        }
        @keyframes hueshift {
          0%   { filter: hue-rotate(0deg) saturate(1) }
          100% { filter: hue-rotate(25deg) saturate(1.1) }
        }
        @keyframes twinkle {
          0%   { opacity: 0.45; transform: translateY(0px) }
          100% { opacity: 0.75; transform: translateY(-6px) }
        }
      `}</style>
    </main>
  );
};

export default Home;