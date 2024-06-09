import axios from "axios";
import { useEffect, useState } from "react";
import MyTable from "../components/MyTable";

const headers = [
    { name: "Type", key: "description_id" },
    { name: "Project", key: "description_project" },
    { name: "Message", key: "description_message" },
    { name: "Repeats", key: "repeats" },
];

const RepeatedIncidents = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const extractData = (dataArray) => {
        const extractedRepeatedData = dataArray.map((item) => {
            const itemKey = item[0];
            const splitValue = itemKey.split(":");
            return {
                description_id: splitValue[0],
                description_project: splitValue[1],
                description_message: splitValue[2],
                repeats: item[1],
            };
        });
        return extractedRepeatedData;
    };
    useEffect(() => {
        const getRepeatedIncidents = async () => {
            try{
            debugger;
            setLoading(true);
            const incidentsArray = await axios.get(
                `${process.env.REACT_APP_BACKEND}/api/getMostRepeated`
            );
            setData(extractData(incidentsArray.data));
            }
            catch(error){
                setError(error);
            }
            finally{
                setLoading(false);
            }
        };
        getRepeatedIncidents();
    }, []);
    return(
        !loading && !error && <MyTable columns={headers} rows={data} isExtended={false}></MyTable>
    )
};
export default RepeatedIncidents;
