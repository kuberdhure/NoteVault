import React from 'react'
import Header from '../components/Header'
import Request from '../components/Request'

const PendingApprovals = () => {
    return (
        <div>
            <Header />
            <div className='flex items-start flex-col ml-10 mt-10'>
                <h1 className='text-3xl font-semibold underline'>Recent Additions</h1>
                <Request
                    title={"Introduction To Data Structures"}
                    branch={"Computer Engineering"}
                    course={"Data Structures & Algorithms"}
                    type={"Book"}
                    user={"yash.gajewar22@spit.ac.in"}
                    class={"TE COMPS B"}
                />
                <Request
                    title={"Introduction To Data Structures"}
                    branch={"Computer Engineering"}
                    course={"Data Structures & Algorithms"}
                    type={"Book"}
                    user={"yash.gajewar22@spit.ac.in"}
                    class={"TE COMPS B"}
                />

                <Request
                    title={"Introduction To Data Structures"}
                    branch={"Computer Engineering"}
                    course={"Data Structures & Algorithms"}
                    type={"Book"}
                    user={"yash.gajewar22@spit.ac.in"}
                    class={"TE COMPS B"}
                />

                <Request
                    title={"Introduction To Data Structures"}
                    branch={"Computer Engineering"}
                    course={"Data Structures & Algorithms"}
                    type={"Book"}
                    user={"yash.gajewar22@spit.ac.in"}
                    class={"TE COMPS B"}
                />




            </div>

        </div>
    )
}

export default PendingApprovals