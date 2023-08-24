import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UseCaseWithDatesData from "../Hooks/UseCaseWithDatesData";
import UseCountrySpecificData from "../Hooks/UseCountrySpecificData";
import UseWorldWideData from "../Hooks/UseWorldWideData";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ChartsAnsMaps = () => {

    const [worldWideData, worldWideDataIsLoading] = UseWorldWideData();
    const [caseWithDatesData, caseWithDatesDataLoading] = UseCaseWithDatesData();
    const [countrySpecificData, countryLoading] = UseCountrySpecificData();

    console.log(worldWideData);

    if (!worldWideDataIsLoading && !caseWithDatesDataLoading && !countryLoading) {
        // Extract dates from one of the categories (e.g., cases)
        const dates = Object.keys(caseWithDatesData?.cases);

        // Transform data into an array of objects
        const chartData = dates.map(date => ({
            date,
            cases: caseWithDatesData.cases[date],
            deaths: caseWithDatesData.deaths[date],
            recovered: caseWithDatesData.recovered[date]
        }));

        return (
            <div className='w-full mx-auto'>

                <div className='text-center space-y-10'>
                    <div>
                        <h1 className='font-serif text-4xl text-[#555]'>Coronavirus Cases:</h1>
                        <p className='text-5xl text-[#aaa] font-bold'>{worldWideData?.cases.toLocaleString()}</p>
                    </div>
                    <div>
                        <h1 className='font-serif text-4xl text-[#555]'>Deaths:</h1>
                        <p className='text-5xl text-[#696969] font-bold'>{worldWideData?.deaths.toLocaleString()}</p>
                    </div>
                    <div>
                        <h1 className='font-serif text-4xl text-[#555]'>Recovered:</h1>
                        <p className='text-5xl text-[#8ACA2B] font-bold'>{worldWideData?.recovered.toLocaleString()}</p>
                    </div>
                </div>
                {/* case with dates */}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        {/* <YAxis /> */}
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
                        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
                    </LineChart>
                </ResponsiveContainer>


                <div className="w-full h-screen flex justify-center items-center">
                    <MapContainer center={[20, 0]} zoom={2} style={{ width: '100%', height: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {countrySpecificData?.map((countryData) => (
                            <Marker
                                key={countryData.country}
                                position={[countryData.countryInfo.lat, countryData.countryInfo.long]}
                            >
                                <Popup>
                                    <div className="text-center">
                                        <h2 className="text-lg font-bold mb-2">{countryData.country}</h2>
                                        <p>Active Cases: {countryData.active}</p>
                                        <p>Recovered Cases: {countryData.recovered}</p>
                                        <p>Deaths: {countryData.deaths}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        )
    }
};

export default ChartsAnsMaps;