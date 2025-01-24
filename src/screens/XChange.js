import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { setShowMessage } from '../features/messageSlice';

function XChange() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [cryptoAmount, setCryptoAmount] = useState('');
  const [fiatAmount, setFiatAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy'); // 'buy' or 'sell'
  const [escrowStatus, setEscrowStatus] = useState('pending'); // 'pending', 'paid', 'completed', 'cancelled'

  const createTrade = async () => {
    if (!cryptoAmount || !fiatAmount) {
      dispatch(
        setShowMessage({
          message: 'Please enter both crypto and fiat amounts.',
          color: 'red',
        })
      );
      return;
    }

    try {
      const tradeId = `trade_${Date.now()}`; // Generate a unique trade ID
      await setDoc(doc(db, 'trades', tradeId), {
        sellerId: tradeType === 'sell' ? user.uid : null,
        buyerId: tradeType === 'buy' ? user.uid : null,
        cryptoAmount: parseFloat(cryptoAmount),
        fiatAmount: parseFloat(fiatAmount),
        escrowStatus: 'pending',
        createdAt: serverTimestamp(),
      });

      dispatch(
        setShowMessage({
          message: 'Trade created successfully!',
          color: 'green',
        })
      );

      // Reset form
      setCryptoAmount('');
      setFiatAmount('');
    } catch (error) {
      console.error('Error creating trade:', error);
      dispatch(
        setShowMessage({
          message: 'Error creating trade. Please try again.',
          color: 'red',
        })
      );
    }
  };

  const confirmPayment = async (tradeId) => {
    try {
      await setDoc(
        doc(db, 'trades', tradeId),
        { escrowStatus: 'paid' },
        { merge: true }
      );

      dispatch(
        setShowMessage({
          message: 'Payment confirmed! Waiting for seller to release funds.',
          color: 'green',
        })
      );
    } catch (error) {
      console.error('Error confirming payment:', error);
      dispatch(
        setShowMessage({
          message: 'Error confirming payment. Please try again.',
          color: 'red',
        })
      );
    }
  };

  const releaseFunds = async (tradeId) => {
    try {
      await setDoc(
        doc(db, 'trades', tradeId),
        { escrowStatus: 'completed' },
        { merge: true }
      );

      dispatch(
        setShowMessage({
          message: 'Funds released successfully!',
          color: 'green',
        })
      );
    } catch (error) {
      console.error('Error releasing funds:', error);
      dispatch(
        setShowMessage({
          message: 'Error releasing funds. Please try again.',
          color: 'red',
        })
      );
    }
  };

  return (
    <div className='text-white p-4 relative'>
      {/* Glass Effect Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10'></div>

      {/* Coming Soon Card */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-90 rounded-lg p-8 text-center z-20'>
        <h2 className='text-2xl font-bold mb-4'>Coming Soon</h2>
        <p className='text-gray-300 mb-6'>
          Our P2P Exchange is under construction. Stay tuned for seamless crypto
          trading with escrow functionality!
        </p>
        <div className='text-sm text-gray-400'>
          Preview of the functionality in the background↓
        </div>
      </div>

      {/* Trade Creation Form */}
      <div className='bg-gray-800 rounded-lg p-6 max-w-md mx-auto mb-8 opacity-50 pointer-events-none'>
        <h2 className='text-lg font-bold mb-4'>Create Trade</h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm mb-1'>Trade Type</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded-lg'
              disabled
            >
              <option value='buy'>Buy Crypto</option>
              <option value='sell'>Sell Crypto</option>
            </select>
          </div>
          <div>
            <label className='block text-sm mb-1'>Crypto Amount</label>
            <input
              type='number'
              value={cryptoAmount}
              onChange={(e) => setCryptoAmount(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded-lg'
              placeholder='Enter crypto amount'
              disabled
            />
          </div>
          <div>
            <label className='block text-sm mb-1'>Fiat Amount</label>
            <input
              type='number'
              value={fiatAmount}
              onChange={(e) => setFiatAmount(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded-lg'
              placeholder='Enter fiat amount'
              disabled
            />
          </div>
          <button
            onClick={createTrade}
            className='w-full p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors'
            disabled
          >
            Create Trade
          </button>
        </div>
      </div>

      {/* Trade List */}
      <div className='bg-gray-800 rounded-lg p-6 max-w-md mx-auto opacity-50 pointer-events-none'>
        <h2 className='text-lg font-bold mb-4'>Active Trades</h2>
        <div className='space-y-4'>
          {/* Example Trade */}
          <div className='bg-gray-700 rounded-lg p-4'>
            <p className='text-sm'>Trade ID: trade_12345</p>
            <p className='text-sm'>Crypto Amount: 0.1 BTC</p>
            <p className='text-sm'>Fiat Amount: $5000</p>
            <p className='text-sm'>Status: Pending</p>
            <div className='flex space-x-2 mt-2'>
              <button
                onClick={() => confirmPayment('trade_12345')}
                className='flex-1 p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors'
                disabled
              >
                Confirm Payment
              </button>
              <button
                onClick={() => releaseFunds('trade_12345')}
                className='flex-1 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors'
                disabled
              >
                Release Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XChange;