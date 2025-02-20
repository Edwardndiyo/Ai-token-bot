import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectTopUsers } from '../features/topUsersSlice';


function Liders() {
    const user = useSelector(selectUser);
    const topUsers = useSelector(selectTopUsers);

    const calculateTopPercentage = (userBalance) => {
        if (topUsers.length === 0) return "N/A" ;

        const topUserBalance = topUsers[topUsers.length - 1].balance;
        if (topUserBalance === 0 ) return "100%";

        const percentage = (userBalance / topUserBalance) * 100;

        if (percentage >= 99.5) return "1%";
        if (percentage >= 90) return `${Math.ceil(100 - percentage)}%`;
        if (percentage >= 80) return "20%";
        if (percentage >= 50) return "50%";
        return `${Math.ceil(100 - percentage)}%`;
    };

    const userTopPercentage = calculateTopPercentage(user.balance);

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

      

  return (
    <div className='bg-gray-800 mx-4 mt-6 mb-24 h-60 rounded-lg relative'>
        <div
        className={`h-full overflow-y-auto hide-scrollbar ${
            !topUsers.some((topUser) => topUser.id === user.uid) && "pb-12"
        }`}
        >
            {topUsers.map(
                ({id, balance, firstName, lastName, userImage}, index) => (
                    <div
                    key={index}
                    className={`${
                        id === user.uid && "bg-gray-900 rounded-lg"
                    } flex items-center px-2 py-1 w-full`}
                    >
                        <div className='flex-shrink-0 mr-4'>
                            <div className='bg-zinc-950 flex items-center justify-center rounded-full h-8 w-8'>
                                <p className='text-white text-sm'>{index + 1  }</p>
                            </div>
                        </div>
                        <div className='flex-shrink-0 mr-2'>
                            <div className='border-2 border-yellow-700 overflow-hidden flex items-center justify-center rounded-full bg-gray-800 h-10 w-10'>
                                {userImage ? (
                                    <img
                                    className='w-9 h-9 object-contain'
                                    src={userImage}
                                    alt={firstName[0].toUpperCase()}
                                    />
                                     
                                ) : (
                                    <div className='text-x1 text-white bg-black w-14 h-14 flex items-center justify-center'>
                                        {firstName[0].toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex-grow min-w-0 flex items-center justify-between'>
                            <p className='text-white font-bold truncate mr-2'>
                                {firstName} {lastName}
                            </p>
                            <p className='text-white whitespace-nowrap flex-shrink-0'>
                            ₩ {formatNumber(balance)}
                            </p>
                        </div>
                     </div>
                )
            )}
        </div>
    </div>
  )
}

export default Liders