import React, { useState } from "react";
import type { Account } from "../services/BankingService";
import { validateAmount } from "../utils/Validator";
import { FiArrowUpRight, FiArrowDownRight, FiRepeat } from 'react-icons/fi';

type Props = {
  accounts: Account[];
  onDeposit: (id: string, amount: number) => void;
  onWithdraw: (id: string, amount: number) => void;
  onTransfer: (fromId: string, toId: string, amount: number) => void;
};

const BankingActions: React.FC<Props> = ({
  accounts,
  onDeposit,
  onWithdraw,
  onTransfer,
}) => {
  // Deposit/Withdraw
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTransaction = (type: 'deposit' | 'withdraw') => {
    setError('');

    if (!selectedAccount) {
      setError('Please select an account');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const account = accounts.find(acc => acc.id === selectedAccount);
    if (!account) return;

    if (type === 'withdraw' && numAmount > account.balance) {
      setError('Insufficient funds');
      return;
    }

    if (type === 'deposit') onDeposit(selectedAccount, numAmount);
    else onWithdraw(selectedAccount, numAmount);
    setAmount("");
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="input-group">
        <label htmlFor="account" className="input-label">
          Select Account
        </label>
        <select
          id="account"
          className="input-field"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">Choose an account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.name} - ₹{account.balance.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="amount" className="input-label">
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            id="amount"
            className="input-field pl-7"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleTransaction('deposit')}
          className="btn btn-success"
        >
          <FiArrowUpRight className="h-5 w-5" />
          Deposit
        </button>
        <button
          type="button"
          onClick={() => handleTransaction('withdraw')}
          className="btn btn-danger"
        >
          <FiArrowDownRight className="h-5 w-5" />
          Withdraw
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">or</span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={() => {/* TODO: Implement transfer functionality */}}
      >
        <FiRepeat className="h-5 w-5" />
        Transfer Between Accounts
      </button>
    </div>
  );
};

export default BankingActions; 