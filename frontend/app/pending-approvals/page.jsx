"use client";
import React from "react";
import Header from "../components/Header";
import Request from "../components/Request";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useEffect } from "react";
import Lottie from "lottie-react";
import PageNotFound from "/public/PageNotFound.json";
import service from "@/appwrite/config";
import { Query } from "appwrite";

const PendingApprovals = () => {
  const [papers, setPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const userType = localStorage.getItem("UserType");

  //   console.log("UserType", userType)

  //   // useEffect(() => {
  //   //   const fetchData = async () => {
  //   //     try {
  //   //       const response = await axios.get("http://localhost:8000/api/approve/");
  //   //       console.log("response", response);
  //   //       setBooks(response.data.books);
  //   //       setNotes(response.data.notes);
  //   //       setPapers(response.data.papers);
  //   //       setVideos(response.data.videos);
  //   //       setLoading(false);
  //   //     } catch (error) {
  //   //       console.error("Error fetching data:", error);
  //   //       setLoading(false);
  //   //     }
  //   //   };
  //   //   fetchData();
  //   // }, []);

  useEffect(() => {
    const getData = async () => {
      const approvalData = await service.getAllDocs("Books", [
        Query.equal("is_approved", false),
      ]);
      console.log(approvalData);
      setBooks(approvalData.documents);
      setLoading(false);
    };
    console.log("useeeffect")
    getData();
  }, []);

  const handleApprovalRejection = (bookId) =>{
    setBooks(books => books.filter(book => book.$id != bookId));
  }

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
              id={book.$id}
              title={book.title}
              course={book.course.Title}
              type="Books"
              user={book.uploaded_by}
              docFileID={book.docFileID}
              imageFileID={book.imageFileID}
              handler={handleApprovalRejection}
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
