import React, { useState, useEffect } from "react";
// import Link from "next/link";
import service from '@/appwrite/config'
const Course = ({ id, course_name, course_code , setCourses , views}) => {
  const [updatedCourse, setUpdatedCourse] = useState({ id: "", views: 0 });

  const updateViews = (courseId) => {
    const updated_views = views + 1;
    // setTimeout(()=>{
        setUpdatedCourse({ id: courseId, views: updated_views });
    // },2000)
    setCourses((prev) =>
      prev.map((course) =>
        course.$id === courseId ? { ...course, views: updated_views } : course
      )
    );
  };

  const syncViews = async () => {
    try {
      const res = await service.updateDoc(updatedCourse.id, "Course", {
        views: updatedCourse.views,
      });
      console.log("updated views", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updatedCourse.id.length > 0) {
    
    syncViews();
      console.log(updatedCourse);
    }
  }, [updatedCourse]);

  return (
    <div
      onClick={() => updateViews(id)}
      className="flex shrink w-60 h-40 bg-white rounded-lg border border-black p-4 mt-2 mr-5 items-center justify-center flex-col group transition-transform transition-delay-500 ease hover:shadow-lg hover:bg-[#1c4386] hover:w-70 hover:h-35 transform hover:scale-105"
    >
      <div className="font-bold text-xl group-hover:text-white">
        {course_name}
      </div>
      <div className="font-semibold text-gray-500 group-hover:text-white">
        {course_code}
      </div>
      <div className="font-semibold text-gray-500 group-hover:text-white">
        {`Views: ${views}`}
      </div>
    </div>
  );
};
export default Course;
