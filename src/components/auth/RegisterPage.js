import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ImageSelector from "../common/ImageSelector";
import Alert from "../common/Alert";
import FileService from "../../services/file.service";
import ProfileService from "../../services/profile.service";
import { Profile } from "../../models/Profile";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  async function onFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let downloadUrl = null;
      if (file) {
        downloadUrl = await FileService.uploadImage(
          file,
          "profile-images",
          (progress) => setUploadProgress(progress)
        );
      }

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await ProfileService.saveProfile(
        new Profile({
          id: userCred.user.uid,
          name: name,
          surname: surname,
          imageUrl: downloadUrl,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="container my-5">
      <div className="card card-body">
        <h1>Register</h1>
        <p>Please enter your details to register</p>

        <form onSubmit={onFormSubmit}>
          <ImageSelector
            title="Profile Picture"
            onFileChange={(file) => setFile(file)}
          />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{width: `${uploadProgress}%`}}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {uploadProgress.toFixed(0)}%
              </div>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Surname</label>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button type="submit" className="px-5" loading={loading}>
              Register
            </Button>
          </div>
        </form>

        <Alert className="mt-3" show={error} onClose={() => setError("")}>
          {error}
        </Alert>
      </div>
    </div>
  );
}