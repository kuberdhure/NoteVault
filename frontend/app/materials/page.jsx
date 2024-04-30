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
  const [books,setBooks] = useState([])
  const [notes,setNotes] = useState([])
  const [videos,setVideos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, notesResponse, videosResponse] =
          await Promise.all([
            service.getAllDocs("Books"),
            service.getAllDocs("Notes"),
            service.getAllDocs("Videos"),
          ]);

        const filteredBooks = booksResponse.documents.filter(
          (book) => book.course.Title === course
        );
        const filteredNotes = notesResponse.documents.filter(
          (note) => note.course.Title === course
        );
        const filteredVideos = videosResponse.documents.filter(
          (vid) => vid.course.Title === course
        );

        setBooks(filteredBooks)
        setNotes(filteredNotes)
        setVideos(filteredVideos)

        console.log("Response", {
          books: filteredBooks,
          notes: filteredNotes,
          videos: filteredVideos,
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
;

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-2 mt-2 ml-2">
        Books for {course}
      </h2>

      <div
        className="grid grid-cols-1 mb-2 sm:grid-cols-
      2 md:grid-cols-3 lg:grid-cols-5 gap-1 ml-10 pt-3"
      >
        {books ? (
          books.map((item, index) => {
            return (
              <BookComponent
                id={item.$id}
                key={item.$id}
                cover={item.cover_page}
                title={item.title}
                domain={item.course ? item.course.Title : ""}
                author={item.author}
                imgAlt={"Book"}
                file={item.file}
                setBooks={setBooks}
                views={item.views}
              />
            );
          })
        ) : (
          <>No Books Available</>
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
        className="grid grid-cols-2 mb-4 sm:grid-cols-
      2 md:grid-cols-3 lg:grid-cols-5 gap-1 ml-10 pt-3"
      >
          {notes ? (
            notes.map((item,index) => {
              return (
                <BookComponent
                id={item.$id}
                key={item.$id}
                cover={item.cover_page}
                title={item.title}
                domain={item.course ? item.course.Title : ""}
                author={item.author}
                imgAlt={"Book"}
                file={item.file}
                views={item.views}
                setBooks={setNotes}
              />
              );
            })
          ) : (
            <></>
          )}
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
          {videos ? (
            videos.map((item) => {
              return (
                <ReactPlayer
                  key={item.$id}
                  controls={true}
                  light={false}
                  style={{ margin: "8px" }}
                  width="300px"
                  height="240px"
                  url={item.link}
                />
              );
            })
          ) : (
            <></>
          )}
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
export default dynamic(() => Promise.resolve(Material), { ssr: false });
