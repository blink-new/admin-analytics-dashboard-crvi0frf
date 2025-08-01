import React from 'react'

function TestApp() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Test App Working!</h1>
        <p className="text-gray-600">If you can see this, React is working correctly.</p>
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800">✅ React is rendering</p>
          <p className="text-green-800">✅ Tailwind CSS is working</p>
          <p className="text-green-800">✅ Vite dev server is running</p>
        </div>
      </div>
    </div>
  )
}

export default TestApp