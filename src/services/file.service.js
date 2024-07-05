import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/firebase";

class FileService {
  uploadImage(file, path, onUploadProgress) {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, `${path}/${this.getUniqueFileName(file)}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.handleProgressUpdate(snapshot, onUploadProgress);
        },
        (err) => {
          reject(err.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  }

  getUniqueFileName(file) {
    const dotIndex = file.name.lastIndexOf(".");
    const fileName = file.name.substring(0, dotIndex);
    const fileExtension = file.name.substring(dotIndex);
    const timestamp = new Date().getTime();
    return `${fileName}-${timestamp}${fileExtension}`;
  }

  handleProgressUpdate(snapshot, onUploadProgress) {
    if (onUploadProgress) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onUploadProgress(progress);
    }
  }

  async deleteFile(downloadUrl) {
    const fileRef = ref(storage, downloadUrl);
    await deleteObject(fileRef);
  }
}

const service = new FileService();
export default service;