"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import service from "@/appwrite/config";
import CourseComponent from "../components/Course";
const Course = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service.getAllDocs("Course");
        console.log(response.documents);
        setData(response.documents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert();
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-5 p-5">
      <div className="flex justify-around">
        <h1 className="text-2xl font-semibold mb-2">Courses</h1>
        <div className="flex grow justify-end">
          <input
            className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Serach"
          />
        </div>
      </div>
      <div className="h-1.5 w-40 bg-black"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((item, index) => {
            console.log(item.views)
            return (
              <Link
                href={{
                  pathname: "/materials",
                  query: {
                    courseName: item.Title,
                  },
                }}
              >
                <CourseComponent
                  key={item.$id}
                  id={item.$id}
                  course_name={item.Title}
                  course_code={item.Course_code}
                  setCourses={setData}
                  views={item.views}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Course;
