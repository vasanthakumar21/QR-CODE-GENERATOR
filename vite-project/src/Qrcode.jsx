import React, { useState } from "react";
import "./Orcode.css";
// import qrcode from "../../src/assets/qrcode.webp";

const Qrcode = () => {
  const [imgi, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrdata] = useState("");
  const [qrsize, setQrsize] = useState();
  async function genrate() {
    setLoading(true);
    try {
      const size = parseInt(qrsize, 10);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        qrdata
      )}`;
      setImg(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const download = () => {
    fetch(imgi)
      .then((Response) => Response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qr.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };
  return (
    <div className="box">
      <div className=" app-container">
        <h1> QR CODE GENERATOR</h1>
        {loading && <p> Please Wait Loading </p>}
        {imgi && <img src={imgi} className="qr-code-image" />}
        <div>
          <label htmlFor="dataInput" className="label">
            {" "}
            Data for Qr code
          </label>
          <input
            type="text"
            id="dataInput"
            className="input"
            value={qrdata}
            onChange={(e) => setQrdata(e.target.value)}
          />
          <label htmlFor="dataInput" className="label">
            {" "}
            Image size (e.g,150){" "}
          </label>
          <input
            type="text"
            id="dataInput"
            value={qrsize}
            className="input"
            onChange={(e) => setQrsize(e.target.value)}
          />
          <button className="generate-button" onClick={genrate}>
            {" "}
            Generate Qr Code
          </button>
          <button className="download-button" onClick={download}> Download Qr Code</button>
        </div>
        <p> Designed by Vasanth</p>
      </div>
    </div>
  );
};

export default Qrcode;
