// import Books from "@/app/books/page";
"use client";
import BookComponent from "@/app/components/BookComponent";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import ReactPlayer from "react-player";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import service from "@/appwrite/config";
import { Query } from "appwrite";
import dynamic from "next/dynamic";


const Material = () => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const slider1Left = () => {
    var slider1 = document.getElementById("slider1");
    slider1.scrollLeft = slider1.scrollLeft - 500;
  };

  const slider1Right = () => {
    var slider1 = document.getElementById("slider1");
    slider1.scrollLeft = slider1.scrollLeft + 500;
  };
  const course = useSearchParams().get("courseName");
  const [data, setData] = useState({
    books: [],
    notes: [],
    videos: [],
    papers: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await service.getAllDocs("Books"
        // , [
        //   Query.equal("course", String(course)),
        // //   Query.equal("is_approved", true),
        // ]
        );
        // const notesResponse = service.getAllDocs("Books",[Query.select(["course",String(course)]),Query.equal("is_approved",true)])
        // const papersResponse = service.getAllDocs("Books",[Query.select(["course",String(course)]),Query.equal("is_approved",true)])
        // const videosResponse = service.getAllDocs("Books",[Query.select(["course",String(course)]),Query.equal("is_approved",true)])

        if(booksResponse.length > 0){
            setData((prevData) => ({
                ...prevData,
                books: booksResponse.documents,
                // notes: [...prevData.notes, notesResponse.documents],
                // papers: [...prevData.papers, papersResponse.documents],
                // videos: [...prevData.videos, videosResponse.documents],
              }));
      
        }
        
        console.log("Response", booksResponse.documents);
        console.log("data", data.books);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-2 mt-2 ml-2">
        Books for {course}
      </h2>

      <div className="grid grid-cols-1 mb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 ml-10 pt-3">
        {data.books? (
          data.books.map((book, index) => {
            <BookComponent
              key={book.$id}
              cover="/book.png"
              title={book.title}
              author={book.author}
              domain={course}
              imgAlt={book.title}
            />;
          })
        ) : (
          <>
            <h3> No Books available ! </h3>
          </>
        )}
      </div>
      <h2 className="font-semibold text-2xl mb-2 mt-2 ml-2">
        Notes for {course}
      </h2>

      <div className="relative flex items-center mb-4">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll flex flex-row scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          
          <BookComponent
            cover="/book.png"
            title="Introduction to Algorithms"
            domain="Data Structures"
            author="Thomas Cormen"
            imgAlt={"Book"}
          />
          <BookComponent
            cover="/book.png"
            title="Introduction to Algorithms"
            domain="Data Structures"
            author="Thomas Cormen"
            imgAlt={"Book"}
          />
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
      <h2 className="font-semibold text-2xl mb-2 mt-2 ml-2">
        Reference Videos for {course}
      </h2>
      <div className="relative flex items-center mb-2">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slider1Left}
          size={40}
        />
        <div
          id="slider1"
          className="w-full h-full mb-2 overflow-x-scroll flex flex-row scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          <ReactPlayer
            controls={true}
            light={true}
            style={{ margin: "2px" }}
            url="https://youtu.be/WdmbZnUesRw?feature=shared"
          />
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slider1Right}
          size={40}
        />
      </div>
    </div>
  );
};
export default dynamic (() => Promise.resolve(Material), {ssr: false})

