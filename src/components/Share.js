// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { setShowMessage } from '../features/messageSlice';

// function Share() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Platform URLs (replace with your actual URLs)
//   const platformLinks = {
//     telegram: 'https://t.me/your_telegram_page',
//     twitter: 'https://twitter.com/your_twitter_page',
//     youtube: 'https://youtube.com/your_youtube_page',
//   };

//   // Handle platform redirection
//   const redirectToPlatform = (platform) => {
//     const url = platformLinks[platform];
//     if (url) {
//       window.open(url, '_blank');
//       dispatch(
//         setShowMessage({
//           message: `Redirecting to ${platform}...`,
//           color: 'green',
//         })
//       );
//     } else {
//       dispatch(
//         setShowMessage({
//           message: `Error: ${platform} link not found.`,
//           color: 'red',
//         })
//       );
//     }
//   };

//   return (
//     <div className='text-white p-4'>
//       <h1 className='text-2xl font-bold text-center mb-6'>Follow and Earn</h1>
//       <div className='bg-gray-800 rounded-lg p-6 max-w-md mx-auto'>
//         <p className='text-lg mb-4'>
//           Follow our pages on these platforms to earn rewards:
//         </p>
//         <div className='space-y-4'>
//           {/* Telegram Button */}
//           <button
//             onClick={() => redirectToPlatform('telegram')}
//             className='flex items-center justify-center p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors w-full'
//           >
//             <FaTelegram className='text-white mr-2' />
//             <span>Follow on Telegram</span>
//           </button>

//           {/* Twitter Button */}
//           <button
//             onClick={() => redirectToPlatform('twitter')}
//             className='flex items-center justify-center p-3 bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors w-full'
//           >
//             <FaTwitter className='text-white mr-2' />
//             <span>Follow on X (Twitter)</span>
//           </button>

//           {/* YouTube Button */}
//           <button
//             onClick={() => redirectToPlatform('youtube')}
//             className='flex items-center justify-center p-3 bg-red-500 rounded-lg hover:bg-red-600 transition-colors w-full'
//           >
//             <FaYoutube className='text-white mr-2' />
//             <span>Subscribe on YouTube</span>
//           </button>
//         </div>
//       </div>
//       <button
//         onClick={() => navigate(-1)} // Go back to the previous page
//         className='mt-6 w-full max-w-md mx-auto p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors'
//       >
//         Go Back
//       </button>
//     </div>
//   );
// }

// export default Share;





import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setShowMessage } from '../features/messageSlice';

function Share() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Platform URLs (replace with your actual URLs)
  const platformLinks = {
    telegram: 'https://t.me/your_telegram_page',
    twitter: 'https://twitter.com/your_twitter_page',
    youtube: 'https://youtube.com/your_youtube_page',
  };

  // Handle platform redirection
  const redirectToPlatform = (platform) => {
    const url = platformLinks[platform];
    if (url) {
      window.open(url, '_blank');
      dispatch(
        setShowMessage({
          message: `Redirecting to ${platform}...`,
          color: 'green',
        })
      );
    } else {
      dispatch(
        setShowMessage({
          message: `Error: ${platform} link not found.`,
          color: 'red',
        })
      );
    }
  };

  return (
    <div className='text-white p-4 min-h-screen flex flex-col items-center justify-center'>
      <div className='w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6'>Follow and Earn</h1>
        <div className='bg-gray-800 rounded-lg p-6'>
          <p className='text-lg mb-4'>
            Follow our pages on these platforms to earn rewards:
          </p>
          <div className='space-y-4'>
            {/* Telegram Button */}
            <button
              onClick={() => redirectToPlatform('telegram')}
              className='flex items-center justify-center p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors w-full'
            >
              <FaTelegram className='text-white mr-2' />
              <span>Follow on Telegram</span>
            </button>

            {/* Twitter Button */}
            <button
              onClick={() => redirectToPlatform('twitter')}
              className='flex items-center justify-center p-3 bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors w-full'
            >
              <FaTwitter className='text-white mr-2' />
              <span>Follow on X (Twitter)</span>
            </button>

            {/* YouTube Button */}
            <button
              onClick={() => redirectToPlatform('youtube')}
              className='flex items-center justify-center p-3 bg-red-500 rounded-lg hover:bg-red-600 transition-colors w-full'
            >
              <FaYoutube className='text-white mr-2' />
              <span>Subscribe on YouTube</span>
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className='mt-6 w-full p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors'
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Share;