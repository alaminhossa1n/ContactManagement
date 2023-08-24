import { useQuery } from "@tanstack/react-query";

const UseWorldWideData = () => {
    const { data: worldWideData, isLoading: worldWideDataIsLoading} = useQuery({
        queryKey: ['worldWideData'],
        queryFn: async () => {
            const res = await fetch('https://disease.sh/v3/covid-19/all');
            return res.json();
        }
    });

    return [worldWideData, worldWideDataIsLoading];
};

export default UseWorldWideData;