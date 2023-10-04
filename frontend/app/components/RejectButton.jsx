import React from 'react'
import Image from 'next/image'

const RejectButton = () => {
    return (

        <div className='flex flex-row w-full mt-2  rounded-md px-2 py-1'>
        <Image
            src="/decline.png"
            width={36}
            height={35}
            alt="Reject Button"
            
        />
        {/* <div className='ml-2 mt-0.5' >
        <input
            type="button"
            value="Reject"
        />
        </div> */}
       
    </div>

    )
}

export default RejectButton