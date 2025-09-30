
import React from "react";
import { formatDate } from "../utils";
import "./cardForm.css";

function CardForm({ values, signatureUrl, scale = 1 }) {
  return (
    <div className={`card-container${scale > 1 ? " card-scale" : ""}`}>
      <div className="common-font card-bv">{values.bvText || "BV / KOC"}</div>
      <div className="common-font card-check-row">
        <label className="card-check-label">
          <input
            type="checkbox"
            checked={values.witness}
            readOnly
            className="card-checkbox"
          />
          <span className={values.witness ? "checked-text" : "unchecked-text"}>Witness</span>
        </label>
        <label className="card-check-label">
          <input
            type="checkbox"
            checked={values.review}
            readOnly
            className="card-checkbox"
          />
          <span className={values.review ? "checked-text" : "unchecked-text"}>Review</span>
        </label>
      </div>
      <div className="common-font card-label">
        Name: <span className="distinctive-font card-field">{values.name || "----------"}</span>
      </div>
      <div className="common-font card-label">
        Date: <span className="distinctive-font card-field">{formatDate(values.date)}</span>
      </div>
      {signatureUrl && (
        <img src={signatureUrl} alt="signature" className="card-signature" />
      )}
    </div>
  );
}
export default CardForm;