import React from 'react'
import Image from 'next/image'

const AcceptButton = () => {
    return (
        <div className='flex flex-row w-full rounded-md px-3 py-1 '>
            <Image
                src="/approve.png"
                width={25}
                height={25}
                alt="Accept Button"
                
            />
            {/* <div className='ml-2 mt-0.5' > */}
            {/* <input
                type="button"
                value="Accept"
            /> */}
            {/* </div> */}
           
        </div>



    )
}

export default AcceptButton