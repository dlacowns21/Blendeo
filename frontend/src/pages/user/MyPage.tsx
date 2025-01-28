// src/pages/user/MyPage.tsx
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">마이 페이지</h1>
        <div className="user-info mb-8 text-center">
          <div>내 프로필</div>
          <div>팔로우/팔로잉</div>
          <div>내가 제작한 영상 목록</div>
          <div>내가 좋아요한 영상 목록</div>
        </div>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            메인
          </button>
          <button
            onClick={() => navigate("/video/1")}
            className="bg-green-500 text-white px-4 py-2 rounded w-48"
          >
            영상
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
