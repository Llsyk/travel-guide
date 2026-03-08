import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="p-8 bg-card border border-border rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Admin Access</h2>
        <input 
          type="password" 
          placeholder="Password"
          className="w-full p-2 mb-4 bg-background border border-border rounded text-foreground"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 bg-primary text-primary-foreground font-bold rounded hover:opacity-90">
          Enter Dashboard
        </button>
      </form>
    </div>
  );
};

export default Login;