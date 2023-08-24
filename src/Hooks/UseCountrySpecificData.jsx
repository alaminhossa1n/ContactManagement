import { useQuery } from "@tanstack/react-query";

const UseCountrySpecificData = () => {

    const { data: countrySpecificData, isLoading: countryLoading } = useQuery({
        queryKey: ['countrySpecificData'],
        queryFn: async () => {
            const res = await fetch('https://disease.sh/v3/covid-19/countries')
            return res.json();
        }
    })
    return [countrySpecificData, countryLoading];
};

export default UseCountrySpecificData;