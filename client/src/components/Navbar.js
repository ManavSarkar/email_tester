import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';

const Navbar = ({ getEmails }) => {
    const [viewModal, setViewModal] = useState(false)
    const [email, setEmail] = useState('')
    useEffect(() => {
        let emailName = faker.person.firstName().toLowerCase();
        let emailNumber = faker.number.int(100, 999);
        setEmail(`wjx4i.${emailName}${emailNumber}@inbox.testmail.app`)
    }, [])
    const myModal = () => {

        return <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex flex-col items-center">
                                <h3 className='text-lg font-semibold text-black my-2'>Your Email</h3>

                                <p onClick={() => {
                                    navigator.clipboard.writeText(email)
                                    alert('Email copied to clipboard')
                                }} className='bg-purple-700 text-white text-lg min-w-fit flex p-4 font-semibold rounded-lg cursor-pointer hover:p-3 transition-all hover:m-1'>{email}
                                    <img className='ml-4' width="28" height="28" src="https://img.icons8.com/ios/50/ffffff/copy--v1.png" alt="copy--v1" />
                                </p>
                            </div>
                            <div className="flex flex-row justify-evenly my-8">
                                <button onClick={() => {
                                    let emailName = faker.person.firstName().toLowerCase();
                                    let emailNumber = faker.number.int(100, 999);
                                    setEmail(`wjx4i.${emailName}${emailNumber}@inbox.testmail.app`)
                                }} className='btn btn-outline'>New Email</button>
                                <button onClick={() => {
                                    setViewModal(!viewModal)
                                }} className='btn btn-outline text-red-600'>Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href="/">Home</a></li>
                        <button onClick={() => {
                            setViewModal(!viewModal)
                        }} className='btn bg-amber-700 text-white border-amber-600 mx-4'>Generate an Email</button>
                        <li><a href="https://github.com/ManavSarkar/email_tester">Github</a></li>
                    </ul>
                </div>
                <a href="/" className="btn btn-ghost normal-case text-xl">Free Email</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/">Home</a></li>
                    <button onClick={() => {
                        setViewModal(!viewModal)
                    }} className='btn bg-amber-700 text-white border-amber-600 mx-4'>Generate an Email</button>
                    <li><a href="github.com/manavsarkar/emailtesterfree">Github</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button type='button' className="btn" onClick={getEmails}>Refresh</button>
            </div>


            {viewModal ? myModal() : null}
        </div>
    )
}

export default Navbar