import toast from "react-hot-toast";
import { likeMovieAction } from "../Redux/Action/userAction";
import axios from "axios";
import { saveAs } from 'file-saver';

const likeMovieFunc = (id, userInfo, dispatch) => {
    if (!userInfo) {
       return toast.error("You need to login to like a movie");
    }
    dispatch(likeMovieAction(id));
};

const downloadVideo = async (url, setLoading) => {
    try {
        setLoading(true);
        const loadingToast = toast.loading("Downloading video...");
        const response = await axios.get('http://localhost:8000/api/upload/movie/b4d21baf-f9e1-4375-8c3e-2d88f40debe9.mp4', {
            responseType: 'blob',
        });
        toast.dismiss(loadingToast);
        saveAs(response.data, 'video.mp4');
        toast.success("Download completed!");
    } catch (error) {
        console.error('Error downloading the video:', error);
        toast.dismiss();
        toast.error("Error downloading the video");
    } finally {
        setLoading(false);
    }
};

  
export { likeMovieFunc, downloadVideo };
