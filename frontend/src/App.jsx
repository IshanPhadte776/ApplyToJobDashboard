
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserData from './pages/UserData';
import Companies from './pages/Companies';
import Applications from './pages/Applications';
import Resumes from './pages/Resumes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/companies" element={<Companies />} />
  <Route path="/applications" element={<Applications />} />
  <Route path="/resumes" element={<Resumes />} />
      </Routes>
    </Router>
  );
}

export default App;
