import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle register logic here
    console.log('Register attempt:', { username, email, password })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md ring-2 ring-[#31b8c6]/30">
        <h2 className="text-2xl font-bold text-[#31b8c6] mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#31b8c6]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#31b8c6]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#31b8c6]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#31b8c6] text-white py-2 px-4 rounded-md hover:bg-[#28a5b1] transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          Already have an account? <Link to="/login" className="text-[#31b8c6] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register