import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import UserCenter from './pages/UserCenter';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/user-center" />
        } />
        <Route path="/" element={<Layout />}>
          <Route path="user-center" element={
            isAuthenticated ? <UserCenter /> : <Navigate to="/login" />
          } />
          <Route index element={<Navigate to="/user-center" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
