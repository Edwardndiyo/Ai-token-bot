// import React, { useEffect, useState } from 'react';
// import youtubeLogo from "../assets/Download_Youtube_logo_png__Youtube_logo_transparent_png__Youtube_icon_transparent_free_png-removebg-preview.png";
// import telegramLogo from "../assets/Telegram_Logo_PNG_Vector__AI__CDR__EPS__PDF__SVG__Free_Download-removebg-preview.png";
// import xLogo from "../assets/Premium_Vector___New_Twitter_logo_X_2023_Twitter_X_logo_vector_download-removebg-preview.png";
// import friends from "../assets/Golden_Coins_3d_Vector__Golden_Bitcoin_Coin_3d_Rendering__Coin__Bitcoin__Btc_PNG_Image_For_Free_Download-removebg-preview.png";
// import checkLogo from "../assets/Golden_Coins_3d_Vector__Golden_Bitcoin_Coin_3d_Rendering__Coin__Bitcoin__Btc_PNG_Image_For_Free_Download-removebg-preview.png";
// import LoadingModul from "./LoadingModul";
// import { useDispatch, useSelector } from 'react-redux';
// import { setShowMessage } from "../features/messageSlice";
// import { setCoinShow } from "../features/coinShowSlice";
// import { db } from "../firebase";
// import { setDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
// import { selectUser } from "../features/userSlice";
// import { useNavigate } from 'react-router-dom';

// function LinkButton({ image, name, amount, link }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectUser);

//   const [checking, setChecking] = useState(false);
//   const [isClaimed, setIsClaimed] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [canClaim, setCanClaim] = useState(false);

//   const formatNumber = (num) => {
//     let numStr = num.toFixed(3);
//     let [intPart, decPart] = numStr.split(".");
//     intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//     if (num < 0.01) {
//       return `${intPart}, ${decPart}`;
//     }

//     decPart = decPart.slice(0, 2);
//     return `${intPart}, ${decPart}`;
//   };

//   const getToLink = async () => {
//     if (link === "referral") {
//       navigate("/share");
//     } else {
//       try {
//         // Open the link in a new tab
//         window.open(link, "_blank");

//         // Update Firestore only if the link hasn't been clicked before
//         if (!user.links || !user.links[link]) {
//           await setDoc(
//             doc(db, "users", user.uid),
//             {
//               links: {
//                 [link]: {
//                   claimed: false,
//                   time: serverTimestamp(),
//                 },
//               },
//             },
//             { merge: true }
//           );
//         }

//         // Update state to reflect that the link has been clicked
//         setIsClicked(true);
//       } catch (error) {
//         console.error("Error updating link data:", error);
//         dispatch(
//           setShowMessage({
//             message: "Error, please try again!",
//             color: "red",
//           })
//         );
//       }
//     }
//   };

//   const claimRewards = async () => {
//     try {
//       dispatch(
//         setShowMessage({
//           message: "Claiming rewards in progress...",
//           color: "green",
//         })
//       );
//       dispatch(setCoinShow(true));

//       await setDoc(
//         doc(db, "users", user.uid),
//         {
//           links: {
//             [link]: {
//               claimed: true,
//             },
//           },
//           balance: user.balance + amount,
//         },
//         { merge: true }
//       );

//       // Reset states after claiming rewards
//       setIsClaimed(true);
//       setCanClaim(false);
//       setChecking(false);
//     } catch (error) {
//       console.error("Error claiming rewards:", error);
//       dispatch(
//         setShowMessage({
//           message: "Error. Please try again!",
//           color: "red",
//         })
//       );
//       dispatch(setCoinShow(false));
//     }
//   };

//   useEffect(() => {
//     setIsClicked(false);
//     setChecking(false);
//     setIsClaimed(false);

//     if (user.links && user.links[link]) {
//       setIsClicked(true);

//       if (user.links[link].claimed) {
//         setIsClaimed(true);
//       } else if (user.links[link].time) {
//         const now = Timestamp.now().toMillis();
//         const claimTime = user.links[link].time.toMillis();
//         const timeDiff = now - claimTime;

//         if (timeDiff < 3600000) {
//           setChecking(true);
//         } else {
//           setCanClaim(true);
//         }
//       }
//     }
//   }, [user.links, link]);

//   useEffect(() => {
//     if (
//       link === "referral" &&
//       Object.keys(user.referrals).length >= 10 &&
//       !user.links?.[link]
//     ) {
//       const setLink = async () => {
//         try {
//           await setDoc(
//             doc(db, "users", user.uid),
//             {
//               links: {
//                 [link]: {
//                   claimed: false,
//                   time: serverTimestamp(),
//                 },
//               },
//             },
//             { merge: true }
//           );
//         } catch (error) {
//           console.error("Error updating link data:", error);
//           dispatch(
//             setShowMessage({
//               message: "Error. Please try again!",
//               color: "red",
//             })
//           );
//         }
//       };

//       setLink();
//     }
//   }, [link, user, dispatch]);

//   return (
//     <div
//       onClick={getToLink}
//       className='bg-gray-900 rounded-xl flex items-center p-2 mb-2 cursor-pointer'
//     >
//       <div className='flex items-center justify-center w-[80px]'>
//         <img
//           className='object-contain'
//           style={{
//             height: image === "telegram" ? 50 : image === "referral" ? 50 : 60,
//             width: image === "telegram" ? 50 : image === "referral" ? 50 : 60,
//           }}
//           src={
//             image === "youtube"
//               ? youtubeLogo
//               : image === "telegram"
//               ? telegramLogo
//               : image === "c"
//               ? xLogo
//               : image === "referral"
//               ? friends
//               : null
//           }
//           alt='L'
//         />
//       </div>
//       <div className='mx-3 w-full'>
//         <p className='text-sm'>{name}</p>
//         <p className='font-bold'>+₩ {formatNumber(amount)}</p>
//       </div>
//       {isClicked && (
//         <div>
//           {checking ? (
//             <div className='mr2'>
//               <LoadingModul size={26} />
//             </div>
//           ) : (
//             <div className='mr-1' onClick={(e) => e.stopPropagation()}>
//               {isClaimed ? (
//                 <img
//                   className='w-12 h-12 object-contain'
//                   src={checkLogo}
//                   alt='C'
//                 />
//               ) : canClaim ? (
//                 <button
//                   onClick={claimRewards}
//                   className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2 py-1 rounded'
//                 >
//                   Claim
//                 </button>
//               ) : null}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LinkButton;




// import React, { useEffect, useState } from 'react';
// import youtubeLogo from "../assets/Download_Youtube_logo_png__Youtube_logo_transparent_png__Youtube_icon_transparent_free_png-removebg-preview.png";
// import telegramLogo from "../assets/Telegram_Logo_PNG_Vector__AI__CDR__EPS__PDF__SVG__Free_Download-removebg-preview.png";
// import xLogo from "../assets/Premium_Vector___New_Twitter_logo_X_2023_Twitter_X_logo_vector_download-removebg-preview.png";
// import friends from "../assets/Golden_Coins_3d_Vector__Golden_Bitcoin_Coin_3d_Rendering__Coin__Bitcoin__Btc_PNG_Image_For_Free_Download-removebg-preview.png";
// import checkLogo from "../assets/Golden_Coins_3d_Vector__Golden_Bitcoin_Coin_3d_Rendering__Coin__Bitcoin__Btc_PNG_Image_For_Free_Download-removebg-preview.png";
// import LoadingModul from "./LoadingModul";
// import { useDispatch, useSelector } from 'react-redux';
// import { setShowMessage } from "../features/messageSlice";
// import { setCoinShow } from "../features/coinShowSlice";
// import { db } from "../firebase";
// import { setDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
// import { selectUser } from "../features/userSlice";
// import { useNavigate } from 'react-router-dom';

// function LinkButton({ image, name, amount, link }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectUser);

//   const [checking, setChecking] = useState(false);
//   const [isClaimed, setIsClaimed] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [canClaim, setCanClaim] = useState(false);

//   const formatNumber = (num) => {
//     let numStr = num.toFixed(3);
//     let [intPart, decPart] = numStr.split(".");
//     intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//     if (num < 0.01) {
//       return `${intPart}, ${decPart}`;
//     }

//     decPart = decPart.slice(0, 2);
//     return `${intPart}, ${decPart}`;
//   };

//   const getToLink = async () => {
//     if (link === "referral") {
//       navigate("/share");
//     } else {
//       try {
//         // Open the link in a new tab
//         window.open(link, "_blank");

//         // Update Firestore only if the link hasn't been clicked before
//         if (!user.links || !user.links[link]) {
//           await setDoc(
//             doc(db, "users", user.uid),
//             {
//               links: {
//                 [link]: {
//                   claimed: false,
//                   time: serverTimestamp(),
//                 },
//               },
//             },
//             { merge: true }
//           );
//         }

//         // Update state to reflect that the link has been clicked
//         setIsClicked(true);
//       } catch (error) {
//         console.error("Error updating link data:", error);
//         dispatch(
//           setShowMessage({
//             message: "Error, please try again!",
//             color: "red",
//           })
//         );
//       }
//     }
//   };

//   const claimRewards = async () => {
//     try {
//       dispatch(
//         setShowMessage({
//           message: "Claiming rewards in progress...",
//           color: "green",
//         })
//       );
//       dispatch(setCoinShow(true));

//       await setDoc(
//         doc(db, "users", user.uid),
//         {
//           links: {
//             [link]: {
//               claimed: true,
//             },
//           },
//           balance: user.balance + amount,
//         },
//         { merge: true }
//       );

//       // Reset states after claiming rewards
//       setIsClaimed(true);
//       setCanClaim(false);
//       setChecking(false);
//     } catch (error) {
//       console.error("Error claiming rewards:", error);
//       dispatch(
//         setShowMessage({
//           message: "Error. Please try again!",
//           color: "red",
//         })
//       );
//       dispatch(setCoinShow(false));
//     }
//   };

//   useEffect(() => {
//     setIsClicked(false);
//     setChecking(false);
//     setIsClaimed(false);

//     if (user.links && user.links[link]) {
//       setIsClicked(true);

//       if (user.links[link].claimed) {
//         setIsClaimed(true);
//       } else if (user.links[link].time) {
//         const now = Timestamp.now().toMillis();
//         const claimTime = user.links[link].time.toMillis();
//         const timeDiff = now - claimTime;

//         if (timeDiff < 3600000) {
//           setChecking(true);
//         } else {
//           setCanClaim(true);
//         }
//       }
//     }
//   }, [user.links, link]);

//   useEffect(() => {
//     if (
//       link === "referral" &&
//       Object.keys(user.referrals).length >= 10 &&
//       !user.links?.[link]
//     ) {
//       const setLink = async () => {
//         try {
//           await setDoc(
//             doc(db, "users", user.uid),
//             {
//               links: {
//                 [link]: {
//                   claimed: false,
//                   time: serverTimestamp(),
//                 },
//               },
//             },
//             { merge: true }
//           );
//         } catch (error) {
//           console.error("Error updating link data:", error);
//           dispatch(
//             setShowMessage({
//               message: "Error. Please try again!",
//               color: "red",
//             })
//           );
//         }
//       };

//       setLink();
//     }
//   }, [link, user, dispatch]);

//   return (
//     <div
//       onClick={getToLink}
//       className='bg-gray-900 rounded-xl flex items-center p-2 mb-2 cursor-pointer'
//     >
//       <div className='flex items-center justify-center w-[80px]'>
//         <img
//           className='object-contain'
//           style={{
//             height: image === "telegram" ? 50 : image === "referral" ? 50 : 60,
//             width: image === "telegram" ? 50 : image === "referral" ? 50 : 60,
//           }}
//           src={
//             image === "youtube"
//               ? youtubeLogo
//               : image === "telegram"
//               ? telegramLogo
//               : image === "c"
//               ? xLogo
//               : image === "referral"
//               ? friends
//               : null
//           }
//           alt='L'
//         />
//       </div>
//       <div className='mx-3 w-full'>
//         <p className='text-sm'>{name}</p>
//         <p className='font-bold'>+₩ {formatNumber(amount)}</p>
//       </div>
//       {isClicked && (
//         <div>
//           {checking ? (
//             <div className='mr2'>
//               <LoadingModul size={26} />
//             </div>
//           ) : (
//             <div className='mr-1' onClick={(e) => e.stopPropagation()}>
//               {isClaimed ? (
//                 <img
//                   className='w-12 h-12 object-contain'
//                   src={checkLogo}
//                   alt='C'
//                 />
//               ) : canClaim ? (
//                 <button
//                   onClick={claimRewards}
//                   className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2 py-1 rounded'
//                 >
//                   Claim
//                 </button>
//               ) : null}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LinkButton;



import React, { useEffect, useState } from 'react';
import youtubeLogo from "../assets/Download_Youtube_logo_png__Youtube_logo_transparent_png__Youtube_icon_transparent_free_png-removebg-preview.png";
import telegramLogo from "../assets/Telegram_Logo_PNG_Vector__AI__CDR__EPS__PDF__SVG__Free_Download-removebg-preview.png";
import xLogo from "../assets/Premium_Vector___New_Twitter_logo_X_2023_Twitter_X_logo_vector_download-removebg-preview.png";
import friends from "../assets/Golden_Coins_3d_Vector__Golden_Bitcoin_Coin_3d_Rendering__Coin__Bitcoin__Btc_PNG_Image_For_Free_Download-removebg-preview.png";
import checkLogo from "../assets/Golden_Coins_3d_Vector__Golden_Bitcoin_Coin_3d_Rendering__Coin__Bitcoin__Btc_PNG_Image_For_Free_Download-removebg-preview.png";
import LoadingModul from "./LoadingModul";
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessage } from "../features/messageSlice";
import { setCoinShow } from "../features/coinShowSlice";
import { db } from "../firebase";
import { setDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { selectUser } from "../features/userSlice";
import { useNavigate } from 'react-router-dom';

function LinkButton({ image, name, amount, link }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [checking, setChecking] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [canClaim, setCanClaim] = useState(false);

  const formatNumber = (num) => {
    let numStr = num.toFixed(3);
    let [intPart, decPart] = numStr.split(".");
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (num < 0.01) {
      return `${intPart}, ${decPart}`;
    }

    decPart = decPart.slice(0, 2);
    return `${intPart}, ${decPart}`;
  };

  const getToLink = async () => {
    if (link === "referral") {
      navigate("/shares");
    } else {
      try {
        // Open the link in a new tab
        const platformLinks = {
          // telegram: 'https://t.me/your_telegram_page',
          twitter: 'https://twitter.com/_ed__ward_',
          youtube: 'https://youtube.com/channel/UCPeNZRwtzbYXSvLvuNxwWwg',
        };
        const url = platformLinks[link];
        if (url) {
          window.open(url, "_blank");
        }

        // Update Firestore only if the link hasn't been clicked before
        if (!user.links || !user.links[link]) {
          await setDoc(
            doc(db, "users", user.uid),
            {
              links: {
                [link]: {
                  claimed: false,
                  time: serverTimestamp(),
                },
              },
            },
            { merge: true }
          );
        }

        // Update state to reflect that the link has been clicked
        setIsClicked(true);
      } catch (error) {
        console.error("Error updating link data:", error);
        dispatch(
          setShowMessage({
            message: "Error, please try again!",
            color: "red",
          })
        );
      }
    }
  };

  const claimRewards = async () => {
    try {
      dispatch(
        setShowMessage({
          message: "Claiming rewards in progress...",
          color: "green",
        })
      );
      dispatch(setCoinShow(true));

      await setDoc(
        doc(db, "users", user.uid),
        {
          links: {
            [link]: {
              claimed: true,
            },
          },
          balance: user.balance + amount,
        },
        { merge: true }
      );

      // Reset states after claiming rewards
      setIsClaimed(true);
      setCanClaim(false);
      setChecking(false);
    } catch (error) {
      console.error("Error claiming rewards:", error);
      dispatch(
        setShowMessage({
          message: "Error. Please try again!",
          color: "red",
        })
      );
      dispatch(setCoinShow(false));
    }
  };

  useEffect(() => {
    setIsClicked(false);
    setChecking(false);
    setIsClaimed(false);

    if (user.links && user.links[link]) {
      setIsClicked(true);

      if (user.links[link].claimed) {
        setIsClaimed(true);
      } else if (user.links[link].time) {
        // Ensure the time field is a valid Firestore Timestamp
        const claimTime = user.links[link].time;
        if (claimTime && typeof claimTime.toMillis === 'function') {
          const now = Timestamp.now().toMillis();
          const timeDiff = now - claimTime.toMillis();

          if (timeDiff < 3600000) {
            setChecking(true);
          } else {
            setCanClaim(true);
          }
        } else {
          console.error("Invalid timestamp format:", claimTime);
        }
      }
    }
  }, [user.links, link]);

  useEffect(() => {
    if (
      link === "referral" &&
      Object.keys(user.referrals).length >= 10 &&
      !user.links?.[link]
    ) {
      const setLink = async () => {
        try {
          await setDoc(
            doc(db, "users", user.uid),
            {
              links: {
                [link]: {
                  claimed: false,
                  time: serverTimestamp(),
                },
              },
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Error updating link data:", error);
          dispatch(
            setShowMessage({
              message: "Error. Please try again!",
              color: "red",
            })
          );
        }
      };

      setLink();
    }
  }, [link, user, dispatch]);

  return (
    <div
      onClick={getToLink}
      className='bg-gray-900 rounded-xl flex items-center p-2 mb-2 cursor-pointer'
    >
      <div className='flex items-center justify-center w-[80px]'>
        <img
          className='object-contain'
          style={{
            height: image === "telegram" ? 50 : image === "referral" ? 50 : 60,
            width: image === "telegram" ? 50 : image === "referral" ? 50 : 60,
          }}
          src={
            image === "youtube"
              ? youtubeLogo
              : image === "telegram"
              ? telegramLogo
              : image === "twitter"
              ? xLogo
              : image === "referral"
              ? friends
              : null
          }
          alt='L'
        />
      </div>
      <div className='mx-3 w-full'>
        <p className='text-sm'>{name}</p>
        <p className='font-bold'>+₩ {formatNumber(amount)}</p>
      </div>
      {isClicked && (
        <div>
          {checking ? (
            <div className='mr2'>
              <LoadingModul size={26} />
            </div>
          ) : (
            <div className='mr-1' onClick={(e) => e.stopPropagation()}>
              {isClaimed ? (
                <img
                  className='w-12 h-12 object-contain'
                  src={checkLogo}
                  alt='C'
                />
              ) : canClaim ? (
                <button
                  onClick={claimRewards}
                  className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2 py-1 rounded'
                >
                  Claim
                </button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LinkButton;