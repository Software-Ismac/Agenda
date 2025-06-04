import React from "react";
import QRCode from "react-qr-code";

function QrGenerator({ value }: { value: string }) {
  return (
    <div className="w-full bg-white p-3 rounded-xl">
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={value}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}

export default QrGenerator;
