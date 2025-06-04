import React, { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
import { useMessage } from "cllk";

function QrLector({
  onError,
  onSuccess,
}: {
  onError: (e: string | Error) => any;
  onSuccess: (e: QrScanner.ScanResult) => any;
}) {
  const { message } = useMessage();
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    onSuccess(result);
  };
  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    onError(err);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (videoEl?.current && !scanner.current) {
        // 👉 Instantiate the QR Scanner
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
          onDecodeError: onScanFail,
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: qrBoxEl?.current || undefined,
        });

        // 🚀 Start QR Scanner
        scanner?.current
          ?.start()
          .then(() => setQrOn(true))
          .catch(() => setQrOn(false));
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      message({
        type: "alert",
        description: "No tienes permisos para la camara",
      });
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={
            "https://raw.githubusercontent.com/SurajanShrestha/qr-scanner-in-react/88efe8cf42df0549bb6c792f83c7ccb466a640ae/src/assets/qr-frame.svg"
          }
          loading="lazy"
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
}

export default QrLector;
