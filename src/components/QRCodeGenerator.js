import React, { useState } from 'react';
import {saveAs} from "file-saver";

const QRCodeGenerator = () => {
  const [data, setData] = useState('');
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const [format, setFormat] = useState('png');
  const [qrColor, setQRColor] = useState('#000000');
  const [bgColor, setBGColor] = useState('#ffffff');
  const [qrCodeURL, setQRCodeURL] = useState('');
  const handleGenerateQRCode = async () => {
    try {
      const qrCodeURL = 
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          data
        )}&size=${width}x${height}&format=${format}&color=${qrColor.slice(
          1
        )}&bgcolor=${bgColor.slice(1)}`;
        if(!data){
            alert(" Please provide valid data to generate QR image");
            return;
          }
      console.log("Response: "+ qrCodeURL);
      setQRCodeURL(qrCodeURL)
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleDownload = () => {
    if(!data){
        alert(" Please provide valid data to Download QR image");
        return;
    }
    saveAs(qrCodeURL,"qrImage");
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      Enter Data: {" "}
      <input
        type="text"
        placeholder="Enter data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <br/>
      Width : {" "}
      <input
        type="number"
        placeholder="Width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      {" "}
      Height : {" "}
      <input
        type="number"
        placeholder="Height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <br/>
      Format : {" "}
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="svg">SVG</option>
      </select>
      <br/>
      QR Color : {" "}
      <input
        type="color"
        value={qrColor}
        onChange={(e) => setQRColor(e.target.value)}
      />
      <br/>
     Background Color : {" "}
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBGColor(e.target.value)}
      />
      <br/>
      <button className="generate-button" onClick={handleGenerateQRCode}>Generate</button><br/>
      <button className="download-button" onClick={handleDownload}>Download</button>
      <br/><br/>
      {qrCodeURL &&
      (<img src={qrCodeURL} alt="generatedQR"/>)
        }
    </div>
  );
};

export default QRCodeGenerator;
