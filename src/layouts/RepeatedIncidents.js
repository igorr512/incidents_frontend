import axios from "axios";
import { useEffect, useState } from "react";
import MyTable from "../components/MyTable";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { removeToken } from "../store/slices/loginSlice";

const headers = [
    { name: "ID", key: "description_id" },
    { name: "Project", key: "description_project" },
    { name: "Message", key: "description_message" },
    { name: "Repeats", key: "repeats" },
];

const RepeatedIncidents = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const extractData = (dataArray) => {
        /**
         * This function takes the array that the backend sends
         *  and trasform it to a desirable array of JSONs
         * Gets: dataArray: Array of objects
         * Returns: Array of modified objects
         */
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
        /**
         * Will run once when the page loads, will fetch data from the backend and transform it
         *  then update the state of the data in order to pass it to the component
         */
        const getRepeatedIncidents = async () => {
            try {
                setLoading(true);
                const url = process.env.REACT_APP_BACKEND;
                const response = await axios.get(
                    `${url}/api/getMostRepeated`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 401) {
                    Cookies.remove("jwt");
                    dispatch(removeToken);
                }

                setData(extractData(response.data));
            } catch (error) {
                if(error.response){
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
        getRepeatedIncidents();
    }, []);
    return (
        /**
         * if the states of loading and error are not true will present the component of the table
         *  the table takes the columns the rows array and if the table supposed to be expandable
         */
        !loading &&
        !error && (
            <MyTable columns={headers} rows={data} isExtended={false}></MyTable>
        )
    );
};
export default RepeatedIncidents;
