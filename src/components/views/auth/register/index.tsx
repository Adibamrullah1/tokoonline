import React, { useState } from 'react';
import './views/auth/register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Semua kolom harus diisi');
      return;
    }
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email tidak valid');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }
    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return;
    }

    // Mock success - replace with actual register API call
    setSuccess(true);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h2>Buat Akun Baru</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Registrasi berhasil! Silakan login.</div>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <label htmlFor="confirmPassword">Konfirmasi Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Ulangi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit" className="btn-register">Daftar</button>
        <p className="login-link">Sudah punya akun? <a href="/auth/login" className="link-login">Kembali ke Login</a></p>
      </form>
    </div>
  );
};

export default Register;