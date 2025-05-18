import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    bank: '',
    name: '',
    accountNumber: '',
    accountType: '',
    passportNo: '',
    address: '',
    branch: '',
    issueDate: '',
    balanceDate: '',
    balanceFigures: '',
    balanceWords: '',
    validUntil: ''
  });

  const [qrUrl, setQrUrl] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = async () => {
    setShowConfirm(false);
    try {
      const payload = {
        bankName: formData.bank,
        accountHolderName: formData.name,
        accountNumber: formData.accountNumber,
        accountType: formData.accountType,
        nrcNumber: formData.passportNo,
        address: formData.address,
        issueBranch: formData.branch,
        issueDate: formData.issueDate,
        dateOfBalance: formData.balanceDate,
        balance: formData.balanceFigures,
        balanceInWords: formData.balanceWords,
        validDate: formData.validUntil
      };

      const res = await axios.post('http://localhost:8080/admin', payload, {
        auth: {
          username: 'admin@gmail.com',
          password: 'admin@123'
        }
      });

      const newToken = res.data.data;
      const fullUrl = `http://localhost:8080/user/public/view/${newToken}`;

      setQrUrl(fullUrl);
      navigate('/success', { state: { formData, qrUrl: fullUrl, token: newToken } });

    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Unauthorized: Please check your credentials.");
      } else if (err.response && err.response.status === 400) {
        alert("Bad Request: Please check if all required fields are filled correctly.");
      } else {
        console.error('Error submitting form:', err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'white',
    color: 'black'
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-20 bg-white">
        <img src="https://qrscan.kbzbank.co/img/kbzbank.png" alt="KBZ Logo" style={{ width: 150, marginBottom: '2rem', padding: '1rem', justifyContent: 'space-between' }} />
      </div>
      <div className="bg-blue-800 min-h-[calc(100vh-6rem)] w-full">
        <div className="flex items-center justify-center pt-10">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>DETAILS OF THE ISSUING CERTIFICATE</h2>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setShowConfirm(true); }} style={{ maxWidth: '600px', margin: '0 auto' }}>
          {[
            ['Bank Name', 'bank'],
            ['Account Holder Name', 'name'],
            ['Account Number', 'accountNumber'],
            ['Account Type', 'accountType'],
            ['NRC/Passport No.', 'passportNo'],
            ['Address', 'address'],
            ['Issuing Branch', 'branch'],
            ['Issuing Date', 'issueDate'],
            ['Date of Balance', 'balanceDate'],
            ['Balance in Figures', 'balanceFigures'],
            ['Balance in Words', 'balanceWords'],
            ['Balance Valid Date', 'validUntil']
          ].map(([label, name]) => (
            <input
              key={name}
              name={name}
              placeholder={label}
              value={formData[name]}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          ))}

          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{
              backgroundColor: 'white',
              color: '#0057AB',
              fontWeight: 'bold',
              padding: '10px 30px',
              borderRadius: '8px',
              border: 'none'
            }}>
              Save
            </button>
          </div>
        </form>

        {qrUrl && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h4>QR Code:</h4>
            <QRCode value={qrUrl} size={180} />
            <p style={{ marginTop: '1rem', color: 'white' }}>{qrUrl}</p>
          </div>
        )}

        {showConfirm && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 999
          }}>
            <div style={{
              backgroundColor: '#0057AB',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              width: '90%',
              maxWidth: '500px',
              color: 'white'
            }}>
              <h2>Are you sure you want to save?</h2>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    padding: '10px 30px',
                    borderRadius: '16px',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleFinalSubmit}
                  style={{
                    backgroundColor: 'white',
                    color: '#0057AB',
                    padding: '10px 30px',
                    borderRadius: '16px',
                    fontSize: '16px',
                    border: 'none'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
