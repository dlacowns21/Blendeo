// src/pages/family/TreePage.tsx
import { useNavigate, useParams } from "react-router-dom";

const TreePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">가족 관계도</h1>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate(`/video/${id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            영상 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreePage;
