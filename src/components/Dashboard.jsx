import { useState } from "react";
import Contact from "./Contact";
import ChartsAnsMaps from "./ChartsAnsMaps";

const Dashboard = () => {

    const [selectedOption, setSelectedOption] = useState('addProduct');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side - Drawer */}
            <div className="bg-gray-800 w-full md:w-1/4">
                <div className="py-4">
                    <h1 className="text-white text-xl font-bold px-4 mb-4">Admin Panel</h1>
                    <ul>
                        <li
                            className={`cursor-pointer px-4 py-2 text-white ${selectedOption === 'contact' ? 'bg-blue-500' : ''
                                }`}
                            onClick={() => handleOptionChange('contact')}
                        >
                            Contact
                        </li>
                        <li
                            className={`cursor-pointer px-4 py-2 text-white ${selectedOption === 'mapAndChart' ? 'bg-blue-500' : ''
                                }`}
                            onClick={() => handleOptionChange('mapAndChart')}
                        >
                            Map and Chart
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-3/4 p-8 bg-amber-100">
                {selectedOption === 'contact' && <Contact></Contact>}
                {selectedOption === 'mapAndChart' && <ChartsAnsMaps></ChartsAnsMaps>}
            </div>
        </div>
    );
};

export default Dashboard;