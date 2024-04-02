"use client";
import React from "react";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
import Card from "./components/Card";
import BookComponent from "@/app/components/BookComponent";
import Course from "@/app/components/Course";
import Browse from "@/app/components/Browse";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import PageNotFound from "/public/PageNotFound.json";

// export default function Home() {

//   useEffect(() => {
//     const fetchData = async () => {
//       const config = {
//         headers : {
//           'Authorization': `Bearer ${localStorage.getItem("token")}`,
//           'Content-Type': 'application/json'
//         }
//       };
//         try {
//             console.log(config)
//             const response = await axios.get(
//               "http://127.0.0.1:8000/api/home/",
//               {
//                 headers: {
//                   'Content-Type': "application/json",
//                   'Authorization': `Bearer ${localStorage.getItem("token")}`,
//                 },
//               }
//             );
//             // const response1 = await axios.get(
//             //   "http://localhost:8000/api//",
//             //   {
//             //     headers: {
//             //       "Content-Type": "application/json",
//             //       Authorization: `Bearer ${localStorage.getItem("token")}`,
//             //     },
//             //   }
//             // );

//             // console.log("Response1",response1);
//             console.log("response",response);
//             setCourses(response.data.data.courses);
//             setBooks(response.data.data.books);
//             setLoading(false)
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setLoading(false)
//         }
//     };
//     fetchData();

// }, []);

//   const user = "Teacher"; //localStorage.getItem("UserType");

//   return user == "Student" || user == "Teacher" ? (
//     <div>
//       <div className="ml-5 mt-4">
//         <div className="flex flex-row justify-between">
//           <h1 className="text-2xl font-semibold mb-2">Popular Books</h1>
//           <div className="flex flex-row gap-x-2 mr-10 items-center">
//             <Link href={"/books"}>
//               <p className="text-right">Explore</p>
//             </Link>
//             <Link href={"/books"}>
//               <Image src={"/right.svg"} alt={"Arrow"} height={25} width={25} />
//             </Link>
//           </div>
//         </div>
//         <div className="h-1.5 w-40 bg-black"></div>
//       </div>

//       {loading ? (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "100vh",
//             width: "1/2",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         // Render your book components once data is fetched
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 ml-10 pt-3">
//           {books.map((book, index) => (
//             <BookComponent
//               key={index}
//               cover={book.cover_page}
//               title={book.title}
//               author={book.author}
//               file={book.file}
//               domain={book.domain}
//               imgAlt="Book"
//             />
//           ))}
//         </div>
//       )}

//       <div className="mt-4 ml-5 mb-4 p-1">
//         <div className="flex flex-row justify-between">
//           <h2 className="font-bold text-2xl">Courses</h2>
//           <div className="flex flex-row gap-x-2 mr-10 items-center">
//             <Link href={"/books"}>
//               <p className="text-right">Explore</p>
//             </Link>
//             <Link href={"/courses"}>
//               <Image src="/right.svg" alt={"Arrow"} height={25} width={25} />
//             </Link>
//           </div>
//         </div>
//         <div className="h-1.5 w-40 bg-black"></div>
//         <div className="flex flex-row justify-evenly mb-4 mt-2">
//           {/* <Course course_name={"Data Structures"} course_code={"CS201"} />
//           <Course course_name={"Data Structures"} course_code={"CS201"} />
//           <Course course_name={"Data Structures"} course_code={"CS201"} />
//           <Course course_name={"Data Structures"} course_code={"CS201"} />
//           <Course course_name={"Data Structures"} course_code={"CS201"} /> */}
//           {loading ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100vh",
//                 width: "1/2",
//               }}
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             courses.map((course, index) => (
//               <Course
//                 course_name={course.title}
//                 course_code={course.course_code}
//               />
//             ))
//           )}
//         </div>
//       </div>
//       <div className="mt-4">
//         <p className="flex justify-center items-center text-2xl font-bold ">
//           Browse By
//         </p>
//         <div className=" mb-4 mt-4 flex-wrap grid grid-cols-3 gap-1 place-items-center">
//           <Link href="/courses">
//             <Browse browse_image={"/course.png"} browse_name={"Course"} />
//           </Link>
//           <Link href="/books">
//             <Browse browse_image={"/book.png"} browse_name={"Books"} />
//           </Link>
//           <Link href="/papers">
//             <Browse browse_image={"/paper.png"} browse_name={"Papers"} />
//           </Link>
//         </div>
//         <div className=" mb-4 mt-4 flex-wrap grid grid-cols-2 gap-1 place-items-center">
//           <Link href="/notes">
//             <Browse browse_image={"/Notes.png"} browse_name={"Notes"} />
//           </Link>
//           <Browse browse_image={"/video.png"} browse_name={"Videos"} />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center justify-center h-1/2 w-1/2 ml-96">
//       <Lottie animationData={PageNotFound} height={25} width={25} />
//     </div>
//   );
// }

function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [courses, setCourses] = useState([]);

  const router = useRouter();
  useEffect(() => {
    if (localStorage) {
      setLoggedIn(Boolean(localStorage.getItem("user_login")));
      // console.log(val);
      // console.log("localstorage", Boolean(localStorage.getItem("user_login")))
      // console.log("loggedIn?", isLoggedIn)
    }

    if (Boolean(localStorage.getItem("user_login")) == false) {
      // console.log("blaaaaaa" + !Boolean(localStorage.getItem("user_login")))
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    console.log("login?", isLoggedIn);
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div>
      <div className="ml-5 mt-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold mb-2">Popular Books</h1>
          <div className="flex flex-row gap-x-2 mr-10 items-center">
            <Link href={"/books"}>
              <p className="text-right">Explore</p>
            </Link>
            <Link href={"/books"}>
              <Image src={"/right.svg"} alt={"Arrow"} height={25} width={25} />
            </Link>
          </div>
        </div>
        <div className="h-1.5 w-40 bg-black"></div>
      </div>

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
              <Image src="/right.svg" alt={"Arrow"} height={25} width={25} />
            </Link>
          </div>
        </div>
        <div className="h-1.5 w-40 bg-black"></div>
        <div className="flex flex-row justify-evenly mb-4 mt-2">
          {/* <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} />
          <Course course_name={"Data Structures"} course_code={"CS201"} /> */}
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
            courses.map((course, index) => (
              <Course
                course_name={course.title}
                course_code={course.course_code}
              />
            ))
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="flex justify-center items-center text-2xl font-bold ">
          Browse By
        </p>
        <div className=" mb-4 mt-4 flex-wrap grid grid-cols-3 gap-1 place-items-center">
          <Link href="/courses">
            <Browse browse_image={"/course.png"} browse_name={"Course"} />
          </Link>
          <Link href="/books">
            <Browse browse_image={"/book.png"} browse_name={"Books"} />
          </Link>
          <Link href="/papers">
            <Browse browse_image={"/paper.png"} browse_name={"Papers"} />
          </Link>
        </div>
        <div className=" mb-4 mt-4 flex-wrap grid grid-cols-2 gap-1 place-items-center">
          <Link href="/notes">
            <Browse browse_image={"/Notes.png"} browse_name={"Notes"} />
          </Link>
          <Browse browse_image={"/video.png"} browse_name={"Videos"} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Home;
