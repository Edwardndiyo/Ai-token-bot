import React from 'react'
import blockchain from "../assets/5aff6077-b5ec-4adc-ae2d-9e5e77e49eda-removebg-preview.png";


function Daily() {
  return (
    <div className='text-white'>
      <div className='flex items-center justify-center pt-28 pb-10'>
        <div className='rounded-full p-4'>
          <img className='w-28 h-28 object-contain' src={blockchain} alt='H' />
        </div>
      </div>
    <p className='text-center font-bold text-3x1'>AirDrop</p>
    <p className='text-center text-lg mt-2'>Coming Very soon!</p>
    </div>
  );
}

export default Daily;