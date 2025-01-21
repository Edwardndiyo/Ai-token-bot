import React from 'react'
import MiningButton from '../components/MiningButton'
import UserRank from '../components/UserRank'
import Liders from '../components/Liders'

function Home() {
  return (
    <div className='flex flex-col h-screen relative'>
      <div className='flex items-center justify-center mt-16'>
        <MiningButton />
      </div>
      <div>
        <UserRank />
      </div>
      <div>
        <Liders />
      </div>
      </div>
  )
}

export default Home