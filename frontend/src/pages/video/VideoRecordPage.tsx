// src/pages/video/VideoRecordPage.tsx
import { useNavigate } from "react-router-dom";

const VideoRecordPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">영상 촬영</h1>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/video/edit")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            촬영 완료
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded w-48"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoRecordPage;
