import React from 'react';

export default function Navbar(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Market Research Assistant</span>
      </div>
    </nav>
  )
}
