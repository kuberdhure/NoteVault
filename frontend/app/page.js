'use client';
import React from 'react'
import Header from './components/Header';
import Card from './components/Card';

export default function Home() {
    return (
        <div className='mt-5'>
        {/* <div>
            <Header/>
        </div> */}
        <main className='flex items-center justify-center flex-col space-y-4'>
            <h1 className='text-3xl font-semibold'>All Your Notes in One Place</h1>
            <p className='text-2xl '>BROWSE BY</p>
        </main>
          <div className='mt-5 flex justify-center items-center flex-wrap space-x-2 m-auto'>
              <Card icon={'/course.png'} navigate={'/courses'} title={'Courses'}/>
              <Card icon={'/book.png'} navigate={'/books'} title={'Books'}/>
              <Card icon={'/paper.png'} navigate={'/papers'} title={'Papers'}/>
          </div>
      </div>
    )
}
