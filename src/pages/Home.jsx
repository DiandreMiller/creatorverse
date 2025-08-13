import { useState, useEffect, useRef } from "react";

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
    "https://yt3.ggpht.com/4KUjfV32IGE5oyrJyrpz1Q2bQlLXTlteDWJckbQB7fgAEfN0SUdUH8oN-aSqz79OyKKa9m7d_mo=s68-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/yLBjfGExL_iEyNmOd5VjEVt6tQWg8Upr1mpafHQfsv-MU3875DnCI74VsslG0lZtiGjg0lf1wTk=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.ggpht.com/OAONz3oAx1BmChjbCCG9ZFMGiOXsBkoTX-qc2noEI9Aik7hK4FuV1n2EiiEZZJ4M3raCiuOdkQ=s88-c-k-c0x00ffffff-no-rj",
  ];

  // 'single' = rotating 400x400 image; 'grid' = 4x3 all creators
  const [mode, setMode] = useState("single");
  const [currentCreator, setCurrentCreator] = useState("");
  const lastIndexRef = useRef(-1);

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

  useEffect(() => {
    const toGrid = setTimeout(() => setMode("grid"), 60_000);
    const backToSingle = setTimeout(() => setMode("single"), 70_000);

    return () => {
      clearTimeout(toGrid);
      clearTimeout(backToSingle);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {mode === "single" ? (
        currentCreator && (
          <img
            src={currentCreator}
            alt="Random Creator"
            style={{
              width: "400px",
              height: "400px",
              objectFit: "cover",
              display: "block",
            }}
          />
        )
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", 
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "12px",
            width: "100vw",
            height: "100vh",
            padding: "12px",
          }}
        >
          {creatorsArray.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Creator ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;