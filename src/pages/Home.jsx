import { useState, useEffect } from "react";

const Home = () => {
  const creatorsArray = [
    "https://yt3.googleusercontent.com/PlAIozzj7_kpNBrKr7QthpfrPQ4zXCdgq1qWPLLCoujUz8i0IQ3CxK2mehF1YBrCyFlQ9r7wwHE=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/ytc/AIdro_mP1aza51ezNHZdlu-31Djm4ahXXq4nvFfPd_Vsi6FjpYg=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/avEB_XnXgDUjG5-s8aCxXSNC5ttkWxdfxup4m_XB2Kmsis-P2uzzkhXgg-HnRbyjpdUkRw8KZg=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/GOwlwlIMVnfQ3MXusklwRa7O44_V5ydopPYwuLD0BXNDDEvD7TB_n5qv-LUAoyznRjAkHwuiSw=s160-c-k-c0x00ffffff-no-rj",
    "https://yt3.googleusercontent.com/ytc/AIdro_mnbbz7MFKX9-cW9WT9sOq6xoWqf0S9VF_C3W00vz9C2UA=s176-c-k-c0x00ffffff-no-rj-mo",
    "https://yt3.googleusercontent.com/8qn2MIOXj7QqigkzBKFAOcDV24h3ZvYGvMMl22HBm9RGoyL-9-th1PaC45zsyrBQmx9AlVISSkg=s176-c-k-c0x00ffffff-no-rj-mo",
  ];

  const [currentCreator, setCurrentCreator] = useState("");

  useEffect(() => {
    const changeCreator = () => {
      const randomIndex = Math.floor(Math.random() * creatorsArray.length);
      setCurrentCreator(creatorsArray[randomIndex]);
    };

    changeCreator(); 

    const intervalId = setInterval(changeCreator, 3000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      {currentCreator && (
        <img
          src={currentCreator}
          alt="Random Creator"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default Home;