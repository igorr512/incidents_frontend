import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyTable from "../components/MyTable";
import axios from "axios";
import Cookies from "js-cookie";
import { removeToken } from "../store/slices/loginSlice";

const headers = [
    { name: "Ticket ID", key: "number" },
    { name: "Opened At", key: "opened_at" },
    { name: "Sys ID", key: "sys_id" },
    { name: "ID", key: "description_id" },
    { name: "Project", key: "description_project" },
    { name: "Message", key: "description_message" },
    { name: "Closed Notes", key: "closed_notes" },
];

const OpenIncidentTable = () => {
    /**
     * This component is responsible for table of the open incidents and their solution
     *
     */
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const transformIncidentData = (dataArray) => {
        /**
         * This function takes the array that the backend sends and trasform it to array of JSONs
         * Gets: dataArray: Array of objects
         * Returns: Array of modified objects
         */
        const transformedData = dataArray.map((item) => ({
            number: item.number,
            sys_id: item.sys_id,
            opened_at: item.opened_at,
            closed_notes: item.closed_notes,
            description_id: item.description.id,
            description_project: item.description.project,
            description_message: item.description.message,
            description_description: item.description.description,
            extended_message: `Event: ${item.description.message} <br>
            Event description: ${item.description.description} <br> 
            Possible Solution: ${item.closed_notes}`,
        }));
        return transformedData;
    };
    useEffect(() => {
        /**
         * Will run once when the page loads, will fetch data from the backend and transform it
         *  then update the state of the data in order to pass it to the component
         */
        const fetchData = async () => {
            try {
                // debugger;
                setLoading(true);
                const url = process.env.REACT_APP_BACKEND;
                const response = await axios.get(
                    `${url}/api/processOpenIncidents`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 401) {
                    Cookies.remove("jwt");
                    Cookies.remove("name");
                    dispatch(removeToken);
                }
                setData(transformIncidentData(response.data));
            } catch (error) {
                if (error.status) {
                    if (error.response.status === 403) {
                        Cookies.remove("jwt");
                        dispatch(removeToken);
                    }
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        /**
         * if the states of loading and error are not true will present the component of the table
         *  the table takes the columns the rows array and if the table supposed to be expandable
         */
        !loading &&
        !error && (
            <MyTable columns={headers} rows={data} isExtended={true}></MyTable>
        )
    );
};
export default OpenIncidentTable;
