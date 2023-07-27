import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/firebase";

class FileService {
  uploadImage(file, onUploadProgress) {
    return new Promise((resolve, reject) => {
      const fileRef = ref(
        storage,
        "profile-images/" + this.getUniqueFileName(file)
      );
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // handle update
          // listen to updates
          this.handleProgressUpdate(snapshot, onUploadProgress);
        },
        (err) => {
          // handle error
          reject(err.message);
        },
        () => {
          // get downLoadUrl for completed upload
          // resolve our promise
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            // resolve the download url
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
    return fileName + "-" + timestamp + fileExtension;
  }

  handleProgressUpdate(snapshot, onUploadProgress) {
    if (onUploadProgress) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onUploadProgress(progress);
    }
  }

  async deleteFile(downloadUrl) {
    // get a reference to the file we want to remove
    const fileRef = ref(storage, downloadUrl);
    // remove the file using the file reference
    await deleteObject(fileRef);
  }
}

const service = new FileService();
export default service;
