import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import { checkHealth } from './api';

import Overview from './pages/Overview';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import TimeOff from './pages/TimeOffStatic';
import Rules from './pages/RulesStatic';
import Settings from './pages/SettingsStatic';

// Temporary mapped to Overview until DemoMode_Stitch exists
import DemoMode from './pages/Overview';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking backend…');

  useEffect(() => {
    checkHealth()
      .then(() => setBackendStatus('Backend connected'))
      .catch(() => setBackendStatus('Backend unreachable'));
  }, []);

  return (
    <Router>
      <AppShell backendStatus={backendStatus}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/demo" element={<DemoMode />} />
          <Route path="/team" element={<Team />} />
          <Route path="/time-off" element={<TimeOff />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/overview" element={<Navigate to="/" replace />} />
          <Route path="/my-team" element={<Navigate to="/team" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
