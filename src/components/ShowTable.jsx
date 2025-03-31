import React, {useState, useEffect, useRef, forwardRef} from "react";
import {GiPencil} from "react-icons/gi";
import {FaPencilAlt} from "react-icons/fa";


const TableViewer = forwardRef(({inputData,setInputData},porpRef) => {

    const [isOpen, setIsOpen] = useState({"background": true, "scenarios": true, "file_save_location": true});

    const [currentPage, setCurrentPage] = useState(0);

    const [view, setView] = useState({"background": false, "scenarios": false, "file_save_location": false});

    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < Object.keys(inputData).length - 1) {
            setCurrentPage((prevIndex) => prevIndex + 1);
        }
    }

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage((prevIndex) => prevIndex - 1);
        }
    }

    const keys = Object.keys(inputData);
    const key = keys[currentPage];
    const value = inputData[key];

    const isObjectOrArray = (value) => {
        return typeof value === "object" && value !== null;
    };

    // const handleClick = () => {
    //
    //     setView((prevState)=>({...prevState,[key]:!prevState[key]}));
    // }
    const renderTable = (key, value) => {
        return (
            <div
                key={key}
                className={`bg-white rounded-3xl shadow-xl border border-yellow-300 p-6 mb-8 transition-all duration-300 hover:shadow-2xl relative max-w-[1200px] min-w-fit }`}
            >
                {!view[key] && (<button
                    onClick={() => {
                        setIsOpen((prevState) => ({
                            ...prevState,
                            [key]: !prevState[key],
                        }));
                    }}
                    className="absolute right-4 transform -translate-y-1/2 px-3 py-2 bg-transparent transition-all duration-300 text-2xl text-yellow-500 font-bold"
                >
                    {isOpen[key] ? "︿" : "﹀"}
                </button>)}

                <div className={`flex justify-between items-center mb-4 group cursor-pointer`}>
                    <h3 className="text-2xl font-bold text-yellow-800 tracking-wide">
                        {key.replace(/_/g, " ").toUpperCase()}  <button
                        className="hover:scale-110"
                        onClick={()=>{
                           setView((prevState)=>({
                                   ...prevState,
                                   [key]: !prevState[key]
                           }));
                        }
                        }
                        >

                        <FaPencilAlt style={{ transform: 'scaleX(1)' }} className="h-5 w-5" />
                    </button>
                        <span className="absolute left-1/2 -translate-x-1/2 -top-4 w-auto px-2 py-1 text-sm text-white
                        bg-black rounded opacity-0 group-hover:opacity-100 transition duration-300">
                            edit
                        </span>

                    </h3>
                </div>

                <div
                    className={`transition-all duration-500 ${
                        isOpen[key]
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        
                    } 
                     ${view[key]?"fixed inset-0 bg-yellow-50 z-50 flex justify-center items-center w-[60%] h-[40%] -top-100 -left-100 overflow-auto":""}
                   `}
                >
                    {isObjectOrArray(value) && typeof value[0]!=="string" ? (
                        Array.isArray(value) ? (
                            <div className="w-full overflow-x-auto">
                                <table
                                    className="w-full border-collapse border border-yellow-300 text-sm rounded-lg overflow-hidden shadow-md">
                                    <thead className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                                    <tr>
                                        {Object.keys(value[0] || {}).map((col) => (
                                            <th
                                                key={col}
                                                className="border border-yellow-300 px-4 py-2 text-left text-white font-semibold"
                                            >
                                                {col.replace(/_/g, " ").toUpperCase()}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {value.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-yellow-50"
                                                    : "bg-yellow-100"
                                            } hover:bg-yellow-200 transition duration-200`}
                                        >
                                            {Object.values(item).map((val, i) => (
                                                <td
                                                    key={i}
                                                    className="border border-yellow-300 px-4 py-2 text-yellow-900"
                                                >
                                                    <input
                                                        type="text"
                                                        value={val !== null ? String(val) : "N/A"}
                                                        readOnly
                                                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-900 focus:outline-none focus:bg-yellow-50 transition duration-300"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (

                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300 w-full">
                                <table className="w-full border-collapse border border-yellow-300 text-sm">
                                    <tbody>
                                    {Object.entries(value).map(([subKey, subValue]) => (
                                        <tr
                                            key={subKey}
                                            className="hover:bg-yellow-100 transition duration-200"
                                        >
                                            <td className="border border-yellow-300 px-4 py-2 font-semibold text-yellow-800">
                                                {subKey.replace(/_/g, " ")}
                                            </td>
                                            <td className="border border-yellow-300 px-4 py-2 text-yellow-700">
                                                {Array.isArray(subValue)
                                                    ? subValue.join(", ")
                                                    : subValue || "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <p className="text-yellow-800 bg-yellow-50 p-4 rounded-lg border border-yellow-300 w-full">
                            {value !== null ? String(value) : "N/A"}
                        </p>
                    )}
                    {view[key] && (
                        <button
                        onClick={() => {
                            setView((prevState) => ({
                                ...prevState,
                                    [key]: !prevState[key]

                            }))
                        }}
                        className="absolute top-2 right-2  px-3 py-1"
                        >
                            ❌
                        </button>
                    )}
                </div>
                {/*{view && (*/}
                {/*    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">*/}
                {/*        <div className="w-80 h-80 bg-white rounded-3xl shadow-2xl p-6 relative transition-all duration-500 transform scale-100">*/}
                {/*            <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">*/}
                {/*                🎉 I am centered!*/}
                {/*            </h2>*/}
                {/*            <button*/}
                {/*                onClick={() => setView(false)}*/}
                {/*                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"*/}
                {/*            >*/}
                {/*                ❌*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        );
    };

    // const renderTableView = (key,value) => {
    //
    //     return (
    //         <div  ref={tableRef} key={key} className="bg-white rounded-3xl shadow-xl border border-yellow-300 p-6 mb-8 transition-all duration-300 hover:shadow-2xl w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px]">
    //             <h3> className="text-2xl font-bold text-yellow-800 mb-4">
    //                 {key.replace(/_/g, " ").toUpperCase()}
    //             </h3>
    //
    //             <div className="overflow-x-auto">
    //                 <table className="w-full border-collapse border border-yellow-300 text-sm rounded-lg shadow-md">
    //                     <thead className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
    //                     <tr>
    //                         {Object.keys(value[0] || {}).map((col) => (
    //                             <th
    //                                 key={col}
    //                                 className="border border-yellow-300 px-4 py-2 text-left text-white font-semibold"
    //                             >
    //                                 {col.replace(/_/g, " ").toUpperCase()}
    //                             </th>
    //                         ))}
    //                     </tr>
    //                     </thead>
    //                     <tbody>
    //                     {value.map((row, index) => (
    //                         <tr key={index}
    //                             className={`${
    //                                 index % 2 === 0
    //                                     ? "bg-yellow-50"
    //                                     : "bg-yellow-100"
    //                             } hover:bg-yellow-200 transition duration-200`}
    //                         >
    //                             {Object.keys(row).map((col,index) => (
    //                                 <td key={index} className="border border-yellow-300 px-4 py-2 text-yellow-900">
    //                                     {col !== null ? String(col) : "N/A"}
    //                                 </td>
    //                             ))}
    //                         </tr>
    //                     ))}
    //                     </tbody>
    //                 </table>
    //             </div>
    //
    //         </div>
    //     );
    // }
    return (
        <div ref={porpRef} className="bg-gray-100 min-h-screen overflow-x-auto whitespace-nowrap">
            <br/>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                🧞‍♂️ Test Genie has retrieved your JIRA details!
            </h2>

            <div className="flex overflow-x-auto space-x-10 pb-4 scrollbar-hide pt-6 pl-10 pr-10">
                {Object.entries(inputData).map(([key, value], index) => (
                    <div
                        key={key}
                        className={`flex-shrink-0 ${
                            index === 0 ? "ml-0" : "ml-4"
                        } min-w-fit bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl hover:scale-110 ]`}
                    >
                        { renderTable(key, value)}
                    </div>
                ))}
            </div>
            {/*<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">*/}
            {/*    {renderTableView(key,value)}*/}
            {/*</div>*/}
            {/*<div className={}>*/}

            {/*</div>*/}
        </div>
    )
})

export default TableViewer;