// src/pages/video/VideoUploadPage.tsx
import { useNavigate } from "react-router-dom";

const VideoUploadPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">영상 업로드</h1>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/video/1")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            업로드
          </button>
          <button
            onClick={() => navigate("/video/edit")}
            className="bg-gray-500 text-white px-4 py-2 rounded w-48"
          >
            다시 편집하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadPage;
