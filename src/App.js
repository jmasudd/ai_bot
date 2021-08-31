import "./App.css";
import React, { useState } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/Facerecognition";
import Register from "./components/Register/Register";

const clarifai = new Clarifai.App({
  apiKey: "dbe4b66c51ab445f8a971a8da93e7acf",
});

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};
function App() {
  const [imageUrl, setImageUrl] = useState("gg");
  const [box, setBox] = useState("gg");
  const [route, setRoute] = useState("signin");
  const [isdn, setisdn] = useState(false);

  const rchange = (route) => {
    setRoute(route);
    if (route === "signin") {
      setisdn(false);
    } else if (route === "home") {
      setisdn(true);
    } else if (route === "register") {
      setisdn(false);
    }
    console.log(route);
  };

  const calculateFaceLocation = (data) => {
    const boundingbox =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("image");
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      l: boundingbox.left_col * width,
      r: width - boundingbox.right_col * width,
      t: boundingbox.top_row * height,
      b: height - boundingbox.bottom_row * height,
    };
  };

  const showBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onButtonsubmit = () => {
    clarifai.models
      .predict("a403429f2ddf4b49b307e318f00e528b", imageUrl)
      .then((response) => showBox(calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation rchange={rchange} isdn={isdn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonsubmit={onButtonsubmit}
          />
          <FaceRecognition box={box} url={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <SignIn rchange={rchange} />
      ) : (
        <Register rchange={rchange} />
      )}
    </div>
  );
}

export default App;
