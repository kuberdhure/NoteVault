import React from "react";
import Image from "next/image";
import service from "@/appwrite/config";

const rejectResource = async (docID,collection,imageFileId, docFileID) => {
  try {
    const deleteFileResponse = await service.deleteFile(imageFileId, docFileID);
    const deleteDocResponse = await service.deleteDoc(docID,collection);
    console.log("delete files",deleteFileResponse);
    console.log("delete doc",deleteDocResponse);

    console.log("img",imageFileId)
    console.log("doc",docFileID)
  } catch (error) {
    console.error(error);
  }
};

const RejectButton = ({docId,collection,docFileID,imageFileID}) => {
  return (
    <div className="flex flex-row w-full mt-2 rounded-md px-2 py-1 ">
      <div className="relative w-10 h-10">
        <Image
          src="/decline.png"
          layout="fill"
          objectFit="contain"
          alt="Reject Button"
          className="transition duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-110"
          onClick={() => {
            console.log("imgg",imageFileID)
            rejectResource(docId,collection,imageFileID, docFileID);
          }}
        />
      </div>
      {/* Other elements you might want to include */}
    </div>
  );
};

export default RejectButton;
