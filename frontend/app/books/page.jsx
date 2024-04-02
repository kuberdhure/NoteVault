"use client";
import BookComponent from "../components/BookComponent";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Client, Databases } from "appwrite";
import config from "../../conf/conf";
import service from "../../appwrite/config";

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(config.appwriteUrl) // Your API Endpoint
  .setProject(config.projectID);

const Books = () => {
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getAllDocs('Books')
        setBooks(data.documents);
        setLoading(false);
        console.log("response", data);
      } catch (err) {
        console.log("Somethin went wrong", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    console.log("Author", author);
    console.log("Course", course);
  };
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden sm:block">
        <aside className="flex h-screen w-64 flex-col border-r border-black bg-white px-5 py-5">
          <p className="font-bold text-2xl">Sort By -</p>
          <div>
            <p className="font-semibold mt-2">Title</p>
            <div className="w-full">
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Search"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
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
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "1/2",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          // Render your book components once data is fetched
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books
              .filter((book) => {
                return book.course.Title.toLowerCase() === ""
                  ? book
                  : book.title.toLowerCase().includes(course) ||
                    author.toLowerCase() === ""
                  ? book
                  : book.author.toLowerCase().includes(author);
              })
              .map((book, index) => (
                <BookComponent
                  key={index}
                  cover={book.cover_page}
                  title={book.title}
                  author={book.author}
                  file={book.file}
                  imgAlt="Book"
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Books;
