import React from 'react'

export default function ProfilePage() {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
      <img
        className="w-24 h-24 rounded-full mb-4"
        src="https://ui-avatars.com/api/?name=Liam+Marega"
        alt="Profile"
      />
      <h1 className="text-2xl font-bold mb-2">Liam Marega</h1>
      <p className="text-gray-600 mb-1">Email: <span className="font-mono">meli@test.com</span></p>
      <p className="text-gray-600">User ID: <span className="font-mono">1</span></p>
      <button className="cursor-not-allowed mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Edit Profile
      </button>
    </div>
  )
}
