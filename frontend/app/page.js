"use client";
import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import BookComponent from "@/app/components/BookComponent";
import Course from "@/app/components/Course";
import Browse from "@/app/components/Browse";
import Image from "next/image";
import Link from "next/link";
import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import axios from "axios";



export default function Home() {

  const [loading, setLoading] = useState(true)
  const [books,setBooks]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      };
        try {
            console.log(config)
            const response = await axios.get(
              "http://127.0.0.1:8000/api/books/",
              {
                headers: {
                  'Content-Type': "application/json",
                  'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            setBooks(response.data.books);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false)
        }
    };
    fetchData();
}, []);

  return (
    <div>
      <div className="ml-5 mt-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold mb-2">Popular Books</h1>
          <div className="flex flex-row gap-x-2 mr-10 items-center">
            <Link href={"/books"}>
              <p className="text-right">Explore</p>
            </Link>
            <Link href={"/books"}>
              <Image
                src={"/right.svg"}
                alt={"Arrow"}
                height={25}
                width={25}
              />
            </Link>
          </div>
        </div>
        <div className="h-1.5 w-40 bg-black"></div>
      </div>
    
      {loading ? (
                   
                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',width:'1/2' }}>
                      <CircularProgress />
                  </Box>
              ) : (
                  // Render your book components once data is fetched
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 ml-10 pt-3">
                  {books.map((book, index) => (
                          <BookComponent
                              key={index}
                              cover={book.cover_page}
                              title={book.title}
                              author={book.author}
                              file={book.file}
                              domain={book.domain}
                              imgAlt="Book"
                          />
                      ))}
                  </div>
              )}
             
      <div className="mt-4 ml-5 mb-4 p-1">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl">Courses</h2>
          <div className="flex flex-row gap-x-2 mr-10 items-center">
            <Link href={"/books"}>
              <p className="text-right">Explore</p>
            </Link>
            <Link href={"/courses"}>
              <Image
                src="/right.svg"
                alt={"Arrow"}
                height={25}
                width={25}
              />
            </Link>
          </div>
        </div>
        <div className="h-1.5 w-40 bg-black"></div>
        <div className="flex flex-row justify-evenly mb-4 mt-2">
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
        </div>
      </div>
      <div className="mt-4">
        <p className="flex justify-center items-center text-2xl font-bold ">
          Browse By
        </p>
        <div className="flex flex-row justify-evenly mb-4 mt-4 flex-wrap">
          <Link href='/courses'><Browse browse_image={"/course.png"} browse_name={"Course"} /></Link>
          <Link href='/books'><Browse browse_image={"/book.png"} browse_name={"Books"} /></Link>
          <Link href='/papers'><Browse browse_image={"/paper.png"} browse_name={"Papers"}/></Link>
          <Link href='/notes'><Browse browse_image={"/Notes.png"} browse_name={"Notes"}/></Link>
          <Browse
            browse_image={"/University.png"}
            browse_name={"Universities"}
            browse_url={'/university'}
          />
          <Browse browse_image={"/video.png"} browse_name={"Videos"} />
        </div>
      </div>
    </div>
  );
}
