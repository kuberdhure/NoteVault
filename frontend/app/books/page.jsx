"use client";
import BookComponent from "../components/BookComponent";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Client, Databases } from "appwrite";
import conf from "../../conf/conf";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("660579aadb0cea1edae6");
//.setKey('11268e2e06d71dbcd26848990eebe4e9f8a7ff75ce2422fc2479c9b31d766574e270de120e5dbaa7dd3a91883b701fe399f8210fc0b1cba9cc4dc50de06b1c0ad4f4ec9a6bfb4a8c3c196895a642e05bcf2c04ac11df247b7a1b37bd89bcf29d82f9d921239d891aa0d71fe9cff0bd682eea8403a11fd16ec6a40b68b9ca0c33') // Your project ID

const Books = () => {
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      //    (do not delete)
       try {
              const response = await databases
              //.getDocument('66057b599a5c78172b83', '66057e0e7fdcee12261d', '66057f376cf7617c652f');

      //         console.log("here!!")
      //         console.log("response",response);
      //         // setBooks(response.data.books);
      //         setLoading(false)
      //     } catch (error) {
      //         console.error("Error fetching data:", error);
      //         setLoading(false)
      //     }
        fetchData();
       }catch(err){
         console.log("Somethin went wrong",err)
       }
    }
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
                return course.toLowerCase() === ""
                  ? book
                  : book.title.toLowerCase().includes(course) &&
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
                  domain={book.domain}
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
