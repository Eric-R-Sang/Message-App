import React, { useRef, useState } from "react";

export default function ImageSelector({ title, onFileChange }) {
  // persists values between renders
  // can be used to store a mutable value that does not cause a re-render
  const inputRef = useRef(null);
  // { current: <value> }

  const [fileContent, setFileContent] = useState("");

  function onFileSelected(e) {
    let file = null;

    if (e.target.files.length) {
      file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = (res) => {
        setFileContent(res.target.result);
      };
      fileReader.readAsDataURL(file);
    }

    onFileChange(file);
  }

  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={onFileSelected}
      ></input>

      {fileContent ? (
        <div className="text-center mb-3">
          <img
            alt="Movie image"
            style={{
              width: "200px",
              heigh: "250px",
              objectFit: "cover",
            }}
            src={fileContent}
          ></img>
        </div>
      ) : (
        <></>
      )}

      <div className="text-center">
        <button
          className="btn btn-success"
          type="button"
          onClick={() => {
            // console.log(inputRef.current);
            // Now it's like we're clicking the 'choose file' input
            inputRef.current.click();
          }}
        >
          Select Image
        </button>
      </div>
    </div>
  );
}
