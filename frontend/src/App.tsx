// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import VideoDetailPage from "./pages/main/VideoDetailPage";
import TreePage from "./pages/family/TreePage";
import VideoRecordPage from "./pages/video/VideoRecordPage";
import VideoEditPage from "./pages/video/VideoEditPage";
import VideoUploadPage from "./pages/video/VideoUploadPage";
import UserPage from "./pages/user/UserPage";
import MyPage from "./pages/user/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
        <Route path="/tree/:id" element={<TreePage />} />
        <Route path="/video/record" element={<VideoRecordPage />} />
        <Route path="/video/edit" element={<VideoEditPage />} />
        <Route path="/video/upload" element={<VideoUploadPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
