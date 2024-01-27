import React from 'react';
import Image from 'next/image';
import axios from 'axios'


const acceptPressed = async (title, type) =>{
    const data={
        title:title.title,
        type:title.type,
        status:"approve"
    }
    try {
        const response = await axios.post("http://localhost:8000/api/approve/",data);
        console.log(title)
        console.log("response", response);
        if(response.data.message==="Approved Successfully!"){
            window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      window.reload();
  }


const AcceptButton = (title, type) => {
    return (
        <div className='flex flex-row w-full rounded-md px-2 py-1 ml-1.5'>
            <div className='relative w-7 h-7'>
                <Image
                    src='/approve.png'
                    layout='fill'
                    objectFit='contain'
                    alt='Accept Button'
                    className='transition duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-110'
                    onClick={()=>{
                        acceptPressed(title, type)
                    }}
                />
            </div>
            {/* Other elements you might want to include */}
        </div>
    );
};

export default AcceptButton;
