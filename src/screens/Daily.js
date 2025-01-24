import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import daily from '../assets/Download_checklist_clipboard_line_and_fill_style_icon_for_free-removebg-preview.png';
import { setShowMessage } from '../features/messageSlice';
import { setCoinShow } from '../features/coinShowSlice';

function Daily() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [claimAmount, setClaimAmount] = useState(10);
  const [claimDay, setClaimDay] = useState(1);
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimDisabled, setClaimDisabled] = useState(false);

  const formatNumber = (num) => {
    let numStr = num.toFixed(3);
    let [intPart, decPart] = numStr.split('.');
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (num < 0.01) {
      return `${intPart}, ${decPart}`;
    }

    decPart = decPart.slice(0, 2);
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

      if (hoursDiff < 24) {
        setIsClaimed(true);
        setClaimDay(user.daily.claimedDay);
      } else if (hoursDiff >= 48) {
        if (!claimDisabled) {
          dispatch(
            setShowMessage({
              message: 'You skipped one day',
              color: 'red',
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
          setClaimAmount(10 * Math.pow(2, newDay - 1));
        } else {
          setClaimAmount(10000);
        }
      }
    }
  }, [user, dispatch, claimDisabled]);

  const getServerTime = async (db, userId) => {
    const tempDocRef = doc(db, 'temp', userId);
    await setDoc(tempDocRef, { time: serverTimestamp() });

    const docSnap = await getDoc(tempDocRef);
    return docSnap.data().time;
  };

  const handleClaim = async () => {
    try {
      setClaimDisabled(true);
      dispatch(
        setShowMessage({
          message: 'Claiming daily rewards...',
          color: 'green',
        })
      );

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
        if (user?.daily?.claimedTime && hoursDiff >= 48) {
          setClaimDay(1);
          setClaimAmount(10);
          claimAmountX = 10;
          claimDayX = 1;
          dispatch(
            setShowMessage({
              message: 'Claim day has been reset',
              color: 'red',
            })
          );
        }
        setIsClaimed(true);
        dispatch(setCoinShow(true));

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // Create the document if it doesn't exist
          await setDoc(userRef, {
            balance: 0,
            daily: {
              claimedTime: null,
              claimedDay: 0,
            },
          });
        }

        await updateDoc(userRef, {
          balance: user.balance + claimAmountX,
          daily: {
            claimedTime: serverTimestamp(),
            claimedDay: claimDayX,
          },
        });
        setClaimDisabled(false);
      } else {
        dispatch(
          setShowMessage({
            message: 'Error, Please try again !',
            color: 'red',
          })
        );
      }
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      setIsClaimed(false);
      dispatch(
        setShowMessage({
          message: 'Error, Please try again!',
          color: 'red',
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
    <div className="text-white">
      <div className="flex items-center justify-center py-10">
        <div className="rounded-full p-4">
          <img className="w-28 h-28 object-contain" src={daily} alt="H" />
        </div>
      </div>
      <p className="text-center font-bold text-3x1">Daily rewards</p>
      <p className="text-center text-lg mt-2">
        Here you can claim your daily rewards
      </p>
      <p className="text-center text-x1 font-bold mt-4">(Day {claimDay})</p>
      <div className="mx-10 mt-20">
        {isClaimed ? (
          <button
            disabled
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
          >
            Claimed for today
          </button>
        ) : (
          <button
            disabled={claimDisabled}
            onClick={handleClaim}
            className={`w-full ${
              claimDisabled ? 'bf-gray-500' : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Claim ₩ {formatNumber(claimAmount)}
          </button>
        )}
      </div>
    </div>
  );
}

export default Daily;