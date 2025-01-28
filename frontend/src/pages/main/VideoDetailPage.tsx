// src/pages/video/VideoDetailPage.tsx
import { useNavigate, useParams } from "react-router-dom";

const VideoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">비디오 상세</h1>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            메인
          </button>
          <button
            onClick={() => navigate(`/tree/${id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded w-48"
          >
            가족 보기
          </button>
          <button
            onClick={() => navigate("/user/1")}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-48"
          >
            상대 프로필
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
