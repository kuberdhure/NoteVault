"use client"
import React from "react";
import Image from "next/image";
import service from "@/appwrite/config";

const acceptPressed = async (docId, collection,handler) => {
    try {
        const approve = await service.updateDoc(docId, collection, {
            is_approved: true,
        });
        console.log(approve)
        handler(docId);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
    
};

const AcceptButton = ({title, docId, collection,handler}) => {
  return (
    <div className="flex flex-row w-full rounded-md px-2 py-1 ml-1.5">
      <div className="relative w-7 h-7">
        <Image
          src="/approve.png"
          layout="fill"
          objectFit="contain"
          alt="Accept Button"
          className="transition duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-110"
          onClick={() => {
            console.log(title,docId,collection)
             acceptPressed(docId, collection,handler);
          }}
        />
      </div>
      {/* Other elements you might want to include */}
    </div>
  );
};

export default AcceptButton;
