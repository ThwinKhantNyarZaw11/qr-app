import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserView() {
  const { token } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/public/view/${token}`)
      .then((res) => setInfo(res.data))
      .catch((err) => {
        console.error("Error fetching info:", err);
        setError("Failed to load certificate. Please check the link or try again later.");
      });
  }, [token]);

  if (error) return <p className="text-white p-4">{error}</p>;
  if (!info || !info.data) return <p className="text-white p-4">Loading...</p>;

  const data = info.data;

  return (
    <div className="bg-[#0057AB] min-h-screen p-4 font-sans">
      <div className="bg-white w-[600px] max-w-full mx-auto p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <img src="https://qrscan.kbzbank.co/img/kbzbank.png" alt="KBZ Bank Logo" className="h-10" />
          <h3 className="text-sm font-bold text-right leading-tight">
            BALANCE CERTIFICATE
          </h3>
        </div>

        <hr className="border-blue-800 my-3" />

        <p className="text-center text-sm font-semibold">
          DETAILS OF THE ISSUING CERTIFICATE
        </p>

        <div className="mt-4 space-y-3 text-sm">
          <Row label="Bank:" value={data.bankName} />
          <hr className="border-gray-300 my-3" />
          <Row label="Account Holder Name:" value={data.accountHolderName} />
          <hr className="border-gray-300 my-3" />
          <Row label="Account Number:" value={data.accountNumber} />
          <hr className="border-gray-300 my-3" />
          <Row label="Account Type:" value={data.accountType} />
          <hr className="border-gray-300 my-3" />
          <Row label="NRC/Passport No.:" value={data.nrcNumber} />
          <hr className="border-gray-300 my-3" />
          <Row label="Address:" value={data.address} />
          <hr className="border-gray-300 my-3" />
          <Row label="Issuing Branch:" value={data.issueBranch} />
          <hr className="border-gray-300 my-3" />
          <Row label="Issuing Date:" value={data.issueDate} />
          <hr className="border-gray-300 my-3" />
          <Row label="Date of Balance:" value={data.dateOfBalance} />
          <hr className="border-gray-300 my-3" />
          <Row label="Balance in Figures:" value={`${data.balance} MMK`} />
          <hr className="border-gray-300 my-3" />
          <Row label="Balance in Words:" value={data.balanceInWords} />
          <hr className="border-gray-300 my-3" />
        </div>

        <p className="text-center text-[13.6px] mt-6">
          This Balance Certificate is valid until {data.validDate}.
        </p>

        <hr className="border-t-2 border-dashed border-[#0057AB] my-4" />

        <div className="text-center text-xs text-gray-700 space-y-1">
          <p>Thank you for banking with Kanbawza Bank Limited.</p>
          <p>No.615/1, Pyay Road, Kamayut Township, Yangon, Myanmar</p>
          <p>Call Center: <a href="tel:+959951018555" className="text-blue-800">+95 9 951018555</a></p>
          <p>Email: <a href="mailto:customer_service@kbzbank.com" className="text-blue-800">customer_service@kbzbank.com</a></p>
          <p>This is a secure verification web portal provided by KBZ Bank.</p>
          <p>If you suspect fraud or tampering, please contact us immediately.</p>
        </div>
      </div>
    </div>
  );
}

// Row component
function Row({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4 py-1 text-sm">
      <span className="text-gray-600 w-1/2">{label}</span>
      <span className="font-bold text-right w-1/2 break-words">{value}</span>
    </div>
  );
}

