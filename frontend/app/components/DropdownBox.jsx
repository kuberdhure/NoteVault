'use client'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from "@nextui-org/react";
import { useEffect } from 'react';


const DropdownBox = (props) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([props.title]));


    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    setTimeout(() => {


        if (props.setUserBranch) {
            props.setUserBranch(selectedValue)
        }

        if (props.setUserCourse) {
            let val = props.data.filter(course => course.Title === selectedValue)
            props.setUserCourse(val.length > 0 ? val[0].$id:{})
        }

        if (props.setPaperYear) {
            props.setPaperYear(selectedValue)
        }

        if (props.setPaperType) {
            props.setPaperType(selectedValue)
        }

        if (selectedValue == "Question Paper") {
            props.setBook(false);
            props.setIsLink(false);
            props.setIsQuestionPaper(true)
            props.setMaterialType(selectedValue);

        }

        else if (selectedValue == "Videos") {
            props.setBook(false);
            props.setIsQuestionPaper(false)
            props.setIsLink(true);
            props.setMaterialType(selectedValue);

        }

        else if (selectedValue == "Books") {
            props.setIsQuestionPaper(false)
            props.setIsLink(false);
            props.setBook(true);
            props.setMaterialType(selectedValue);

        }

        else if (selectedValue == "Notes") {
            props.setIsQuestionPaper(false)
            props.setIsLink(false);
            props.setBook(false);
            props.setMaterialType(selectedValue);

        }


    }, 1000);

    return (

        <Dropdown aria-label="dropdwn">
            <DropdownTrigger aria-label="dropdwn">
                <Button
                    aria-labelledby="button"
                    variant="bordered"
                    className={`capitalize border border-black px-4 rounded-md hover:border-gray-950 shadow-md text-lg w-2/3 mt-${props.mt} mb-${props.mb} bg-white`}
                >
                    {selectedValue}

                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="shadow"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className='border-black max-h-96 overflow-auto'
                aria-label="dropdwn"
            >
                {props.options.map((option) => (
                    <DropdownItem aria-labelledby={option} className='z-10 bg-white' key={option}>{option}</DropdownItem>
                ))
                }

            </DropdownMenu>
        </Dropdown>

    )
}

export default DropdownBox