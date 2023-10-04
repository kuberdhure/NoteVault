import React from 'react'
// import Image from 'next/image'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";


function BookComponent(props) {
    return (
        <div className="w-150 h-150 ">
            {/* <BookComponent Title={'Sample1'} cover='/book.png'/> */}
            <Card className="py-4 m-4 border-solid border-black border-2 bg-blue-500 rounded-md w-fit">
                <CardHeader className="pb-0 pt-2 px-4 flex-col mb-2 items-center">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={props.cover}
                        width={200}
                        height={200}
                    />
                </CardHeader>
                <div className="h-0.5 bg-black">

                </div>
                <CardBody className="overflow-visible py-1 items-center">
                    <h4 className="font-bold text-large">{props.title}</h4>
                    <p className="text-tiny uppercase font-bold">{props.author}</p>
                    {/* <small className="text-default-500">12 Tracks</small> */}
                    </CardBody>
                </Card>
            </div>
  )
}

export default BookComponent