import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import CardForm from "./components/CardForm";
import { getTodayDateStr, formatDate } from "./utils";
import logo from './assets/logo.png';



function App() {
  const [values, setValues] = useState({
    bvText: "BV/KOC",
    witness: false,
    review: false,
    name: "",
    date: getTodayDateStr()
  });
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [signatureFileName, setSignatureFileName] = useState(null);
  const [signatureSize, setSignatureSize] = useState(1);
  const [signatureHue, setSignatureHue] = useState(0);
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
              <span className="no-signature">No signature uploaded (.jpg, .png accepted)</span>
            )}
          </div>
          
          <input
            id="signature-upload"
            className="signature-upload-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setSignatureFileName(file.name);
                const reader = new FileReader();
                reader.onload = ev => setSignatureUrl(ev.target.result);
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
            </div>
          )}
        </div>
        <div className="form-footer">
          <img src={logo} alt="Logo" className="footer-logo" />
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
          />
        </div>
        <button className="download-btn" onClick={downloadPNG}>
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
