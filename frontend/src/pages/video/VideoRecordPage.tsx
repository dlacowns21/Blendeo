import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VideoRecordPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const forkedVideoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");
  const forkedVideoPath = "/test-video.mp4";
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        if (forkedVideoRef.current) {
          forkedVideoRef.current.src = forkedVideoPath;
          forkedVideoRef.current.muted = false;
          await forkedVideoRef.current.load();
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err) {
        setError("카메라 초기화 실패");
        console.error("초기화 에러:", err);
      }
    };

    initializeVideo();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    if (!streamRef.current || !forkedVideoRef.current) return;

    try {
      recordedChunksRef.current = []; // ref만 초기화

      const forkedVideo = forkedVideoRef.current;
      forkedVideo.currentTime = 0;

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: "video/webm;codecs=vp8,opus",
        videoBitsPerSecond: 2500000,
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.onstart = async () => {
        setIsRecording(true);
        try {
          await forkedVideo.play();
        } catch (err) {
          setError("포크된 비디오 재생 실패");
          stopRecording();
        }
      };

      mediaRecorder.ondataavailable = (event) => {
        console.log("데이터 수집:", event.data.size);
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          console.log(
            "청크 추가. 현재 청크 수:",
            recordedChunksRef.current.length
          );
        }
      };

      mediaRecorder.onstop = () => {
        setIsRecording(false);
        try {
          const endTime = forkedVideo.currentTime;
          forkedVideo.pause();

          console.log("녹화 종료시 청크 수:", recordedChunksRef.current.length);

          const recordedBlob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });
          console.log("생성된 Blob:", recordedBlob);

          if (recordedBlob.size === 0) {
            throw new Error("녹화된 데이터가 없습니다.");
          }

          // Blob을 Base64로 변환
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              // Base64 문자열에서 실제 데이터 부분만 추출
              const base64data = reader.result.toString();
              sessionStorage.setItem("recordedVideo", base64data);
              sessionStorage.setItem("forkedVideo", forkedVideoPath);
              sessionStorage.setItem("forkedEndTime", endTime.toString());

              console.log("세션스토리지 저장 완료:", {
                forkedVideo: forkedVideoPath,
                forkedEndTime: endTime,
                recordedVideoSize: recordedBlob.size,
              });

              navigate("/video/edit");
            }
          };
          reader.readAsDataURL(recordedBlob);
        } catch (err) {
          setError("비디오 저장 실패");
          console.error("비디오 처리 에러:", err);
        }
      };

      mediaRecorder.start(1000);
    } catch (err) {
      setError("녹화 시작 실패");
      console.error("녹화 에러:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">영상 촬영</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="aspect-video bg-black rounded overflow-hidden">
            <video
              ref={forkedVideoRef}
              className="w-full h-full object-contain"
              playsInline
            />
            <p className="text-white text-sm p-2">포크된 영상</p>
          </div>
          <div className="aspect-video bg-black rounded overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              autoPlay
              playsInline
              muted
            />
            <p className="text-white text-sm p-2">내 촬영</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`${
              isRecording ? "bg-red-500" : "bg-blue-500"
            } text-white px-6 py-3 rounded-lg font-semibold w-48 transition-colors`}
          >
            {isRecording ? "촬영 종료" : "촬영 시작"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold w-48"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoRecordPage;
