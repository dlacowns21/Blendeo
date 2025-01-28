// src/pages/main/MainPage.tsx
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">메인 페이지</h1>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/video/1")}
            className="bg-green-500 text-white px-4 py-2 rounded w-48"
          >
            영상
          </button>
          <button
            onClick={() => navigate("/video/record")}
            className="bg-purple-500 text-white px-4 py-2 rounded w-48"
          >
            영상 만들기
          </button>
          <button
            onClick={() => navigate("/mypage")}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-48"
          >
            마이페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
