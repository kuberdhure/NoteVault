"use client";
import React, { useEffect, useState } from "react";
import DropdownBox from "../components/DropdownBox";
import { useRouter } from "next/navigation";
import service from "@/appwrite/config";
import config from "../../conf/conf";

const Upload = () => {
  // const router = useRouter();

  // list of options for rendering different options
  const [courses, setCourses] = useState([]);
  const material = ["Books", "Question Paper", "Notes", "Videos"];
  const type = ["End_Sem", "Mid_Sem", "In_Sem", "Quiz", "Assignment", "Others"];

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
  const [isSakec, setisSakec] = useState(true);
  const [paperYear, setPaperYear] = useState(0);
  const [paperType, setPaperType] = useState("");

  // video data
  const [videoLink, setVideoLink] = useState("");

  // file data
  // const [fileURL, setFileURL] = useState("");
  // const [coverPageURL, setCoverPageURL] = useState("");

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  var imgfileID = "";
  var docfileID = "";
  let imgLink = "";
  let fileLink = "";

  const [fileEvents, setFileEvents] = useState({
    fileEvent: "",
    imgEvent: "",
  });

  function getResourceData(resourceType) {
    const collectionData = {
      Books: {
        dataFormat: {
          collectionName: "Books",
          title: resourceTitle,
          docID: docfileID,
          coverImage: imgLink,
        },
        extras: {
          imageFileID: imgfileID,
          author: bookAuthorName,
          edition: bookEdition,
          course: userCourse,
          file: fileLink,
        },
      },
      Notes: {
        dataFormat: {
          collectionName: "Notes",
          title: resourceTitle,
          coverImage: imgLink,
        },
        extras: {
          course: userCourse,
          file: fileLink,
        },
      },
      "Question paper": {
        dataFormat: {
          collectionName: "Papers",
          title: resourceTitle,
          docID: docfileID,
          coverImage: imgLink,
        },
        extras: {
          category: paperType,
          year: parseInt(paperYear),
          course: userCourse,
          file: fileLink,
        },
      },
      Videos: {
        dataFormat: {
          collectionName: "Videos",
          title: resourceTitle,
        },
        extras: {
          link: videoLink,
          course: userCourse,
        },
      },
    };

    console.log("hi", resourceType);
    if (resourceType == "Books") {
      return collectionData.Books;
    } else if (resourceType == "Notes") {
      return collectionData.Notes;
    } else if (resourceType == "Question Paper") {
      return collectionData["Question paper"];
    } else if (resourceType == "Videos") {
      return collectionData["Videos"];
    }
    // console.log(collectionData);
    // if (collectionData.hasOwnProperty(resourceType)) {
    // } else {
    //   return {
    //     dataFormat:{},
    //     extras:{}
    //   }; // Or handle error or default case as needed
    // }
  }

  const fileHandler = service;

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await fileHandler.getAllDocs("Course");
      console.log(courseData);
      setCourses(courseData.documents);
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
        console.log("file id res", response.$id);
        // setIsDocFilesUploaded(true);
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
    const selectedFile = file;

    if (selectedFile) {
      try {
        setIsUploadInProgress(true);
        const response = await fileHandler.uploadFile("Image", selectedFile);

        console.log("file id res", response.$id);

        // console.log("Image File upload response", response);
        // setIsImgFilesUploaded(true);
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
      const item = getResourceData(materialType);

      const response = await fileHandler.uploadData(
        item.dataFormat,
        item.extras
      );
      console.log("data upload res", response);
      console.log(item.dataFormat, item.extras);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadClicked = async () => {
    const imgFileEvent = fileEvents.imgEvent;
    const docFileEvent = fileEvents.fileEvent;

    try {
      if (materialType !== "Videos") {
        const docResponse = await handleFileUpload(docFileEvent);
        docfileID = docResponse.$id;
        fileLink = `https://cloud.appwrite.io/v1/storage/buckets/${config.docsBucketID}/files/${docfileID}/view?project=${config.projectID}`;

        console.log("Document File upload response", docResponse);
        // Upload cover image file
        if (materialType !== "Question Paper") {
          const imgResponse = await handleCoverPageUpload(imgFileEvent);

          imgfileID = imgResponse.$id;
          console.log("imgFileId", imgfileID);
          imgLink = `https://cloud.appwrite.io/v1/storage/buckets/${config.imageBucketID}/files/${imgfileID}/view?project=${config.projectID}`;

          console.log("Image File upload response", imgResponse);
        }
      }

      // Proceed with data upload only if both file uploads are successful
      if (
        (docfileID.length > 0 && imgfileID.length > 0) ||
        materialType === "Videos" || (docfileID.length > 0 && materialType === "Question Paper")
      ) {
        const dataResponse = await dataUpload();
        console.log("Data uploaded successfully", dataResponse);
      } else {
        console.log("File upload failed");
        console.log("imgFileId", imgfileID);
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
            options={courses.map((c) => c.Title)}
            data={courses}
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
                    onChange={(e) =>
                      setisSakec(e.target.value.toLowerCase() === "sakec")
                    }
                  />{" "}
                  SAKEC
                </div>
                <div>
                  <input
                    type="radio"
                    value="Other"
                    name="paper"
                    onChange={(e) => setisSakec(e.target.value === "sakec")}
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

            {materialType !== "Question Paper" ? (
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
            ) : null}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Upload;
