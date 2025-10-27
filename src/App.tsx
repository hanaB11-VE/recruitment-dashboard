import { useState } from 'react';
import './App.css';
import InterviewCalendar from './components/InterviewCalendar';
import AnalyticsChart from './components/AnalyticsChart';
import AuditLogTable from './components/AuditLogTable';

function App() {
  // Track if dark mode is active
  const [darkMode, setDarkMode] = useState(false);

  // Toggle between light and dark
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    //<div className={`app ${darkMode ? 'dark' : 'light'}`}>
    <div className={ darkMode ? 'dark' : 'light'}>
      <header className="app-header">
        <h1>Recruitment Monitoring Dashboard</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
           {darkMode ? ' ☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main className="app-main">
        <InterviewCalendar />
        <AnalyticsChart />
        <AuditLogTable />
      </main>
    </div>
  );
}

export default App;
