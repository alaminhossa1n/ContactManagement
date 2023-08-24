import { useQuery } from "@tanstack/react-query";

const UseCaseWithDatesData = () => {

    const { data: caseWithDatesData, isLoading:caseWithDatesDataLoading } = useQuery({
        queryKey: ['caseWithDatesData'],
        queryFn: async () => {
            const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
            return res.json();
        }
    });
    return [caseWithDatesData, caseWithDatesDataLoading]
};

export default UseCaseWithDatesData;