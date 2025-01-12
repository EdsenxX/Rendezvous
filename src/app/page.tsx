"use client";
// Dependencies
import { useRef, useEffect, useState } from "react";
// Components
import NavBar from "@Components/NavBar";
// Styles
import "@Styles/pages/home.sass";

export default function Home() {
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      title: "Woman Dance",
      description: "Indian woman dancing is a dance video",
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
    },
  ];

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const calculatedRate = (current / videoRef.current.duration) * 100;

        if (calculatedRate >= 99) {
          setRate(100);
          setCurrentVideoIdx((prevIdx) => (prevIdx + 1) % videos.length);
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
      <div className="w-full h-full">
        <NavBar className="h-[10vh]" />
        <div className="relative h-screen">
          <div className="w-full h-full relative">
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
            <div className="w-full h-full flex flex-col justify-center px-5 md:px-10 lg:px-20 text-white">
              <h2 className="text-5xl font-bold uppercase mb-2">
                {videos[currentVideoIdx].title}
              </h2>
              <p>{videos[currentVideoIdx].description}</p>
              <div className="flex gap-4 mt-5">
                <button className="w-[200px] text-sm p-2 border-white border-2 group relative hover:text-black uppercase font-bold">
                  Official Site
                  <div className="bg-white h-full w-0 absolute top-0 left-0 group-hover:w-full transition-all duration-300 -z-10"></div>
                </button>
                <button className="w-[200px] text-sm p-2 border-white border-2 group relative hover:text-black uppercase font-bold">
                  Watch Video
                  <div className="bg-white h-full w-0 absolute top-0 left-0 group-hover:w-full transition-all duration-300 -z-10"></div>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <div className="w-[98%] md:w-[90%] lg:w-[80%] text-white grid grid-flow-col gap-3">
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
      </div>
      <main className="px-20 py-10">
        <section>
          <h2 className="text-2xl font-bold uppercase mb-2">
            Coming Soon to Theaters
          </h2>
          <div className="flex gap-4">
            <div className="relative w-[300px] h-[500px]">
              <img
                src="https://www.dreamworks.com/storage/cms-uploads/dog-man-poster-thumbnail.jpg"
                alt="dog-man-poster-thumbnail"
                className="w-full h-full"
              />
              <div className="text-white absolute bottom-0 left-0 w-full p-2 uppercase">
                <h3 className="text-lg font-bold">Dog Man</h3>
                <p className="text-sm">In theaters january 31</p>
              </div>
            </div>
            <div className="relative w-[300px] h-[500px]">
                <img
                  src="https://www.dreamworks.com/storage/cms-uploads/the-bad-guys-2-poster-thumbnail.jpg"
                  alt="the-bad-guys-2-poster-thumbnail"
                  className="w-full h-full"
                />
              <div className="text-white absolute bottom-0 left-0 w-full p-2 uppercase">
                <h3 className="text-lg font-bold">The Bad Guys 2</h3>
                <p className="text-sm">In theaters this summer</p>
              </div>
            </div>
            <div className="relative w-[300px] h-5300px]">
                <img
                  src="https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/companion_keyart_0.jpg"
                  alt="the-bad-guys-2-poster-thumbnail"
                  className="w-full h-full"
                />
              <div className="text-white absolute bottom-0 left-0 w-full p-2 uppercase">
                <h3 className="text-lg font-bold">The Bad Guys 2</h3>
                <p className="text-sm">In theaters this summer</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold uppercase mb-2">
            Movie & TV Favorites
          </h2>
        </section>
      </main>
    </div>
  );
}
