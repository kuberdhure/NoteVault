"use client";
import React from "react";
import Header from "../components/Header";
import Request from "../components/Request";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useEffect } from "react";


const PendingApprovals = () => {
  const [papers, setPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/approve/");
        console.log("response", response);
        setBooks(response.data.books);
        setNotes(response.data.notes);
        setPapers(response.data.papers);
        setVideos(response.data.videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  

  return (
    <div>
      {/* <Header /> */}
      <h1 className="text-2xl font-semibold mb-2 ml-5 mt-2">
        Recent Additions
      </h1>
      <div className="h-1.5 w-40 bg-black ml-5"></div>
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
        <div className=" relative items-start flex-col ml-10 mr-10 mt-5">
          {books.map((book, index) => (
            <Request
              key={index}
              id={book.id}
              title={book.title}
              course={book.course}
              type="Book"
              user={book.uploaded_by}
            />
          ))}
          {notes.map((note, index) => (
            <Request
              key={index}
              id={note.id}
              title={note.title}
              course={note.course}
              type="Notes"
              user={note.uploaded_by}
            />
          ))}
            {papers.map((paper, index) => (
                <Request
                key={index}
                id={paper.id}
                title={paper.title}
                course={paper.course}
                type="Paper"
                user={paper.uploaded_by}
                />
            ))}
            {videos.map((video, index) => (
                <Request
                key={index}
                id={video.id}
                title={video.title}
                course={video.course}
                type="Video"
                user={video.uploaded_by}
                />
            ))}
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
