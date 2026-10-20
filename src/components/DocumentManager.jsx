import React, { useState } from 'react';
import './DocumentManager.css';

export default function DocumentManager() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Nexus_Pitch_Deck_2026.pdf',
      size: '2.4 MB',
      type: 'PDF',
      uploadDate: '2026-10-18'
    },
    {
      id: 2,
      name: 'Q3_Financial_Projections.xlsx',
      size: '1.1 MB',
      type: 'Spreadsheet',
      uploadDate: '2026-10-19'
    }
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection from computer
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle uploading selected file to dashboard state
  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const newDoc = {
      id: Date.now(),
      name: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      type: selectedFile.name.split('.').pop().toUpperCase(),
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setDocuments([newDoc, ...documents]);
    setSelectedFile(null);
    alert(`Successfully uploaded "${newDoc.name}"!`);
  };

  // Handle deleting a document
  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="doc-manager-container">
      <h2>📂 Pitch Deck & Document Repository</h2>
      <p>Upload, manage, and share official startup documentation with investors.</p>

      {/* Upload Box Form */}
      <form onSubmit={handleUpload} className="doc-upload-card">
        <h3>Upload New Document</h3>
        <div className="file-input-wrapper">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
            id="file-upload"
          />
        </div>
        {selectedFile && (
          <p className="selected-file-info">
            Selected: <strong>{selectedFile.name}</strong> ({ (selectedFile.size / (1024 * 1024)).toFixed(2) } MB)
          </p>
        )}
        <button type="submit" className="upload-btn">
          Upload Document
        </button>
      </form>

      {/* Uploaded Documents List */}
      <div className="doc-list-section">
        <h3>Shared Files ({documents.length})</h3>
        {documents.length === 0 ? (
          <p className="no-docs">No documents uploaded yet.</p>
        ) : (
          <div className="doc-grid">
            {documents.map((doc) => (
              <div key={doc.id} className="doc-card">
                <div className="doc-icon">📄</div>
                <div className="doc-details">
                  <h4>{doc.name}</h4>
                  <p>
                    <span>{doc.type}</span> • <span>{doc.size}</span> • <span>{doc.uploadDate}</span>
                  </p>
                </div>
                <div className="doc-actions">
                  <button
                    onClick={() => alert(`Downloading ${doc.name}...`)}
                    className="download-btn"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}