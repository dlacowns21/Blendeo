import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVideoStore from "../../store/videoStore";

const VideoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mergedVideoUrl = useVideoStore((state) => state.mergedVideoUrl);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">비디오 상세</h1>

        {mergedVideoUrl && (
          <div className="mb-6">
            <video
              ref={videoRef}
              src={mergedVideoUrl}
              className="w-full aspect-video bg-black rounded mb-4"
              controls
              autoPlay
            />
          </div>
        )}

        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48 hover:bg-blue-600"
          >
            메인
          </button>
          <button
            onClick={() => navigate(`/tree/${id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded w-48 hover:bg-green-600"
          >
            가족 보기
          </button>
          <button
            onClick={() => navigate("/user/1")}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-48 hover:bg-yellow-600"
          >
            상대 프로필
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
