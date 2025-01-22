import React, {useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {selectUser} from "../features/userSlice";
import {
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {db} from "../firebase";
import daily from "../assets/47f36f7e-c5fd-4d19-9297-1e8c74609bf7.jpeg";
import {setShowMessage} from "../features/messageSlice";
import {setCoinShow} from "../features/coinShowSlice";


function Daily() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [claimAmount, setClaimAmount] = useState(10);
  const [claimDay, setClaimDay] = useState(1);
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimDisabled, setClaimDisabled] = useState(false);


  const formatNumber = (num) => {
    // Convert the number to a string with a fixed number of decimal places
    let numStr = num.toFixed(3);

    // split the number into integer and decimal parts
    let [intPart, decPart] = numStr.split(".");

    // Add thousand separators to the integer part
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // if the number is less than 0.01, keep 3 decimal places
    if(num < 0.01) {
      return `${intPart}, ${decPart}`;
    }

    // For other numbers, keep 2 decimal places
    decPart = decPart.slice(0, 2);

    // Always return the formatted number with 2 decimal places
    return `${intPart}, ${decPart}`;
  };

  const calculateClaimAmount = useCallback(async () => {
    if (user?.daily?.claimedTime) {
      const lastClaimTime = 
      user.daily.claimedTime instanceof Timestamp
        ? user.daily.claimedTime.toDate()
        : new Date(user.daily.claimedTime);
      const now = Timestamp.now().toDate();
      const hoursDiff = (now - lastClaimTime) / (1000 * 3600);

      if (hoursDiff < 24 ) {
        setIsClaimed(true);
        setClaimDay(user.daily.claimedDay);
      } else if (hoursDiff >= 48) {
        if (!claimDisabled) {
          dispatch(
            setShowMessage({
              message: "You skipped one day",
              color: "red",
            })
          );
        } 
        setIsClaimed(false);
        setClaimDay(1);
        setClaimAmount(10);
      } else {
        setIsClaimed(false);
        const newDay = user.daily.claimDay + 1;
        setClaimDay(newDay);
        if (newDay <= 10) {
          setClaimAmount(10 * Math.pow(2, newDay -1));
        } else {
          setClaimAmount(10000);
        }
      }
    }
  }, [user, dispatch, claimDisabled]);

  const handleClaim = async () => {
    try {
      setClaimDisabled(true);
      dispatch(
        setShowMessage({
          message: "Claiming daily rewards...",
          color: "green",
        })
      );
      const getServerTime = async (db, userId) => {
        await updateDoc(doc(db, "user", userId), {
          time: serverTimestamp(),
        });

        const checkTime = async (db, userId) => {
         const docSnap = await getDoc(doc(db, "users", userId));
         const serverTime = docSnap.date()?.time;

         if(serverTime) {
            return serverTime;
         } else{
          return new Promise((resolve) => {
            setTimeout(() => resolve(checkTime()), 1000);
          });
         }
        };

        return checkTime();
      };

      // usage
      const serverNow = await getServerTime(db, user.uid);

      const lastClaimTime = 
      user.daily.claimedTime instanceof Timestamp
        ? user.daily.claimedTime.toDate()
        : new Date(user.daily.claimedTime);
      const now = serverNow.toDate();
      const hoursDiff = (now - lastClaimTime) / (1000 * 3600);
      
      if (!user?.daily?.claimedTime || hoursDiff >= 24) {
        let claimAmountX = claimAmount;
        let claimDayX = claimDay;
        if(user?.daily?.claimedTime && hoursDiff >= 48) {
          setClaimDay(1);
          setClaimAmount(10);
          claimAmountX =10;
          claimDayX = 1;
          dispatch (
            setShowMessage({
              message: "Claim day has been reset",
              color: "red",
            })
          );
        }
        setIsClaimed(true);
        dispatch(setCoinShow(true));

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          balance: user.balance + claimAmountX,
          daily: {
            claimedTime: serverTimestamp(),
            claimedDay: claimDayX,
          },
        });
        setClaimDisabled(false);
      }  else{
        dispatch(
          setShowMessage({
            message: "Error, Please try again !",
            color: "red",
          })
        );
      }
    } catch (error) {
      console.error("Error claiming daily reward:", error);
      setIsClaimed(false);
      dispatch(
        setShowMessage({
          message: "Error, Please try again!",
          color: "red",
        })
      );
      dispatch(setCoinShow(false));
      setClaimDisabled(false);
    }
  };

  useEffect(() => {
    calculateClaimAmount();
  }, [calculateClaimAmount]);


  return (
    <div className='text-white'>
      <div className='flex items-center justify-center py-10'>
        <div className='rounded-full p-4'>
          <img className='w-28 h-28 object-contain' src={daily} alt='H' />
        </div>
      </div>
      <p className='text-center font-bold text-3x1'>Daily rewards</p>
      <p className='text-center text-lg mt-2'>Here you can claim your daily rewards</p>
      <p className='text-center text-x1 font-bold mt-4'>(Day {claimDay})</p>
      <div className='mx-10 mt-20'>
        {isClaimed ? (
          <button
          disabled
          className='w-full bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed'
          >
            Claimed for today
          </button>
        ) : (
          <button
          disabled={claimDisabled}
          onClick={handleClaim}
          className={`w-full ${
            claimDisabled ? "bf-gray-500" : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          >
            Claim B {formatNumber(claimAmount)}
          </button>
        )}
      </div>
    </div>
  );
}

export default Daily;