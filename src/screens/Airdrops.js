import React from 'react'
import blockchain from "../assets/47f36f7e-c5fd-4d19-9297-1e8c74609bf7.jpeg";

 

// function airdrops() {
//   return (
//     <div>airdrops</div>
//   )
// }

// export default airdrops

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