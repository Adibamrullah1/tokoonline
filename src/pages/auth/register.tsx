import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  const validateForm = () => {
    const validationErrors: string[] = [];

    if (!formData.username.trim()) {
      validationErrors.push('Username is required');
    }
    if (!formData.email.trim()) {
      validationErrors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
      validationErrors.push('Email is invalid');
    }
    if (!formData.password) {
      validationErrors.push('Password is required');
    } else if (formData.password.length < 8) {
      validationErrors.push('Password must be at least 8 characters');
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push('Passwords do not match');
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would normally send the data to server or API
      setSuccessMessage('Registration successful!');
      setErrors([]);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setSuccessMessage('');
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f0f2f5;
        }
        .container {
          max-width: 350px;
          height: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
          padding: 30px 25px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: auto;
        }
        h2 {
          text-align: center;
          color: #4a90e2;
          margin-bottom: 25px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
          font-size: 14px;
        }
        input {
          padding: 10px 12px;
          margin-bottom: 15px;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: #4a90e2;
          outline: none;
          box-shadow: 0 0 6px #4a90e2aa;
        }
        button {
          padding: 12px;
          background-color: #4a90e2;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #357abd;
        }
        .errors {
          background-color: #ffe6e6;
          color: #cc0000;
          border-radius: 6px;
          padding: 10px 15px;
          margin-bottom: 15px;
          font-size: 14px;
          list-style: inside disc;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
          border-radius: 6px;
          padding: 10px 15px;
          margin-bottom: 15px;
          font-size: 14px;
          text-align: center;
        }
        @media (max-width: 400px) {
          .container {
            margin: 20px 15px;
            height: auto;
          }
        }
      `}</style>

      <div className="container" role="main" aria-label="Registration Form">
        <h2>Create Account</h2>
        {errors.length > 0 && (
          <ul className="errors" aria-live="assertive" aria-atomic="true">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}
        {successMessage && (
          <div className="success" aria-live="polite">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            aria-describedby="usernameHelp"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            aria-describedby="emailHelp"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Minimum 8 characters"
            value={formData.password}
            onChange={handleChange}
            required
            aria-describedby="passwordHelp"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            aria-describedby="confirmPasswordHelp"
          />
          <button type="submit" aria-label="Register">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
