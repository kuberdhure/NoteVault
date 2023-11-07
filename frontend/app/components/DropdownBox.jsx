'use client'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from "@nextui-org/react";
import { useEffect } from 'react';


const DropdownBox = (props) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([props.title]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    setTimeout(() => {
        if (selectedValue == "Question Paper") {
            props.setBook(false);
            props.setIsLink(false);
            props.setIsQuestionPaper(true)
        }

        else if (selectedValue == "Video Link") {
            props.setBook(false);
            props.setIsQuestionPaper(false)
            props.setIsLink(true);
        }

        else if(selectedValue == "Reference Book"){
            props.setIsQuestionPaper(false)
            props.setIsLink(false);
            props.setBook(true);
        }

        else if(selectedValue == "Self Made Notes"){
            props.setIsQuestionPaper(false)
            props.setIsLink(false);
            props.setBook(false);
        }

      }, 0);

    return (

        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className= {`capitalize border border-black px-4 rounded-md hover:border-gray-950 shadow-md text-lg w-2/5 mt-${props.mt} mb-${props.mb} bg-white`}
                >
                    {selectedValue}
                    {
                        console.log(selectedValue)
                    }
                    
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="shadow"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className='border-black max-h-96 overflow-auto'
            >
                {props.options.map((option) => (
                    <DropdownItem className='bg-white opacity-100 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 justify-center cursor-pointer' key={option}>{option}</DropdownItem>
                ))
                }



            </DropdownMenu>
        </Dropdown>

    )
}

export default DropdownBox