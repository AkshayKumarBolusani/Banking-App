import React from "react";
import type { Account } from "../services/BankingService";
import { FiArrowUp, FiArrowDown, FiEdit2, FiTrash2, FiInfo } from 'react-icons/fi';

type Props = {
  accounts: Account[];
};

const AccountList: React.FC<Props> = ({ accounts }) => (
  <div className="account-table-container">
    <table className="account-table">
      <thead>
        <tr>
          <th className="account-table-header">Account</th>
          <th className="account-table-header">Type</th>
          <th className="account-table-header">Balance</th>
          <th className="account-table-header">Status</th>
          <th className="account-table-header">30-Day Change</th>
          <th className="account-table-header actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, idx) => {
          const isPositiveChange = Math.random() > 0.5; // Simulated data
          const changePercentage = (Math.random() * 10).toFixed(1);
          return (
            <tr key={account.id} className={`account-table-row${idx % 2 === 1 ? ' zebra' : ''}`}> 
              <td className="account-table-cell">
                <div className="account-table-account">
                  <div className="account-avatar">{account.name.charAt(0)}</div>
                  <div>
                    <div className="account-name">{account.name}</div>
                    <div className="account-id">ID: {account.id}</div>
                  </div>
                </div>
              </td>
              <td className="account-table-cell">
                <span className="account-type-badge">{account.type}</span>
              </td>
              <td className="account-table-cell">
                ₹{account.balance.toLocaleString()}
              </td>
              <td className="account-table-cell">
                <span className={`account-status-badge ${account.status}`}>{account.status}</span>
              </td>
              <td className="account-table-cell">
                <div className="account-change">
                  {isPositiveChange ? (
                    <FiArrowUp className="change-up" />
                  ) : (
                    <FiArrowDown className="change-down" />
                  )}
                  <span className={`change-value ${isPositiveChange ? 'up' : 'down'}`}>{isPositiveChange ? '+' : '-'}{changePercentage}%</span>
                </div>
              </td>
              <td className="account-table-cell actions">
                <button className="table-action-btn" aria-label="Details"><FiInfo /></button>
                <button className="table-action-btn" aria-label="Edit"><FiEdit2 /></button>
                <button className="table-action-btn danger" aria-label="Delete"><FiTrash2 /></button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AccountList; 