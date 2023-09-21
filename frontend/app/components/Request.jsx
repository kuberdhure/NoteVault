'use client';
import React from 'react'

const Request = (props) => {
  return (
    // contains two colums one for data and other for accept/reject button
    <div className='flex flex-row justify-between p-3 pl-5 pr-5 bg-red-200 w-11/12 rounded-lg mt-5'>
        {/* data div */}
        <div>
            <h1 className='text-xl font-semibold'>{props.title}</h1>
            <div>
                {props.branch} | {props.course} | {props.type}
            </div>
            <div >
                Uploaded By: {props.user}
            </div>
            <div>
                Class : {props.class}
            </div>
        </div>
        {/* accept/reject div */}
        <div>
            <div>
                Accept
            </div>
            <div>
                Reject
            </div>
        </div>

    </div>
  )
}

export default Request