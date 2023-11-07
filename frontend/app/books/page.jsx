'use client'
import BookComponent from "../components/BookComponent"
import React from "react";

const Books = () => {
    return (
        <div className='flex flex-row overflow-hidden'>
            <div className="hidden sm:block">
                <aside className="flex h-screen w-64 flex-col border-r border-black bg-white px-5 py-5">
                    <p className='font-bold text-2xl'>Sort By -</p>
                    <div>
                        <p className='font-semibold mt-2'>Course(s)</p>
                        <div className="w-full">
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <p className='font-semibold mt-2'>Author(s)</p>
                        <div className="w-full">
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                </aside>
            </div>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <BookComponent
                        cover="/book.png"
                        title="Introduction to Algorithms"
                        author="Thomas Cormen"
                        domain="Data Structures"
                        imgAlt="Book"
                    />
                    <BookComponent
                        cover="/book.png"
                        title="Introduction to Algorithms"
                        author="Thomas Cormen"
                        domain="Data Structures"
                        imgAlt="Book"
                    />
                    <BookComponent
                        cover="/book.png"
                        title="Introduction to Algorithms"
                        author="Thomas Cormen"
                        domain="Data Structures"
                        imgAlt="Book"
                    />
                    <BookComponent
                        cover="/book.png"
                        title="Introduction to Algorithms"
                        domain="Data Structures"
                        author="Thomas Cormen"
                        imgAlt="Book"
                    />
                    <BookComponent
                        cover="/book.png"
                        title="Introduction to Algorithms"
                        domain="Data Structures"
                        author="Thomas Cormen"
                        imgAlt="Book"
                    />
                </div>
            </div>
        </div>

    )
}
export default Books