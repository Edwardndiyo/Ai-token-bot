import React, { useEffect } from 'react'
import money from "../assets/997fbe3d-a2db-4d57-b67f-cb8883ee0a00-removebg-preview.png";
import friends from "../assets/Referrals__They_are_the_best_compliment_to_our_-removebg-preview.png";
import daily from "../assets/Download_checklist_clipboard_line_and_fill_style_icon_for_free-removebg-preview.png";
import blockchain from "../assets/Vector_Cartoon_Airdrop_Eating_Chicken_Game_Gift_Pack_PNG_Images___Vector__Cartoon_Gift__Gift_Package_PNG_Transparent_Background_-_Pngtree-removebg-preview.png"
import XChange from "../assets/Money_Exchange_Sticker_PNG_Images__Transparent_HD_Photo_Clipart_-removebg-preview.png"
import home from "../assets/Home_Icon_Clipart_Hd_PNG__Vector_Home_Icon__Home_Icons__Home_Clipart__Home_Icon_PNG_Image_For_Free_Download-removebg-preview.png";
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
      <div
        onClick={() => navigate("/XChange")}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
          currentScreen === "/XChange" ? "bg-black" : "bg-gray-900"
  }`}
        >
          <div className='flex flex-col items-center justify-center'>
            <img className='w-7 h-7 object-contain' src={XChange} alt='X' />
            <p className='text-xs text-center'>XChange</p>

          </div>
      </div>
    </nav>
  )
}

export default BottomNavigation