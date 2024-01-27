import React from 'react';
import Image from 'next/image';
import axios from 'axios'



const rejectBuuton = async (title, type) =>{
    const data={
        title:title.title,
        type:title.type,
        status:"Reject"
    }
    try {
        const response = await axios.post("http://localhost:8000/api/approve/",data);
        console.log("response", response);
        
        if(response.data.message==="Rejected Successfully!"){
            window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      window.location.reload();

  }


const RejectButton = (title, type) => {
    return (
        <div className='flex flex-row w-full mt-2 rounded-md px-2 py-1 '>
            <div className='relative w-10 h-10'>
                <Image
                    src='/decline.png'
                    layout='fill'
                    objectFit='contain'
                    alt='Reject Button'
                    className='transition duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-110'
                    onClick={()=>{
                        rejectBuuton(title, type)
                    }}
                />
            </div>
            {/* Other elements you might want to include */}
        </div>
    );
};

export default RejectButton;
