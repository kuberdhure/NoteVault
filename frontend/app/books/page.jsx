'use client'
import BookComponent from "../components/BookComponent"

const Books = () => {
    return (
        <div>
            <div className='p-1'>
                <h1 className='text-2xl font-semibold mb-2'>Browse By Books</h1>
                <div className='h-1.5 w-40 bg-black'></div>
            </div>
            <BookComponent
            cover="/book.png"
            title = "Introduction to Data Structures"
            author = "Rahul Ruke"
            />
        </div>
    )
}
export default Books