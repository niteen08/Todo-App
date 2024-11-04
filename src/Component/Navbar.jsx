import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="container bg-purple-800 py-3 px-5 flex justify-between text-xl "> 
        <div className="logo mx-5 text-white">MY-TASK</div>
        <ul className='menu flex gap-5 mx-10 text-white '>
            <li className='hover:font-bold transition-all'>Home</li>
            <li className='hover:font-bold transition-all'>Your Task</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
