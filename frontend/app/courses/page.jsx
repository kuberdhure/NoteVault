'use client'
import Link from 'next/link'
import {useState,useEffect} from 'react';
import axios from 'axios';
const Course = () => {

    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await axios.get("http://127.0.0.1:8000/api/courses/")
                
                setData(response.data.courses);
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        fetchData()
       
    },[])

    
    return (
        <div className="m-5 p-5">
            <div className='flex justify-around'>
                <h1 className='text-2xl font-semibold mb-2'>Courses</h1>
                <div className="flex grow justify-end">
                    <input
                        className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Serach"
                    />
                </div>

            </div>
            <div className='h-1.5 w-40 bg-black'></div>

            <div className='grid grid-cols-5 gap-4'>
                {
                    loading?(
                        <div>Loading...</div>
                    ):
                    data.map((item, index) => {

                        return (
                            <div key={item.title} className='w-75 h-40 bg-white rounded-lg border border-black p-4 items-center justify-center flex flex-col hover:w-70 m-5'>
                                <div className='font-bold text-xl text-center'>
                                    <Link href={{
                                        pathname:'/materials',
                                        query: {
                                            courseName:item.title
                                        }
                                    }}>
                                        {item.title}
                                    </Link>
                                </div>
                                <div className='font-semibold text-gray-500'>
                                    {item.course_code}
                                </div>
                            </div>
                        )

                    })
                }
            </div>




        </div>

    )
}
export default Course