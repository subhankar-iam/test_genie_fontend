import React, {useEffect,useState} from 'react'
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {

    // const [show, setShow] = useState(true);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setShow(true);
    //         setTimeout(() => {
    //             setShow(false);
    //         },1000)
    //     },3000)
    //     return () => clearInterval(interval)
    // },[]);

    return (
        <nav className="bg-gradient-to-r from-[#1F2937] to-[#374151] border-b-4 border-yellow-400 shadow-md sticky top-0 w-full z-50 overflow-x-auto whitespace-nowrap">
            <div className="container mx-auto px-5 py-4 flex justify-start items-center">

                <button
                    // onClick={toggleMenu}
                    className="text-yellow-400 hover:text-yellow-500 transition duration-300 text-3xl focus:outline-none mr-4 top-5"
                >
                    <GiHamburgerMenu />
                </button>
                <div className="absolute right-16 flex space-x-4 items-center   ">

                    <a href="#" className="text-yellow-400 hover:text-yellow-500 text-lg font-semibold transition duration-300">
                        📝 Templates
                    </a>

                    <a href="#" className="text-yellow-400 hover:text-yellow-500 text-lg font-semibold transition duration-300">
                        📚 Docs
                    </a>
                    <a href="#" className= "text-yellow-400 hover:text-yellow-500 text-lg font-semibold transition duration-300">
                        🛠️ Support
                    </a>
                    <a href="#"
                       className="text-yellow-400 hover:text-yellow-500 text-lg font-semibold transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"></svg>
                    </a>


                </div>

                <div className="flex space-x-4 items-center">


                    {/*<div*/}
                    {/*    className={`text-6xl cursor-pointer inline-block ${*/}
                    {/*        show ? "animate-shake" : ""*/}
                    {/*    }`}*/}
                    {/*    role="img"*/}
                    {/*    aria-label="genie"*/}
                    {/*>*/}
                    {/*    /!*🧞‍♂️*!/<GiMagicLamp className={`h-12 w-12 text-yellow-400 animate-shake inline-block`} />*/}
                    {/*</div>*/}

                    <a
                        href="/"
                        className="font-serif  text-4xl font-bold hover:text-yellow-500 transition duration-300 relative text-yellow-400 hover:animate-shake"
                    >
                        TEST GENIE
                    </a>
                    <img
                        src="/genie_img_rgb.png"
                        alt="Magic Genie"
                        className="h-12 w-12 "
                    />

                </div>
            </div>
        </nav>

    )
}

export default Navbar;