// src/pages/auth/SignupPage.tsx
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">회원가입</h1>
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded w-48"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
