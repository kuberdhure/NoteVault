import React from "react";
import Image from "next/image";
import AcceptButton from "./AcceptButton";
import RejectButton from "./RejectButton";
import Link from "next/link";

const Request = (props) => {
  console.log(props.id, props.type);
  return (
    // contains two colums one for data and other for accept/reject button
    <div className="flex flex-row justify-between p-3 pl-5 pr-5 bg-blue-300 max-w-screen-md rounded-lg my-8 mx-auto">
      {/* data div */}
      <div className="flex flex-row">
        <img src={props.cover} className="max-h-40"/>
        <div className="flex flex-col mx-4 justify-center">

        <Link href={props.file ? props.file : ""} className="hover:underline font-light">
          <h1 className="text-xl font-semibold">{props.title}</h1>
        </Link>
        <div>
          {props.course} | {props.type}
        </div>
        <div className="mt-4 underline">Uploaded By: {props.user}</div>
        </div>
      </div>
      {/* accept/reject div */}
      <div className="flex flex-col justify-center">
        <AcceptButton
          title={props.title}
          handler={props.handler}
          docId={props.id}
          collection={props.type}
        />
        <RejectButton
          handler={props.handler}
          docFileID={props.docFileID}
          imageFileID={props.imageFileID}
          collection={props.type}
          docId={props.id}
        />
      </div>
    </div>
  );
};

export default Request;
