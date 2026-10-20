import React, { useState } from 'react';
import './VideoCall.css';

export default function VideoCall() {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleStartCall = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setIsVideoMuted(false);
    setIsAudioMuted(false);
    setIsScreenSharing(false);
  };

  return (
    <div className="video-call-container">
      <div className="video-header">
        <h2>📹 Nexus WebRTC Secure Video Room</h2>
        <p>Direct virtual meeting space for investor pitch presentations and term sheet negotiations.</p>
      </div>

      {!isInCall ? (
        <div className="video-lobby">
          <div className="lobby-card">
            <span className="lobby-icon">👥</span>
            <h3>Ready to join pitch sync?</h3>
            <p>Ensure your camera and microphone permissions are enabled.</p>
            <button onClick={handleStartCall} className="start-call-btn">
              Start / Join Video Call
            </button>
          </div>
        </div>
      ) : (
        <div className="active-call-room">
          <div className="video-grid">
            {/* Remote Participant Stream */}
            <div className="video-box remote-video">
              <div className="avatar-placeholder">
                <span>👩‍💼 Sarah Jenkins (Investor)</span>
              </div>
            </div>

            {/* Local User Stream */}
            <div className="video-box local-video">
              <div className="avatar-placeholder self">
                <span>{isVideoMuted ? 'Camera Off 📴' : '👤 You (Entrepreneur)'}</span>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="video-controls-bar">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className={`control-btn ${isAudioMuted ? 'active-alert' : ''}`}
            >
              {isAudioMuted ? '🔇 Unmute Audio' : '🎙️ Mute Audio'}
            </button>

            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className={`control-btn ${isVideoMuted ? 'active-alert' : ''}`}
            >
              {isVideoMuted ? '📷 Turn Camera On' : '📹 Stop Camera'}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`control-btn ${isScreenSharing ? 'active-share' : ''}`}
            >
              {isScreenSharing ? '🖥️ Stop Screen Share' : '💻 Share Screen'}
            </button>

            <button onClick={handleEndCall} className="end-call-btn">
              📞 End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}