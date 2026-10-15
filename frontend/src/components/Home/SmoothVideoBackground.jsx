import { useRef, useEffect, useState } from "react";

const SmoothVideoBackground = ({ src, className }) => {
  const videoRef = useRef(null);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let interval;

    if (isReversing) {
      // عند التراجع: نقوم بإنقاص الوقت الحالي للملف بسرعة سلسة
      interval = setInterval(() => {
        if (video.currentTime <= 0.1) {
          clearInterval(interval);
          video.currentTime = 0;
          setIsReversing(false);
          video.play(); // تشغيل الفيديو للأمام مجدداً
        } else {
          video.currentTime -= 0.04; // معدل التراجع (~25 fps)
        }
      }, 40);
    }

    return () => clearInterval(interval);
  }, [isReversing]);

  // دالة تُستدعى تلقائياً عند وصول الفيديو للنهاية
  const handleEnded = () => {
    videoRef.current.pause();
    setIsReversing(true); // ابدأ العكس
  };

  return (
    <div className="fixed w-screen h-screen -z-10 bg-[#f1f1f1] ">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded} // عندما ينتهي الفيديو
        className={`object-cover w-full h-full ${className}`}
        src={src}
      />
    </div>
  );
};

export default SmoothVideoBackground;
