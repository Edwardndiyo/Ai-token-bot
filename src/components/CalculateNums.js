import React, { useState, useEffect } from 'react'
import { selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { setCalculated } from '../features/calculateSlice';

function CalculateNums() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [waiting, setWaiting] = useState(true);
    const [mined, setMined] = useState(0);
    const [remainingTime, setRemainingTime] = useState({
        hours: 6,
        minutes: 0,
        seconds: 0,
    });
    const [progress, setProgress] = useState(0);
    const [canClaim, setCanClaim] = useState(false);

    const MAX_MINE_RATE = 100.0;

    const calculateProgress = (miningStartedTime) => {
        if (!miningStartedTime) return 0;

        const now = Date.now();
        const totalMiningTime = 6 * 60 * 60 * 1000;
        const elapsedTime = now - miningStartedTime;

        if (elapsedTime >= totalMiningTime) {
            setCanClaim(true);
            return 100;
        }
        const progress = (elapsedTime / totalMiningTime) * 100;
        return Math.min(Math.max(progress, 0), 100);
    };

    const calculateMinedValue = (miningStartedTime, mineRate) => {
        if (!miningStartedTime || !mineRate) return 0;

        const now = Date.now();
        const totalMiningTime = 6 * 60 * 60 *100;
        let elapsedTime = now - miningStartedTime;

        elapsedTime = Math.round(elapsedTime / 1000) * 1000;

        if (elapsedTime >= totalMiningTime) {
            return mineRate * (totalMiningTime / 1000);
        }

        const minedValue = mineRate * (elapsedTime / 1000);

        return Math.round(minedValue * 1000) / 1000;
    };

  return (
    <div>CalculateNums</div>
  )
}

export default CalculateNums