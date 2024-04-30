"use client";
import React from "react";
import { useState, useEffect } from "react";
import BookComponent from "../components/BookComponent";
import service from "@/appwrite/config";

const notes = () => {
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await service.getAllDocs("Notes");
      setNotes(res.documents);
      console.log(res);
    };
    getNotes();
  }, []);

  const handleSubmit = async () => {};
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden sm:block">
        <aside className="flex h-screen w-64 flex-col border-r border-black bg-white px-5 py-5">
          <p className="font-bold text-2xl">Sort By -</p>
          <div>
            <p className="font-semibold mt-2">Course(s)</p>
            <div className="w-full">
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold mt-2">Author(s)</p>
            <div className="w-full">
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="mt-4 justify-center items-center">
            <button
              className="border border-solid border-black p-2 rounded-md"
              onClick={handleSubmit}
            >
              Apply
            </button>
          </div>
        </aside>
      </div>
      <div>
        <div className="ml-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {notes ? (
            notes.map((item) => {
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
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default notes;
