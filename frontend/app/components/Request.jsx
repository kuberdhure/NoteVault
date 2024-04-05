import React from "react";
import Image from "next/image";
import AcceptButton from "./AcceptButton";
import RejectButton from "./RejectButton";
import Link from "next/link";

const Request = (props) => {
  console.log(props.id, props.type);
  return (
    // contains two colums one for data and other for accept/reject button
    <div className="flex flex-row justify-between p-3 pl-5 pr-5 bg-red-200 w-full rounded-lg mb-5">
      {/* data div */}
      <div>
        <Link href="" className="hover:underline font-light">
          <h1 className="text-xl font-semibold">{props.title}</h1>
        </Link>
        <div>
          {props.course} | {props.type}
        </div>
        <div className="mt-4 underline">Uploaded By: {props.user}</div>
      </div>
      {/* accept/reject div */}
      <div>
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
