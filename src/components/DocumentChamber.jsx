import React, { useState } from 'react';
import './DocumentChamber.css';

export default function DocumentChamber() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Term_Sheet_Apex_Capital.pdf', status: 'In Review', date: '2026-10-18', signature: null },
    { id: 2, name: 'Founders_Agreement_v2.docx', status: 'Draft', date: '2026-10-19', signature: null },
  ]);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [signatureInput, setSignatureInput] = useState('');

  const handleSignDocument = (id) => {
    if (!signatureInput.trim()) {
      alert('Please type your legal signature name first.');
      return;
    }

    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, status: 'Signed', signature: signatureInput } : doc
      )
    );
    setSignatureInput('');
    alert('Document successfully e-signed and locked! ✍️');
  };

  return (
    <div className="chamber-container">
      <div className="chamber-header">
        <h2>⚖️ Document Chamber & E-Signature Hub</h2>
        <p>Review legal contracts, track agreement statuses, and apply verified digital signatures.</p>
      </div>

      <div className="chamber-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="chamber-card">
            <div className="doc-info-top">
              <span className="doc-file-icon">📄</span>
              <div>
                <h4>{doc.name}</h4>
                <p>Uploaded: {doc.date}</p>
              </div>
            </div>

            <div className="status-badge-row">
              <span>Status:</span>
              <span className={`status-label ${doc.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {doc.status}
              </span>
            </div>

            {doc.signature && (
              <p className="signed-stamp">Signed by: <strong>{doc.signature}</strong></p>
            )}

            <div className="chamber-actions">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="preview-btn"
              >
                Preview PDF/Doc
              </button>

              {doc.status !== 'Signed' && (
                <div className="sign-section">
                  <input
                    type="text"
                    placeholder="Type Full Legal Name..."
                    value={signatureInput}
                    onChange={(e) => setSignatureInput(e.target.value)}
                  />
                  <button
                    onClick={() => handleSignDocument(doc.id)}
                    className="sign-btn"
                  >
                    Apply E-Signature
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PDF / Document Preview Modal */}
      {selectedDoc && (
        <div className="preview-modal-overlay">
          <div className="preview-modal-content">
            <div className="modal-header">
              <h3>🔍 Previewing: {selectedDoc.name}</h3>
              <button onClick={() => setSelectedDoc(null)} className="close-modal-btn">✕</button>
            </div>
            <div className="pdf-mock-viewer">
              <p>📜 [Secure PDF Render Viewport]</p>
              <p><strong>Document ID:</strong> #{selectedDoc.id}</p>
              <p><strong>Current Status:</strong> {selectedDoc.status}</p>
              <p className="mock-text-content">
                "This agreement establishes binding terms between the Nexus platform entrepreneur and participating investor syndicates..."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}