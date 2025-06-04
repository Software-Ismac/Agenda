import { createContext, useContext, useEffect, useRef, useState } from "react";
const NetworkContext = createContext({ isOnline: true });

export const NetworkProvider = ({ children }: { children: any }) => {
  const [isOnline, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    //#ts-ignore
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  //@ts-ignore
  return useContext(NetworkContext) as { isOnline: boolean };
};
export const Video = ({ children }: { children: any }) => {
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("intro-played");
    if (alreadyPlayed === "true") {
      setShowChildren(true);
    }
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem("intro-played", "true");
    setShowChildren(true);
  };

  return (
    <>
      {!showChildren ? (
        <div className="w-screen h-screen">
          <video
            className="object-cover object-center"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{ width: "100%", height: "100%" }}
          >
            <source
              src="/mobile.webm"
              media="(max-width: 768px)"
              type="video/webm"
            />
            <source src="/intro.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        children
      )}
    </>
  );
};
