"use client";
// Dependencies
import { useRef, useEffect, useState } from "react";
// Components
import NavBar from "@Components/NavBar";
// Styles
import "@Styles/pages/home.sass";

export default function Home() {
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const videoRef = useRef(null);
  const [rate, setRate] = useState(0);

  const videos = [
    {
      path: "https://futuralab.s3.us-east-1.amazonaws.com/Rendezvous/surf.mp4",
      type: "video/mp4",
      name: "surfing",
      title: "Man Surfing",
      description: "Man Surfing is a surfing video",
    },
    {
      path: "https://futuralab.s3.us-east-1.amazonaws.com/Rendezvous/horse.mp4",
      type: "video/mp4",
      name: "horse",
      title: "Horse Riding",
      description: "Horse Riding is a horse riding video",
    },
    {
      path: "https://futuralab.s3.us-east-1.amazonaws.com/Rendezvous/dance.mp4",
      type: "video/mp4",
      name: "dance",
      title: "Dance",
      description: "Woman dancing is a dance video",
    },
    {
      path: "https://futuralab.s3.us-east-1.amazonaws.com/Rendezvous/running.mp4",
      type: "video/mp4",
      name: "running",
      title: "Running",
      description: "Man running is a running video",
    },
    {
      path: "https://futuralab.s3.us-east-1.amazonaws.com/Rendezvous/fishes.mp4",
      type: "video/mp4",
      name: "fishes",
      title: "Fishes",
      description: "Fishes in a pond is a fishes video",
    }
  ];

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;

        const calculatedRate = (current / videoRef.current.duration) * 100;
        if (calculatedRate >= 99) {
          setRate(100);
          const totalVideos = videos.length;
          setCurrentVideoIdx((prevIdx) => (prevIdx + 1) % totalVideos);
        } else {
          setRate(calculatedRate);
        }
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [currentVideoIdx]);

  const getRate = (videoName: string) => {
    const videoElement = document.getElementsByTagName("video")[0];
    const videoData = videoElement ? videoElement.dataset.video : null;
    if (videoData === videoName) {
      return rate;
    }
    return 0;
  };

  return (
    <div>
      <NavBar />
      <main className="w-full h-full">
        <div className="container">
          <div className="w-full h-screen container">
            <video
              ref={videoRef}
              key={videos[currentVideoIdx].name}
              data-video={videos[currentVideoIdx].name}
              autoPlay
              muted
              loop
              className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
            >
              <source
                src={videos[currentVideoIdx].path}
                type={videos[currentVideoIdx].type}
              />
            </video>
            <div className="w-full h-full flex flex-col justify-center px-20 text-white">
              <h2 className="text-5xl font-bold uppercase mb-2">
                {videos[currentVideoIdx].title}
              </h2>
              <p>{videos[currentVideoIdx].description}</p>
              <div className="flex gap-4 mt-10">
                <button className="w-[200px] p-2 border-white border-2">
                  Official Site
                </button>
                <button className="w-[200px] p-2 border-white border-2">
                  Watch Video
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 p-10 w-full flex justify-center">
            <div className="w-[80%] text-white grid grid-flow-col gap-3">
              {videos.map((video, idx) => (
                <div
                  key={video.name}
                  className="w-full text-center pb-2 uppercase cursor-pointer"
                  onClick={() => setCurrentVideoIdx(idx)}
                >
                  <p>{video.title}</p>
                  <div className="porcentage">
                    <div className="porcentage--full"></div>
                    <div
                      className="porcentage--current"
                      style={{ width: `${getRate(video.name)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
