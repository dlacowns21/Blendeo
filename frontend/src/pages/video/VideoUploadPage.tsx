import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import useVideoStore from "../../store/videoStore";

const VideoUploadPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localMergedVideoUrl, setLocalMergedVideoUrl] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const setStoreVideoUrl = useVideoStore((state) => state.setMergedVideoUrl);

  useEffect(() => {
    const mergeVideos = async () => {
      setIsProcessing(true);
      try {
        console.log("FFmpeg 프로세스 시작...");

        if (!crossOriginIsolated) {
          throw new Error("SharedArrayBuffer 지원이 필요합니다.");
        }

        // FFmpeg 로드
        if (!ffmpegRef.current.loaded) {
          try {
            console.log("FFmpeg 로드 시작...");
            ffmpegRef.current.on("log", ({ message }) => {
              console.log("FFmpeg 로그:", message);
            });
            await ffmpegRef.current.load();
            console.log("FFmpeg 로드 완료");
          } catch (err) {
            console.error("FFmpeg 로드 중 오류:", err);
            throw err;
          }
        }

        const recordedVideoData = sessionStorage.getItem("recordedVideo");
        const forkedVideoPath = sessionStorage.getItem("forkedVideo");

        if (!recordedVideoData || !forkedVideoPath) {
          throw new Error("영상 데이터를 찾을 수 없습니다.");
        }

        setProgress(20);
        console.log("비디오 데이터 처리 시작...");

        // Base64 데이터를 Blob으로 변환
        const base64Response = await fetch(recordedVideoData);
        const recordedBlob = await base64Response.blob();

        // test-video.mp4 파일 가져오기
        const forkedResponse = await fetch(forkedVideoPath);
        const forkedBlob = await forkedResponse.blob();

        console.log("비디오 데이터 처리 완료");
        setProgress(40);

        // FFmpeg에 파일 쓰기
        console.log("파일 쓰기 시작...");
        try {
          const forkedUint8Array = new Uint8Array(
            await forkedBlob.arrayBuffer()
          );
          await ffmpegRef.current.writeFile("forked.mp4", forkedUint8Array);
          console.log("첫 번째 파일 쓰기 완료");

          const recordedUint8Array = new Uint8Array(
            await recordedBlob.arrayBuffer()
          );
          await ffmpegRef.current.writeFile(
            "recorded.webm",
            recordedUint8Array
          );
          console.log("두 번째 파일 쓰기 완료");
        } catch (writeError) {
          console.error("파일 쓰기 중 오류:", writeError);
          throw writeError;
        }

        setProgress(60);
        console.log("FFmpeg 실행 시작...");

        // 녹화 종료 시간 가져오기
        const endTime = sessionStorage.getItem("forkedEndTime");
        if (!endTime) {
          throw new Error("녹화 종료 시간을 찾을 수 없습니다.");
        }

        console.log("녹화 종료 시간:", endTime, "초");

        // 비디오 병합 명령어 실행
        await ffmpegRef.current.exec([
          "-i",
          "forked.mp4",
          "-i",
          "recorded.webm",
          "-t",
          endTime,
          "-filter_complex",
          "[0:v]scale=1280:720,fps=25[v0];[1:v]scale=1280:720,fps=25[v1];[v0][v1]vstack=inputs=2[outv];[0:a][1:a]amix=inputs=2[outa]",
          "-map",
          "[outv]",
          "-map",
          "[outa]",
          "-c:v",
          "h264",
          "-preset",
          "ultrafast",
          "-profile:v",
          "baseline",
          "-level",
          "3.0",
          "-maxrate",
          "2M",
          "-bufsize",
          "2M",
          "-vsync",
          "vfr",
          "-c:a",
          "aac",
          "-strict",
          "experimental",
          "output.mp4",
        ]);

        console.log("FFmpeg 실행 완료");
        setProgress(80);

        // 결과 파일 읽기 및 화면에 표시
        console.log("결과 파일 처리 시작...");
        const outputData = await ffmpegRef.current.readFile("output.mp4");
        const outputBlob = new Blob([outputData], { type: "video/mp4" });
        const url = URL.createObjectURL(outputBlob);
        setLocalMergedVideoUrl(url); // 로컬 상태 업데이트
        console.log("결과 파일 처리 완료");

        setProgress(100);
      } catch (err) {
        console.error("비디오 병합 중 오류:", err);
        setError(
          err instanceof Error
            ? err.message
            : "영상 처리 중 오류가 발생했습니다."
        );
      } finally {
        setIsProcessing(false);
      }
    };

    mergeVideos();

    return () => {
      if (localMergedVideoUrl) {
        URL.revokeObjectURL(localMergedVideoUrl);
      }
    };
  }, []);

  const handleUpload = async () => {
    if (!localMergedVideoUrl) {
      setError("업로드할 영상이 없습니다.");
      return;
    }

    try {
      setIsProcessing(true);
      // store에 URL 저장
      setStoreVideoUrl(localMergedVideoUrl);
      navigate("/video/1");
    } catch (err) {
      setError("처리 중 오류가 발생했습니다.");
      console.error("처리 중 오류:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">영상 업로드</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isProcessing ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            <p>비디오 처리중... {progress}%</p>
          </div>
        ) : (
          <>
            {localMergedVideoUrl && (
              <div className="mb-4">
                <video
                  ref={videoRef}
                  src={localMergedVideoUrl}
                  className="w-full aspect-video bg-black rounded"
                  controls
                />
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleUpload}
                disabled={isProcessing || !localMergedVideoUrl}
                className="px-6 py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400"
              >
                업로드
              </button>
              <button
                onClick={() => navigate("/video/edit")}
                disabled={isProcessing}
                className="px-6 py-3 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-400"
              >
                다시 편집하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUploadPage;
