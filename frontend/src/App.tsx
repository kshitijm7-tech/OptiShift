import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import { checkHealth } from './api';

import Overview from './pages/Overview_Stitch';
import Schedule from './pages/Schedule_Stitch';
import Team from './pages/Team_Stitch';
import TimeOff from './pages/TimeOff_Stitch';
import Rules from './pages/Rules_Stitch';
import Settings from './pages/Settings_Stitch';

// Temporary mapped to Overview until DemoMode_Stitch exists
import DemoMode from './pages/Overview_Stitch';

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
