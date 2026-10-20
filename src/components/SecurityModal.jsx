import React, { useState } from 'react';
import './SecurityModal.css';

export default function SecurityModal() {
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [is2FaVerified, setIs2FaVerified] = useState(false);
  const [step, setStep] = useState(1); // 1: Password Check, 2: 2FA OTP

  // Password strength logic
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(password);
  const strengthLabels = ['Weak 🔴', 'Fair 🟠', 'Good 🟡', 'Strong 🟢'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input field
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleVerify2FA = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      alert('Please enter all 6 digits.');
      return;
    }
    setIs2FaVerified(true);
    alert('2FA Multi-Factor Security Verified successfully! 🔐');
  };

  return (
    <div className="security-container">
      <div className="security-card">
        <h2>🛡️ Nexus Platform Security Settings</h2>
        <p>Configure multi-factor authentication (2FA) and password security requirements.</p>

        {/* Step Navigation Tabs */}
        <div className="security-tabs">
          <button
            className={step === 1 ? 'active' : ''}
            onClick={() => setStep(1)}
          >
            1. Password Strength
          </button>
          <button
            className={step === 2 ? 'active' : ''}
            onClick={() => setStep(2)}
          >
            2. 2FA Multi-Step Verification
          </button>
        </div>

        {/* Step 1: Password Strength Meter */}
        {step === 1 && (
          <div className="security-section">
            <h3>Password Strength Evaluator</h3>
            <div className="form-group">
              <label>Update Account Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a new password..."
              />
            </div>

            {password && (
              <div className="strength-meter">
                <div className="strength-bar-bg">
                  <div
                    className="strength-bar-fill"
                    style={{
                      width: `${(strengthScore / 4) * 100}%`,
                      backgroundColor: strengthColors[strengthScore - 1] || '#ef4444',
                    }}
                  ></div>
                </div>
                <span className="strength-text">
                  Strength: <strong>{strengthLabels[strengthScore - 1] || 'Very Weak'}</strong>
                </span>
              </div>
            )}

            <ul className="pwd-checklist">
              <li className={password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
              <li className={/[A-Z]/.test(password) ? 'valid' : ''}>Contains uppercase letter</li>
              <li className={/[0-9]/.test(password) ? 'valid' : ''}>Contains number</li>
              <li className={/[^A-Za-z0-9]/.test(password) ? 'valid' : ''}>Contains special character (@, #, $, etc.)</li>
            </ul>
          </div>
        )}

        {/* Step 2: 2FA Mockup with OTP Input */}
        {step === 2 && (
          <div className="security-section">
            <h3>Two-Factor Authentication (2FA)</h3>
            <p className="subtext">Enter the 6-digit authentication code sent to your registered device.</p>

            {is2FaVerified ? (
              <div className="verified-box">
                ✅ <strong>2FA Active & Secured</strong>
                <p>Your account is protected with multi-layer role security.</p>
              </div>
            ) : (
              <form onSubmit={handleVerify2FA} className="otp-form">
                <div className="otp-input-group">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                <button type="submit" className="verify-btn">
                  Verify 2FA OTP Code
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}