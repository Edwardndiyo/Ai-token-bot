import React, { useEffect, useState } from 'react';
import youtubeLogo from "../assets/7b0e5ab7-38f9-40a4-a958-6c0d9b389d79.jpeg"
import telegramLogo from "../assets/6.jpeg"
import xLogo from "../assets/3.jpeg";
import friends from "../assets/9.jpeg";
import checkLogo from "../assets/7b0e5ab7-38f9-40a4-a958-6c0d9b389d79.jpeg";
import LoadingModul from "./LoadingModul";
import { useDispatch, useSelector } from 'react-redux';
import {setShowMessage} from "../features/messageSlice";
import { setCoinShow} from "../features/coinShowSlice";
import {db} from "../firebase"
import { setDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import {selectUser} from "../features/userSlice";
import { useNavigate } from 'react-router-dom';


function LinkButton({image, name, amount, link}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [checking, setChecking] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [canClaim, setCanClaim] = useState(false);

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
    
      const getToLink = async () => {
        if (link === "referral") {
            navigate("/share");
        } else {
            if (user.links && user.links[link]) {
                window.open(link, "_blank");
            } else {
            try {
                window.open(link, "_blank");
                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        links: {
                            [link] : {
                                claimed: false,
                                time: serverTimestamp(),
                            },
                        },
                    },
                    {merge: true}
                );
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
                        [link] : {
                            claimed: true,
                        },
                    },
                    balance: user.balance + amount,
                },
                {merge: true}
            );
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
        }
        if (user.links && user.links[link] && user.links[link].claimed) {
            setIsClaimed(true);
        }
        if (user.links && user.links[link] && !user.links[link].claimed) {
            const now = Timestamp.now();
            const timeDiff = now.toMillis() - user.links[link].time;

            if (!user.links[link].time){
                setChecking(true);
            }

            if(timeDiff < 3600000) {
                setChecking(true);
            } else if (timeDiff > 3600000) {
                setCanClaim(true);
            }
        }
    }, [user.links, link]);

    useEffect(() => {
        if (
            link === "referral" && 
            Object.keys(user.referrals).length >= 10 &&
            !user.links[link]
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
                        {merge: true}
                    );
                } catch (error) {
                    console.error("Error updating linke date:", error);
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
                height: image === "telegram" ? 50 : image === "referral" ? 50: 60,
                width: image === "telegram" ? 50 : image === "referral" ? 50: 60,
            }}
            src={
                image === "youtube"
                ? youtubeLogo
                : image === "telegram"
                ? telegramLogo
                :image === "c"
                ? xLogo
                : image === "referral"
                ?friends
                : null
            }
            alt='L'            
            />
        </div>
       <div className='mx-3 w-full'>
        <p className='text-sm'>{name} </p>
        <p className='font-bold'>+B {formatNumber(amount)} </p>
        </div>
    </div>
  )
}

export default LinkButton