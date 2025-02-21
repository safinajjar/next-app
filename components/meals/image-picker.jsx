"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  const handlePick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="image selected by the user" fill />
          )}
        </div>
        <input
          hidden
          ref={imageInput}
          className={classes.input}
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handlePick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
