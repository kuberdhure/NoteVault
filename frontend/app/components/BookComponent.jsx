import React, { useEffect, useState } from "react";
import Link from "next/link";
import Service from "@/appwrite/config";

function BookComponent(props) {
  // return (
  //   <div className="w-60 rounded-xl shadow flex flex-col m-4 bg-white max-h-40px p-2 border border-gray-200  transition-transform transition-delay-500 ease hover:shadow-xl hover:bg-green-400 hover:w-70 hover:h-35 transform hover:scale-105 group hover:text-white ">
  //     <div>
  //       {props.cover && props.imgAlt && (
  //         <img
  //           src={props.cover}
  //           alt={props.imgAlt}
  //           className="object-fill max-h-fit rounded-md"
  //         />
  //       )}
  //     </div>
  //     <hr className="w-55"></hr>
  //     <div className="flex flex-col items-center justify-center group hover:text-white">
  //       {props.title && props.file && (
  //         <Link href={props.file}>
  //           <h1 className="mt-2 text-gray-800">{props.title}</h1>
  //         </Link>
  //       )}
  //       {props.author && (
  //         <p className="mt-1 text-gray-700 group-hover:text-white">
  //           {props.author}
  //         </p>
  //       )}
  //     </div>
  //   </div>
  // );

  const [updatedBook, setUpdatedBook] = useState({ id: "", views: 0 });

  const updateViews = (bookId) => {
    const updated_views = props.views + 1;
    setUpdatedBook({ id: bookId, views: updated_views });
    props.setBooks((prev) =>
      prev.map((book) =>
        book.$id === bookId ? { ...book, views: updated_views } : book
      )
    );
  };

  const syncViews = async () => {
    try {
      const res = await Service.updateDoc(updatedBook.id, "Books", {
        views: updatedBook.views,
      });
      console.log("updated views", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updatedBook.id.length > 0) {
      syncViews();
      console.log(updatedBook);
    }
  }, [updatedBook]);

  return (
    <div className="w-70  max-h-140 rounded-md pt-2 overflow-hidden m-4 shadow-lg hover:bg-green-400 scale-120">
      {/* <Link href={props.file ? props.file : ""}> */}
      <div onClick={() => (updateViews(props.id))}>
        <img
          className="w-full object-scale-down max-h-60 my-4"
          src={props.cover}
          alt="Sunset in the mountains"
        />
      </div>
      {/* </Link> */}
      <div className="my-4 px-4 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">{props.author}</p>
        <p>views : {props.views}</p>
      </div>
    </div>
  );
}

export default BookComponent;
