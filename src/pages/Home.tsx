import { useState } from 'react';
import { FiDollarSign, FiArrowUpRight, FiArrowDownRight, FiCreditCard } from 'react-icons/fi';
import AccountList from '../components/AccountList';
import AccountForm from '../components/AccountForm';
import BankingActions from '../components/BankingActions';

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
  status: 'active' | 'inactive';
}

function Home() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Main Checking', balance: 5000, type: 'Checking', status: 'active' },
    { id: '2', name: 'Savings', balance: 10000, type: 'Savings', status: 'active' },
    { id: '3', name: 'Investment', balance: 25000, type: 'Investment', status: 'active' }
  ]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyIncome = 8500;
  const monthlyExpenses = 6200;

  const handleAddAccount = (newAccount: { name: string; balance: number; type: string }) => {
    const account = {
      ...newAccount,
      id: (accounts.length + 1).toString(),
      status: 'active' as const
    };
    setAccounts([...accounts, account]);
  };

  const handleTransaction = (accountId: string, amount: number, type: 'deposit' | 'withdraw') => {
    setAccounts(accounts.map(account => {
      if (account.id === accountId) {
        return {
          ...account,
          balance: type === 'deposit' ? account.balance + amount : account.balance - amount
        };
      }
      return account;
    }));
  };

  const handleDeposit = (id: string, amount: number) => handleTransaction(id, amount, 'deposit');
  const handleWithdraw = (id: string, amount: number) => handleTransaction(id, amount, 'withdraw');
  const handleTransfer = (fromId: string, toId: string, amount: number) => {
    // Implement transfer logic here if needed
  };
  return (
    <div className="home-root">
      {/* Account Overview Section */}
      <section className="account-overview-section">
        <div className="account-overview-bg"></div>
        <div className="account-overview-content">
          <div className="account-overview-card">
            <h1 className="account-overview-title">Account Overview</h1>
            <p className="account-overview-desc">Welcome to <span className='account-overview-bank'>Midnight Bank</span> — your secure, modern platform for managing accounts and transactions.</p>
            <div className="account-overview-summary">
              <div className="account-overview-summary-item">
                <span className="summary-label">Total Balance</span>
                <span className="summary-value">₹{totalBalance.toLocaleString()}</span>
              </div>
              <div className="account-overview-summary-item">
                <span className="summary-label">Monthly Income</span>
                <span className="summary-value income">₹{monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="account-overview-summary-item">
                <span className="summary-label">Monthly Expenses</span>
                <span className="summary-value expense">₹{monthlyExpenses.toLocaleString()}</span>
              </div>
              <div className="account-overview-summary-item">
                <span className="summary-label">Active Accounts</span>
                <span className="summary-value">{accounts.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Widgets Section */}
      <section className="dashboard-widgets">
        <h2 className="widgets-title">Key Financial Metrics</h2>
        <div className="widgets-grid">
          <div className="widget-card">
            <div className="widget-icon widget-balance"></div>
            <div className="widget-label">Total Balance</div>
            <div className="widget-value">₹{totalBalance.toLocaleString()}</div>
            <div className="widget-desc">All accounts combined</div>
          </div>
          <div className="widget-card">
            <div className="widget-icon widget-income"></div>
            <div className="widget-label">Monthly Income</div>
            <div className="widget-value income">₹{monthlyIncome.toLocaleString()}</div>
            <div className="widget-desc">Compared to last month: <span className="widget-trend up">+12%</span></div>
          </div>
          <div className="widget-card">
            <div className="widget-icon widget-expense"></div>
            <div className="widget-label">Monthly Expenses</div>
            <div className="widget-value expense">₹{monthlyExpenses.toLocaleString()}</div>
            <div className="widget-desc">Compared to last month: <span className="widget-trend down">+5%</span></div>
          </div>
          <div className="widget-card">
            <div className="widget-icon widget-accounts"></div>
            <div className="widget-label">Active Accounts</div>
            <div className="widget-value">{accounts.length}</div>
            <div className="widget-desc">Currently open accounts</div>
          </div>
        </div>
      </section>
      {/* Main Content Grid */}
      <section className="main-content-grid">
        <div className="accounts-section">
          <div className="section-header">
            <h2 className="section-title">Your Accounts</h2>
          </div>
          <AccountList accounts={accounts} />
        </div>
        <div className="side-section">
          <div className="quick-actions-section">
            <div className="section-header">
              <h2 className="section-title">Quick Actions</h2>
            </div>
            <BankingActions accounts={accounts} onDeposit={handleDeposit} onWithdraw={handleWithdraw} onTransfer={handleTransfer} />
          </div>
          <div className="add-account-section">
            <div className="section-header">
              <h2 className="section-title">Add New Account</h2>
            </div>
            <AccountForm onSubmit={handleAddAccount} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;