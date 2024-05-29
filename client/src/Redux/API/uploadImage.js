import Axios from "./Axios";

const uploadService = async (file, onUploadProgress) => {
  try {
    const response = await Axios.post(`/upload`, file, {
      onUploadProgress: onUploadProgress, 
    });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Upload failed, please try again");
    }
  } catch (error) {
    console.error("Something went wrong, please try again", error);
    throw error;
  }
};

export { uploadService };