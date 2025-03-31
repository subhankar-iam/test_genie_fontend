import React, {useEffect, useRef, useState} from "react";
import ShowTable from "./ShowTable";


const JiraForm = () => {

    const scrollRef = useRef(null);
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {

        if (show && scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center", // Can be "start", "center", "end", or "nearest"
            });
        }
    }, [show]);
    const handleSubmit = (e) => {
        e.preventDefault();
         fetch(`http://localhost:8080/jira/${input}`, {}).then(async res => {
             if (!res.ok) {
                 throw new Error(`HTTP error! Status: ${res.status}`);
             }
             return JSON.parse(await res.json());
         }).then(data => {
             console.log("printing from JIRA FORM",data);
             setUserData(data);
             setShow(true);

         }).then(error => {
             console.log(error);
         })

    }
    return (
        <div className="flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen overflow-x-auto">

            <div className="flex justify-center items-start pt-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-full shadow-xl border-2 border-yellow-400 px-4 py-2 w-96 flex items-center space-x-2 transition-all duration-300 hover:shadow-2xl focus-within:ring-4 focus-within:ring-yellow-400"
                >
                    {/* Search Input Field */}
                    <input
                        type="text"
                        id="jira"
                        name="jira"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="🔍 Search Jira Ticket ID..."
                        className="w-full bg-transparent outline-none px-4 py-2 text-gray-800 placeholder-gray-500 focus:ring-0"
                        required
                    />

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-700 text-white font-bold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                    >
                        🚀
                    </button>
                </form>
            </div>

            {show && (
                <div className="flex justify-center items-start mt-24">
                    <ShowTable ref={scrollRef} inputData={userData} setInputData={setUserData} />
                </div>
            )}
        </div>


    )
}

export default JiraForm;