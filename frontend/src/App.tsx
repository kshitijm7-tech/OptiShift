import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkHealth } from './api';

function App() {
  const [health, setHealth] = useState<string>('checking...');

  useEffect(() => {
    checkHealth()
      .then(() => setHealth('Backend: OK'))
      .catch(() => setHealth('Backend: Error'));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">OptiShift</h1>
            <span className="text-sm text-gray-500">{health}</span>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="w-64 bg-white border-r p-4 space-y-2">
            <nav className="flex flex-col gap-2">
              <Link to="/overview" className="p-2 hover:bg-gray-100 rounded">Overview</Link>
              <Link to="/schedule" className="p-2 hover:bg-gray-100 rounded">Schedule</Link>
              <Link to="/my-team" className="p-2 hover:bg-gray-100 rounded">My Team</Link>
              <Link to="/time-off" className="p-2 hover:bg-gray-100 rounded">Time Off</Link>
              <Link to="/rules" className="p-2 hover:bg-gray-100 rounded">Rules</Link>
              <Link to="/settings" className="p-2 hover:bg-gray-100 rounded">Settings</Link>
            </nav>
          </aside>
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<div>Welcome to OptiShift Foundation</div>} />
              <Route path="/overview" element={<div>Overview Placeholder</div>} />
              <Route path="/schedule" element={<div>Schedule Placeholder</div>} />
              <Route path="/my-team" element={<div>My Team Placeholder</div>} />
              <Route path="/time-off" element={<div>Time Off Placeholder</div>} />
              <Route path="/rules" element={<div>Rules Placeholder</div>} />
              <Route path="/settings" element={<div>Settings Placeholder</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
