"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DropdownBox from "../components/DropdownBox";
import { useRouter } from "next/navigation";
import service from "@/appwrite/config";
import config from "../../conf/conf";
import Image from "next/image";
import FileContainer from "../components/FileContainer";

import axios from "axios";
// const firebaseConfig = {
//   apiKey: "AIzaSyBh-8G4kOXSBYzcoHzjC_R0QZo8frsZnPY",
//   authDomain: "notevault-5684a.firebaseapp.com",
//   projectId: "notevault-5684a",
//   storageBucket: "notevault-5684a.appspot.com",
//   messagingSenderId: "118095513364",
//   appId: "1:118095513364:web:07f431474bdc7c100da401",
//   measurementId: "G-TNBL9KNV7J",
// };

//firebase.initializeApp(firebaseConfig);

const Upload = () => {
  const router = useRouter();

  //TODO: use useEffect to fetch courses

  //useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/upload/", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log("Response", response);
  //     setCourses(response.data.courses);

  //}
  //    catch (e) {
  //      console.log(e);
  //    }
  //  };
  //  fetchData();
  //}, []);

  // list of options for rendering different options
  const [courses, setCourses] = useState([]);
  const material = ["Reference Book", "Question Paper", "Notes", "Videos"];
  const type = ["End Sem", "Mid Sem", "In Sem", "Quiz", "Assignment", "Others"];

  // list of years
  const startYear = 1995;
  const currentYear = new Date().getFullYear();

  let years = [];
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  // flag to check which option is selected
  const [isQuestionPaper, setIsQuestionPaper] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBook, setIsBook] = useState(false);

  // common fields
  const [userCourse, setUserCourse] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");

  // book data
  const [bookAuthorName, setBookAuthorName] = useState("");
  const [bookEdition, setBookEdition] = useState(0);

  // paper data
  const [isSpit, setIsSpit] = useState(true);
  const [paperYear, setPaperYear] = useState(0);
  const [paperType, setPaperType] = useState("");

  // video data
  const [videoLink, setVideoLink] = useState("");

  // file data
  const [fileURL, setFileURL] = useState("");
  const [coverPageURL, setCoverPageURL] = useState("");

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [isImgFilesUploaded, setIsImgFilesUploaded] = useState(false);
  const [isDocFilesUploaded, setIsDocFilesUploaded] = useState(false);
  const [imgfileID, setImgFileID] = useState("");
  const [docfileID, setDocFileID] = useState("");

  const [fileEvents, setFileEvents] = useState({
    fileEvent: "",
    imgEvent: "",
  });

  const fileHandler = service;

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await fileHandler.getAllDocs("Course");
      console.log(courseData);
      const courseArr = courseData.documents.map((course) => course.Title);
      setCourses(courseArr);
    };
    fetchData();
  }, []);

  const handleFileUpload = async (file) => {
    const selectedFile = file;

    if (selectedFile) {
      try {
        setIsUploadInProgress(true);
        const response = await fileHandler.uploadFile("Docs", selectedFile);
        // console.log("Doc File upload response", response);
        
        setTimeout(()=>setDocFileID(response.$id) ,100)
        console.log("file id", docfileID);
        console.log("file id res",response.$id);
        setIsDocFilesUploaded(true);
        return response;
      } catch (error) {
        console.log("Error occurred while uploading file", error);
      } finally {
        setIsUploadInProgress(false);
      }
    } else {
      alert("No file selected");
    }
  };

  const handleCoverPageUpload = async (file) => {
    const selectedFile = file ;

    if (selectedFile) {
      try {
        setIsUploadInProgress(true);
        const response = await fileHandler.uploadFile("Image", selectedFile);
        // console.log("Image File upload response", response);
        console.log("img id", imgfileID);  
        console.log("file id res",response.$id);

        // setImgFileID(response.$id);
        setTimeout(()=>setImgFileID(response.$id) ,100)

        setIsImgFilesUploaded(true);
        return response;
      } catch (error) {
        console.log("Error occurred while uploading file", error);
      } finally {
        setIsUploadInProgress(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const dataUpload = async () => {
    try {
      const response = await fileHandler.uploadData(
        {
          collectionName: "Books",
          title: resourceTitle,
          docID: docfileID,
          coverImage: `https://cloud.appwrite.io/v1/storage/buckets/${config.imageBucketID}/files/${imgfileID}/view?project=${config.projectID}`,
        },
        {
          docFileID: docfileID,
          imageFileID: imgfileID,
          author: bookAuthorName,
          edition: bookEdition,
          course: userCourse,
          file: `https://cloud.appwrite.io/v1/storage/buckets/${config.docsBucketID}/files/${docfileID}/view?project=${config.projectID}`,
        }
      );
      console.log("data upload res", response);
      return response;
    } catch (error) {
      console.log(error);
    }

    
  };

  const uploadClicked = async () => {
    const imgFileEvent = fileEvents.imgEvent;
    const docFileEvent = fileEvents.fileEvent;

    try {
      const docResponse = await handleFileUpload(docFileEvent);
      console.log("Document File upload response", docResponse);
      // Upload cover image file
      const imgResponse = await handleCoverPageUpload(imgFileEvent);
      console.log("Image File upload response", imgResponse);

      // Proceed with data upload only if both file uploads are successful
      if (docResponse && imgResponse) {
        const dataResponse = await dataUpload();
        console.log("Data uploaded successfully",dataResponse);
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.error("Error occurred during upload:", error);
    }

   
  };

  return (
    <div>
      {/* <Header /> */}
      <h1 className="text-3xl font-semibold underline ml-10 mt-5">
        Upload Resource
      </h1>

      <div className="flex flex-row justify-center w-full h-full mt-5 space-x-0 ">
        {/* form  */}
        <div className="w-2/6 flex flex-col">
          <DropdownBox
            title="Course"
            options={courses}
            mt={5}
            setUserCourse={setUserCourse}
          />

          <DropdownBox
            title="Material Type"
            options={material}
            setIsQuestionPaper={setIsQuestionPaper}
            setIsLink={setIsLink}
            setBook={setIsBook}
            setMaterialType={setMaterialType}
            mt={5}
            mb={5}
          />

          {isQuestionPaper ? (
            <div className="flex flex-col w-full mb-5">
              <div className="mb-1">This Question Paper belongs to?</div>
              <div className="flex flex-row justify-left w-2/3 mb-4">
                <div className="mr-7">
                  <input
                    type="radio"
                    value="SPIT"
                    name="paper"
                    onChange={(e) => setIsSpit(e.target.value === "SPIT")}
                  />{" "}
                  SAKEC
                </div>
                <div>
                  <input
                    type="radio"
                    value="Other"
                    name="paper"
                    onChange={(e) => setIsSpit(e.target.value === "SPIT")}
                  />{" "}
                  Other University
                </div>
              </div>
              <div className="flex flex-row w-1/2">
                <div className="w-full">
                  <DropdownBox
                    title="Year"
                    options={years}
                    setPaperYear={setPaperYear}
                  />
                </div>

                <div className="w-full">
                  <DropdownBox
                    title="Type"
                    options={type}
                    setPaperType={setPaperType}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {isLink ? (
            <div className="flex flex-col w-full mb-5">
              <input
                className="flex h-10 w-2/3 rounded-md border border-black bg-transparent px-3 py-2 text-sm "
                type="text"
                id="link"
                placeholder="Paste link here"
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}

          {isBook ? (
            <div className="flex flex-col w-full mb-5">
              <input
                className="flex h-10 w-1/2 rounded-md border border-black bg-transparent px-3 py-2 text-sm "
                type="text"
                id="author"
                placeholder="Author Name q"
                onChange={(e) => setBookAuthorName(e.target.value)}
              />

              <div className="flex flex-col w-full mt-5">
                <input
                  className="flex h-10 w-1/2 rounded-md border border-black bg-transparent px-3 py-2 text-sm "
                  type="number"
                  id="edition"
                  placeholder="Edition"
                  onChange={(e) => setBookEdition(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          <input
            className="flex h-10 w-2/3 rounded-md border border-black bg-transparent px-3 py-2 text-sm"
            type="text"
            id="title"
            placeholder="Enter title"
            onChange={(event) => {
              setResourceTitle(event.target.value);
            }}
          />

          {/* upload button */}
          <button
            type="button"
            className="rounded-md w-1/4 mt-5 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={(e) => uploadClicked(e)}
            disabled={isUploadInProgress} // Disable button if upload in progress or files not uploaded
          >
            {isUploadInProgress ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* upload doc and cover page div  */}

        {!isLink ? (
          <div className="flex flex-row h-max-1/4">
            {/* upload Doc div */}

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-black rounded-md">
              <div>Upload Document Here</div>
              <input
                type="file"
                className="pl-2 mt-5 justify-center"
                onChange={(e) =>
                  setFileEvents((prev) => ({
                    ...prev,
                    fileEvent: e.target.files[0],
                  }))
                }
                disabled={isUploadInProgress}
              />
            </div>

            <div className="flex flex-col items-center justify-center ml-10 border-2 border-dashed border-black rounded-md">
              <div>Upload Cover-Page Here</div>
              <input
                type="file"
                className="pl-2 mt-5 justify-center"
                onChange={(e) =>
                  setFileEvents((prev) => ({
                    ...prev,
                    imgEvent: e.target.files[0],
                  }))
                }
                disabled={isUploadInProgress}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Upload;
