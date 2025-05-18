import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrUrl, token } = location.state || {};

  const handleDownload = () => {
    const canvas = document.getElementById("qrCodeEl");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-white">
    <div className="h-20 bg-white">
      <img src="https://qrscan.kbzbank.co/img/kbzbank.png" alt="KBZ Logo" style={{ width: 150, marginBottom: '2rem',padding:'1rem',justifyContent: 'space-between' }} />
    </div>

    <div className="bg-blue-800 min-h-[calc(100vh-6rem)] flex items-center justify-center w-full">
    <div>
    <div className="flex items-center justify-center">
      <img src="/assets/success.png" alt="Success" style={{ width: 210, marginBottom: '1.5rem',alignItems: 'center' }} />
    </div>

      <div style={{ marginTop: '2rem',}}>
        <button
          onClick={() => navigate(`/view/${token}`)}
          style={{
            backgroundColor: 'white',
            color: '#0057AB',
            fontWeight: 'bold',
            padding: '10px 25px',
            margin: '10px',
            borderRadius: '12px',
            border: 'none'
          }}>
          View QR Slip
        </button>
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: 'white',
            color: '#0057AB',
            fontWeight: 'bold',
            padding: '10px 25px',
            margin: '10px',
            borderRadius: '12px',
            border: 'none'
          }}>
          Download QR
        </button>
      </div>
</div>
      <div style={{ display: 'none' }}>
        <QRCode id="qrCodeEl" value={qrUrl} size={180} />
      </div>
    </div>
    </div>
  );
};

export default SuccessPage;
