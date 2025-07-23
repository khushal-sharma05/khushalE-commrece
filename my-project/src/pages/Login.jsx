import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Already logged in, go to homepage
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (currentState === 'Login') {
        const res = await axios.post('http://localhost:4000/api/user/login', {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          setMessage('Login successful!');
          navigate('/');
        } else {
          setMessage(res.data.message || 'Login failed');
        }
      } else {
        const res = await axios.post('http://localhost:4000/api/user/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setMessage('Signup successful. Please login now.');
          setCurrentState('Login');
        } else {
          setMessage(res.data.message || 'Signup failed');
        }
      }
    } catch (error) {
      console.log(error.response);
      setMessage(error.response?.data?.message || 'Server error occurred');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {message && <p className='text-sm text-red-600'>{message}</p>}

      {currentState === 'Login' ? null : (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px] text-black'>
        <p className='cursor-pointer hover:underline'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className='cursor-pointer hover:underline'
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className='cursor-pointer hover:underline'
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className='bg-gray-800 text-white px-4 py-2 rounded mt-2 hover:bg-gray-700'
      >
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
