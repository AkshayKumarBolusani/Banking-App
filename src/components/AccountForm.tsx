import React, { useState } from "react";
import { validateName, validateAmount } from "../utils/Validator";
import {
  FaPlus,
  FaUser,
  FaDollarSign,
  FaInfoCircle,
  FaShieldAlt
} from "react-icons/fa";
import { FiPlus } from 'react-icons/fi';

interface Account {
  name: string;
  balance: number;
  type: string;
}

interface Props {
  onSubmit: (account: Account) => void;
}

const AccountForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Account>({
    name: '',
    balance: 0,
    type: 'Checking'
  });

  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Account name is required');
      return;
    }

    if (formData.balance < 0) {
      setError('Initial balance cannot be negative');
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      balance: 0,
      type: 'Checking'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaPlus className="text-green-600" />
            New Account
          </h2>
          <FaShieldAlt className="text-gray-400" title="Secure Form" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="accountName" className="input-label">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Main Checking"
          />
        </div>

        <div className="input-group">
          <label htmlFor="accountType" className="input-label">
            Account Type
          </label>
          <select
            id="accountType"
            className="input-field"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Investment">Investment</option>
            <option value="Credit">Credit Card</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="initialBalance" className="input-label">
            Initial Balance
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="initialBalance"
              className="input-field pl-7"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
            />
          </div>
          <p className="input-hint">
            Enter the initial deposit amount for this account
          </p>
        </div>

        <div className="bg-gray-50 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaInfoCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Important Information
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                By creating an account, you agree to our terms and conditions.
                Your information is secure and encrypted.
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          <FiPlus className="h-5 w-5" />
          Create Account
        </button>
      </form>
    </div>
  );
};

export default AccountForm; 