'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DropdownBox from '../components/DropdownBox'
import Image from 'next/image'
import FileContainer from '../components/FileContainer'

const Upload = () => {

    // list of options for rendering different options
    const branch = ["Computer Engineering", "Data Science", "AIML", "EXTC"]
    const courses = ["Operating System", "Computer Networks", "Design & Analysis of Algorithms", "Theory of Computation"]
    const material = ["Reference Book", "Question Paper", "Self Made Notes", "Video Link"]
    const type = ["MSE", "ESE"]

    // list of years 
    const startYear = 1995;
    const currentYear = (new Date()).getFullYear();

    let years = [];
    for (let i = startYear; i <= currentYear; i++) {
        years.push(i);
    }

    // flag to check which option is selected
    const [isQuestionPaper, setIsQuestionPaper] = useState(false);
    const [isLink, setIsLink] = useState(false)

    return (
        <div>
            {/* <Header /> */}
            <h1 className='text-3xl font-semibold underline ml-10 mt-5'>Upload Resource</h1>

            <div className='flex flex-row justify-center w-full h-full mt-5 space-x-0 '>

                {/* form  */}
                <div className=' w-1/2 flex flex-col'>

                    <DropdownBox
                        title="Branch"
                        options={branch}
                        mt={5}
                    />

                    <DropdownBox
                        title="Course"
                        options={courses}
                        mt={5}
                    />

                    <DropdownBox
                        title="Material Type"
                        options={material}
                        setIsQuestionPaper={setIsQuestionPaper}
                        setIsLink={setIsLink}
                        mt={5}
                        mb={5}
                    />

                    {
                        isQuestionPaper ?
                            <div className='flex flex-col w-full mb-5'>
                                <div className='mb-1'>
                                    This Question Paper belongs to?
                                </div>
                                <div className='flex flex-row justify-left w-2/3 mb-4'>
                                    <div className='mr-7'>
                                        <input type='radio' value='SPIT' name='paper' /> SPIT
                                    </div>
                                    <div>

                                        <input type='radio' value='Other' name='paper' /> Other University
                                    </div>
                                </div>
                                <div className='flex flex-row w-1/2'>
                                    {/* <div className='w-1/2'>
                                        Year
                                    </div> */}
                                    <div className='w-full'>
                                        <DropdownBox
                                            title="Year"
                                            options={years}
                                        />
                                    </div>

                                    {/* <div className='w-1/2'>
                                        Type
                                    </div> */}
                                    <div className='w-full'>
                                        <DropdownBox
                                            title="Type"
                                            options={type}
                                        />
                                    </div>
                                </div>

                            </div> : <></>
                    }

                    {
                        isLink ?
                            <div className='flex flex-col w-full mb-5'>
                                <input
                                    className="flex h-10 w-2/3 rounded-md border border-black bg-transparent px-3 py-2 text-sm "
                                    type="text"
                                    id="link"
                                    placeholder="Paste link here"
                                />

                            </div> : <></>
                    }


                    <input
                        className="flex h-10 w-2/3 rounded-md border border-black bg-transparent px-3 py-2 text-sm"
                        type="text"
                        id="title"
                        placeholder="Enter title"
                    />


                </div>

                {/* upload doc div  */}
                <div className='w-1/3'>

                    <FileContainer />
                </div>


            </div>
        </div>
    )
}

export default Upload