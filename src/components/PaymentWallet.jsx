import React, { useState } from 'react';
import './PaymentWallet.css';

export default function PaymentWallet() {
  const [balance, setBalance] = useState(125000);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('Nexus Escrow');
  const [activeTab, setActiveTab] = useState('deposit');

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Funding Deal', amount: '$50,000', sender: 'Apex Ventures', receiver: 'Nexus Wallet', status: 'Completed', date: '2026-10-18' },
    { id: 2, type: 'Transfer', amount: '$2,500', sender: 'Nexus Wallet', receiver: 'Legal & Escrow Services', status: 'Completed', date: '2026-10-19' },
    { id: 3, type: 'Deposit', amount: '$10,000', sender: 'HBL Bank Account', receiver: 'Nexus Wallet', status: 'Pending', date: '2026-10-20' },
  ]);

  const handleTransaction = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(transferAmount);
    if (!numericAmount || numericAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (activeTab === 'transfer' && numericAmount > balance) {
      alert('Insufficient wallet funds!');
      return;
    }

    const newBalance = activeTab === 'deposit' ? balance + numericAmount : balance - numericAmount;
    setBalance(newBalance);

    const newTx = {
      id: Date.now(),
      type: activeTab === 'deposit' ? 'Deposit' : 'Transfer / Funding Deal',
      amount: `$${numericAmount.toLocaleString()}`,
      sender: activeTab === 'deposit' ? 'Connected Bank' : 'Nexus Wallet',
      receiver: activeTab === 'deposit' ? 'Nexus Wallet' : recipient,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setTransferAmount('');
    alert(`Success! ${activeTab === 'deposit' ? 'Deposited' : 'Transferred'} $${numericAmount.toLocaleString()}`);
  };

  return (
    <div className="payment-container">
      <div className="wallet-header-card">
        <div>
          <span className="wallet-label">Nexus Secure Wallet Balance</span>
          <h1 className="wallet-balance">${balance.toLocaleString()} USD</h1>
        </div>
        <div className="wallet-badge">🔒 Stripe/PayPal Mock Engine</div>
      </div>

      {/* Transaction Action Form */}
      <div className="payment-action-card">
        <div className="tab-buttons">
          <button
            type="button"
            className={activeTab === 'deposit' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('deposit')}
          >
            💳 Deposit Funds
          </button>
          <button
            type="button"
            className={activeTab === 'transfer' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('transfer')}
          >
            💸 Funding Deal Transfer
          </button>
        </div>

        <form onSubmit={handleTransaction} className="payment-form">
          {activeTab === 'transfer' && (
            <div className="form-group">
              <label>Recipient / Deal Escrow</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g., Startup Project / Investor Escrow"
              />
            </div>
          )}

          <div className="form-group">
            <label>Amount (USD)</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount (e.g. 5000)"
            />
          </div>

          <button type="submit" className="confirm-pay-btn">
            {activeTab === 'deposit' ? 'Confirm Deposit' : 'Process Funding Deal Transfer'}
          </button>
        </form>
      </div>

      {/* Transaction History Table */}
      <div className="tx-history-card">
        <h3>📜 Transaction History</h3>
        <table className="tx-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td><strong>{tx.type}</strong></td>
                <td className="tx-amount">{tx.amount}</td>
                <td>{tx.sender}</td>
                <td>{tx.receiver}</td>
                <td>
                  <span className={`status-pill ${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}