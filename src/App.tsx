import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiCreditCard,
  FiRepeat,
  FiSettings,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon,
  FiPlus
} from 'react-icons/fi';
import Home from './pages/Home';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <FiHome /> },
  { to: '/accounts', label: 'Accounts', icon: <FiCreditCard /> },
  { to: '/transactions', label: 'Transactions', icon: <FiRepeat /> },
  { to: '/settings', label: 'Settings', icon: <FiSettings /> },
];

function Sidebar({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) {
  const location = useLocation();
  return (
    <aside className={`sidebar${collapsed ? ' sidebar-collapsed' : ''}`}> 
      <div className="sidebar-header">
        <span className="sidebar-logo">
          <img src="/vite.svg" alt="Midnight Bank Logo" className="sidebar-logo-img" />
          {!collapsed && <span className="sidebar-title">Midnight Bank</span>}
        </span>
        <button className="sidebar-collapse-btn" onClick={onCollapse}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav className="sidebar-nav">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`sidebar-link${location.pathname === link.to ? ' sidebar-active' : ''}${collapsed ? ' sidebar-link-collapsed' : ''}`}
            title={link.label}
          >
            <span className="sidebar-link-icon">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-footer-btn">
          <FiUser className="sidebar-footer-icon" />
          {!collapsed && <span>Profile</span>}
        </button>
        <button className="sidebar-footer-btn logout">
          <FiLogOut className="sidebar-footer-icon" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function Topbar({ darkMode, setDarkMode, onMenuToggle }: { darkMode: boolean; setDarkMode: (v: boolean) => void; onMenuToggle: () => void }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#145da0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <img src="/vite.svg" alt="Midnight Bank Logo" className="topbar-logo" />
        <span className="topbar-title">Midnight Bank</span>
      </div>
      <div className="topbar-right">
        <button
          className="topbar-darkmode-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun className="topbar-darkmode-icon" /> : <FiMoon className="topbar-darkmode-icon" />}
        </button>
        <div className="topbar-user-initial">J</div>
      </div>
    </header>
  );
}

function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Dark mode effect
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', darkMode);
  }

  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);

  // Calculate left margin for main content
  let mainMarginLeft = '';
  if (sidebarOpen) {
    mainMarginLeft = sidebarCollapsed ? 'main-margin-collapsed' : 'main-margin';
  } else {
    mainMarginLeft = 'main-margin-none';
  }

  return (
    <div className="flex min-h-screen bg-white transition-colors duration-300">
      {sidebarOpen && <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${mainMarginLeft}`}> 
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} onMenuToggle={handleMenuToggle} />
        <main className="flex-1 p-8 md:p-12 bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <footer className="w-full py-8 px-8 text-center text-[#145da0] text-base bg-[#f8fafc] border-t border-[#e5e7eb] shadow-inner">
          © 2024 Midnight Bank. All rights reserved. | <a href="#" className="underline text-[#2e8bc0]">Privacy Policy</a> | <a href="#" className="underline text-[#2e8bc0]">Contact</a>
        </footer>
        <FloatingActionButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>
    </div>
  );
}

function FloatingActionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed z-40 bottom-8 right-8 bg-primary hover:bg-blue-700 text-white rounded-full shadow-lg p-5 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/30"
      onClick={onClick}
      aria-label="Quick Action"
    >
      <FiPlus className="text-2xl" />
    </button>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
