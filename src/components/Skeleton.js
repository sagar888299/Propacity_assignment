import React from 'react'

export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
    <div className="h-24 bg-gray-300 rounded"></div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto text-center"></div>
    <div className="flex justify-between mt-12">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center space-y-2"
        >
          <div className="h-6 w-12 bg-gray-300 rounded"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
          <div className="h-3 w-6 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto text-center"></div>
    <div className="flex flex-col mt-4 space-y-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-3 rounded-lg animate-pulse"
          >
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
  </div>
  )
}
