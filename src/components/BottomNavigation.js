import React, { useEffect } from 'react'
import money from "../assets/0.jpeg";
import friends from "../assets/1.jpeg";
import daily from "../assets/3.jpeg";
import blockchain from "../assets/47f36f7e-c5fd-4d19-9297-1e8c74609bf7.jpeg"
import home from "../assets/6.jpeg";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';


function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentScreen, setCurrentScreen] = useState ("/");

  useEffect(() => {
    setCurrentScreen(location.pathname);
  }, [location]);


  return (
    <nav className='fixed px-[6px] text-white bottom-2 left-4 right-4 rounded-lg bg-black flex justify-around items-center h-[76px] z-50'>
      <div
        onClick={() => navigate("/")}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
          currentScreen === "/" ? "bg-black" : "bg-gray-900"
  }`}
        >
          <div className='flex flex-col items-center justify-center'>
            <img className='w-7 h-7 object-contain' src={home} alt='H' />
            <p className='text-xs text-center'>Home</p>

          </div>
      </div>
      <div
        onClick={() => navigate("/earn")}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
          currentScreen === "/earn" ? "bg-black" : "bg-gray-900"
  }`}
        >
          <div className='flex flex-col items-center justify-center'>
            <img className='w-7 h-7 object-contain' src={money} alt='E' />
            <p className='text-xs text-center'>Earn</p>

          </div>
      </div> 
      <div
        onClick={() => navigate("/shares")}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
          currentScreen === "/shares" ? "bg-black" : "bg-gray-900"
  }`}
        >
          <div className='flex flex-col items-center justify-center'>
            <img className='w-7 h-7 object-contain' src={friends} alt='R' />
            <p className='text-xs text-center'>Referrals</p>

          </div>
      </div>
       <div
        onClick={() => navigate("/daily")}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
          currentScreen === "/daily" ? "bg-black" : "bg-gray-900"
  }`}
        >
          <div className='flex flex-col items-center justify-center'>
            <img className='w-7 h-7 object-contain' src={daily} alt='D' />
            <p className='text-xs text-center'>Daily</p>

          </div>
      </div>
       <div
        onClick={() => navigate("/airdrop")}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
          currentScreen === "/airdrop" ? "bg-black" : "bg-gray-900"
  }`}
        >
          <div className='flex flex-col items-center justify-center'>
            <img className='w-7 h-7 object-contain' src={blockchain} alt='H' />
            <p className='text-xs text-center'>Airdrop</p>

          </div>
      </div>
    </nav>
  )
}

export default BottomNavigation