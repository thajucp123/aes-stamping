
import React from "react";
import { formatDate } from "../utils";
import "./cardForm.css";
import tickMark from "../assets/tick_mark.png";

function CardForm({
  values,
  signatureUrl,
  signatureSize,
  signatureHue,
  signatureSaturation,
  signatureBrightness,
  scale = 1,
}) {
  return (
    <div className={`card-container${scale > 1 ? " card-scale" : ""}`}>
      <div className="common-font card-bv">{values.bvText || "BV / KOC"}</div>
      <div className="common-font card-check-row">
        <div className="card-check-item">
          <div className="card-check-box">
            {values.witness && <img src={tickMark} alt="tick" />}
          </div>
          <span>Witness</span>
        </div>
        <div className="card-check-item">
          <div className="card-check-box">
            {values.review && <img src={tickMark} alt="tick" />}
          </div>
          <span>Review</span>
        </div>
      </div>
      <div className="common-font card-label">
        Name: <span className="distinctive-font card-field">{values.name || "----------"}</span>
      </div>
      <div className="common-font card-label">
        Date: <span className="distinctive-font card-field">{formatDate(values.date)}</span>
      </div>
      {signatureUrl && (
        <img
          src={signatureUrl}
          alt="signature"
          className="card-signature"
          style={{
            transform: `scale(${signatureSize})`,
            filter: `sepia(1) saturate(${signatureSaturation}) brightness(${signatureBrightness}) hue-rotate(180deg) hue-rotate(${signatureHue}deg)`,
          }}
        />
      )}
    </div>
  );
}
export default CardForm;