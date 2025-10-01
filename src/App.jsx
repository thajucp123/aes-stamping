import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import CardForm from "./components/CardForm";
import { getTodayDateStr, formatDate } from "./utils";
import logo from './assets/logo.png';



function App() {
  const [values, setValues] = useState({
    bvText: "",
    witness: false,
    review: false,
    name: "",
    date: getTodayDateStr()
  });
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [originalSignatureUrl, setOriginalSignatureUrl] = useState(null);
  const [signatureFileName, setSignatureFileName] = useState(null);
  const [signatureSize, setSignatureSize] = useState(1);
  const [signatureHue, setSignatureHue] = useState(0);
  const [signatureSaturation, setSignatureSaturation] = useState(10);
  const [signatureBrightness, setSignatureBrightness] = useState(1.2);
  const [hasUploadedAfile,setHasUploadedAfile]= useState(false);
  const offscreenRef = useRef();

  const downloadPNG = async () => {
    offscreenRef.current.style.display = "flex";
    await new Promise(r => setTimeout(r, 110));
    const canvas = await html2canvas(offscreenRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 3
    });
    const link = document.createElement("a");
    link.download = `${values.witness ? "W" : ""}${values.review ? "R" : ""}_${values.name}_${values.bvText}_${formatDate(values.date)}.png`;
    link.href = canvas.toDataURL();
    link.click();
    /*offscreenRef.current.style.display = "none";*/
  };

  useEffect(() => {
    if (!originalSignatureUrl) {
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = originalSignatureUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");

      ctx.filter = `
        sepia(1)
        saturate(${signatureSaturation})
        brightness(${signatureBrightness})
        hue-rotate(180deg)
        hue-rotate(${signatureHue}deg)
      `;

      ctx.drawImage(image, 0, 0);
      setSignatureUrl(canvas.toDataURL());
    };
  }, [
    originalSignatureUrl,
    signatureSaturation,
    signatureBrightness,
    signatureHue,
  ]);

  return (
    <div className="app-root">
      <form className="input-panel" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="bvText">Representing Agency:</label>
          <input
            id="bvText"
            type="text"
            value={values.bvText}
            onChange={e => setValues(v => ({ ...v, bvText: e.target.value }))}
            autoComplete="off"
            placeholder="Eg: BV/KOC"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Inspector Name:</label>
          <input
            id="fullName"
            type="text"
            value={values.name}
            onChange={e => setValues(v => ({ ...v, name: e.target.value }))}
            autoComplete="off"
            placeholder="Enter Name"
            maxLength={17}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Stamp Date:</label>
          <input
            id="date"
            type="date"
            value={values.date}
            onChange={e =>
              setValues(v => ({
                ...v,
                date: e.target.value || getTodayDateStr()
              }))
            }
          />
        </div>
        <div className="form-group checks">
          <label>
            <input
              type="checkbox"
              checked={values.witness}
              onChange={e =>
                setValues(v => ({
                  ...v,
                  witness: e.target.checked
                }))
              }
            />
            Witness
          </label>
          <label>
            <input
              type="checkbox"
              checked={values.review}
              onChange={e =>
                setValues(v => ({
                  ...v,
                  review: e.target.checked
                }))
              }
            />
            Review
          </label>
        </div>
        <div className="form-group">
          <div className="signature-filename">
            {signatureFileName || (
              <span className="no-signature">No signature uploaded (transparent .png accepted)</span>
            )}
          </div>
          
          <input
            id="signature-upload"
            className="signature-upload-input"
            type="file"
            accept="image/png"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setSignatureFileName(file.name);
                setHasUploadedAfile(true);
                const reader = new FileReader();
                reader.onload = ev => setOriginalSignatureUrl(ev.target.result);
                reader.readAsDataURL(file);
              }
            }}
          />
          {signatureUrl && (
            <div className="sliders-container">
              <div className="slider-group">
                <label htmlFor="signature-size">Size</label>
                <input
                  id="signature-size"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.01"
                  value={signatureSize}
                  onChange={e => setSignatureSize(e.target.value)}
                />
              </div>
              <div className="slider-group">
                <label htmlFor="signature-hue">Hue</label>
                <input
                  id="signature-hue"
                  type="range"
                  min="0"
                  max="360"
                  value={signatureHue}
                  onChange={e => setSignatureHue(e.target.value)}
                />
              </div>
              <div className="slider-group">
                <label htmlFor="signature-saturation">Saturation</label>
                <input
                  id="signature-saturation"
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={signatureSaturation}
                  onChange={e => setSignatureSaturation(e.target.value)}
                />
              </div>
              <div className="slider-group">
                <label htmlFor="signature-brightness">Darkness</label>
                <input
                  id="signature-brightness"
                  type="range"
                  min="0"
                  max="2.4"
                  step="0.1"
                  value={signatureBrightness}
                  onChange={e => setSignatureBrightness(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="form-footer">
        <a href="https://www.aes-inspection.com" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" className="footer-logo" />
          </a>
          <p className="footer-text">
            Developed by <a href="https://www.thajucp.in/" target="_blank" rel="noopener noreferrer">ThajuCP</a>
          </p>
        </div>
      </form>

      <div className="view-panel">
        <div className="card-responsive-wrapper" ref={offscreenRef}>
          <CardForm
            values={values}
            signatureUrl={signatureUrl}
            signatureSize={signatureSize}
            signatureHue={signatureHue}
            signatureSaturation={signatureSaturation}
            signatureBrightness={signatureBrightness}
          />
        </div>
        <button className="download-btn" onClick={() => hasUploadedAfile ? downloadPNG(): alert("No signature uploaded")}>
          Download as PNG
        </button>

        {/* Offscreen rendering for image generation (old, I avoided it now) 
        <div
          className="offscreen"
          ref={offscreenRef}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw"
          }}
        >
          <div style={{ margin: "54px auto" }}>
            <CardForm
              values={values}
              signatureUrl={signatureUrl}
              signatureSize={signatureSize}
              signatureHue={signatureHue}
              signatureSaturation={signatureSaturation}
              signatureBrightness={signatureBrightness}
              scale={2}
            />
          </div>
        </div>
        */}

      </div>
    </div>
  );
}

export default App;
