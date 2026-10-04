// OptiShift application entry (P04): routing + shell + backend status.
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AppShell from './components/AppShell';
import CustomMode from './pages/CustomMode';
import DemoMode from './pages/DemoMode';
import Overview from './pages/Overview';
import Rules from './pages/Rules';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Team from './pages/Team';
import TimeOff from './pages/TimeOff';
import { checkHealth } from './api';

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
          <Route path="/custom" element={<CustomMode />} />
          <Route path="/demo" element={<DemoMode />} />
          <Route path="/team" element={<Team />} />
          <Route path="/time-off" element={<TimeOff />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/settings" element={<Settings />} />
          {/* Legacy P01 paths redirect to the canonical routes. */}
          <Route path="/overview" element={<Navigate to="/" replace />} />
          <Route path="/my-team" element={<Navigate to="/team" replace />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
