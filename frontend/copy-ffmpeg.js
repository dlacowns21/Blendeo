import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FFmpeg 코어 파일들의 소스 경로를 umd 폴더로 수정
const ffmpegCorePath = path.join(
  __dirname,
  "node_modules",
  "@ffmpeg",
  "core",
  "dist",
  "umd"
);
const publicPath = path.join(__dirname, "public");

// public 폴더가 없다면 생성
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

// 복사할 파일들 (worker.js 제외)
const files = ["ffmpeg-core.js", "ffmpeg-core.wasm"];

// 파일 복사 함수
files.forEach((file) => {
  const src = path.join(ffmpegCorePath, file);
  const dest = path.join(publicPath, file);

  // 파일 존재 여부 먼저 확인
  if (!fs.existsSync(src)) {
    console.error(`File not found: ${src}`);
    return;
  }

  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.error(`Error copying ${file}:`, err);
    } else {
      console.log(`${file} copied successfully from ${src} to ${dest}`);
    }
  });
});
