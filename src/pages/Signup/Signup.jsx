// src/pages/Signup/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST', 
        headers:
          { 
            'Content-Type': 'application/json',      
          }, 
          
          body: JSON.stringify({ 
            username: form.username, 
            name: form.fullName, 
            email: form.email, 
            password: form.password, 
          }),
      }); const data = await res.json(); 

      if (!res.ok) { 
        setError(data.message || 'Registration failed.'); 
        setLoading(false); return; } 
        localStorage.setItem('user', JSON.stringify(data.user)); 
        navigate('/');

    } catch (err) { 

      setError('Something went wrong. Please try again.'); } 
      finally { setLoading(false); 

      }
  };

  const isFormValid = Object.values(form).every(v => v.trim() !== '');
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">Instagram</h1>
        <p className="auth-subtitle">
          Sign up to see photos and videos from your friends.
        </p>
        {/* Facebook Signup */}
        <button className="auth-facebook">
          <span>🔵</span> Log in with Facebook
        </button>
        {/* OR Divider */}
        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span>OR</span>
          <div className="auth-divider-line" />
        </div>
        {/* Signup Form */}
        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Mobile Number or Email"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <p className="auth-terms">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="auth-link">Terms</Link>,{' '}
            <Link to="/privacy" className="auth-link">Privacy Policy</Link> and{' '}
            <Link to="/cookies" className="auth-link">Cookies Policy</Link>.
          </p>
          <button
            type="submit"
            className="auth-btn"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
      {/* Login link */}
      <div className="auth-card auth-card-bottom">
        <p>
          Have an account?{' '}
          <Link to="/login" className="auth-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;