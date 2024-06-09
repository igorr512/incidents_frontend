import { useEffect, useState } from "react";
import MyTable from "../components/MyTable";
import axios from "axios";

const headers = [
    { name: "Ticket ID", key: "number" },
    { name: "Opened At", key: "opened_at" },
    { name: "Sys ID", key: "sys_id" },
    { name: "Type", key: "description_id" },
    { name: "Project", key: "description_project" },
    { name: "Message", key: "description_message" },
    { name: "Closed Notes", key: "closed_notes" },
];

const OpenIncidentTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const transformIncidentData = (dataArray) => {
        const transformedData = dataArray.map((item) => ({
            number: item.number,
            sys_id: item.sys_id,
            opened_at: item.opened_at,
            closed_notes: item.closed_notes,
            description_id: item.description.id,
            description_project: item.description.project,
            description_message: item.description.message,
            description_description: item.description.description,
            extended_message: `Event: ${item.description.description} <br> 
            Possible Solution: ${item.closed_notes}`,
        }));
        return transformedData;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND}/api/processOpenIncidents`
                );
                setData(transformIncidentData(response.data));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        !loading &&
        !error && (
            <MyTable columns={headers} rows={data} isExtended={true}></MyTable>
        )
    );
};
export default OpenIncidentTable;
