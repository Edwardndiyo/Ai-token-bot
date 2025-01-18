import React, { useState } from 'react'
import { selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { 
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
 } from "firebase/firestore";
 import { db } from "../firebase";
 import { selectCalculated } from '../features/calculateSlice';
 import { setShowMessage } from '../features/messageSlice';
 import { setCoinShow } from '../features/coinShowSlice';

function MiningButton() {
  const dispatch = useDispatch();
  
  return (
    <div>MiningButton</div>
  )
}

export default MiningButton