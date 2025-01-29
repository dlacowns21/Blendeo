// src/services/videoService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const videoService = {
  async uploadVideo(videoBlob: Blob, metadata: any) {
    const formData = new FormData();
    formData.append("video", videoBlob);
    formData.append("metadata", JSON.stringify(metadata));

    const response = await axios.post(`${API_URL}/videos/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async getForkedVideo(videoId: string) {
    const response = await axios.get(`${API_URL}/videos/${videoId}`);
    return response.data;
  },
};
