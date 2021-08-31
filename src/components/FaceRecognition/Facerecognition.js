import React from "react";
import "./Facerecognition.css";

const FaceRecognition = ({ url, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img alt="" id="image" src={url} width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{ top: box.t, right: box.r, bottom: box.b, left: box.l }}
        ></div>
      </div>
    </div>
  );
};
export default FaceRecognition;
