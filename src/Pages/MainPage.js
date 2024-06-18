import IncidentsLayout from "../layouts/IncidentsLayout";
import LoginLayout from "../layouts/LoginLayout";
import { useSelector,useDispatch } from "react-redux";
import { removeToken, setToken } from "../store/slices/loginSlice";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const MainPage = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const getTokenFromSession = () =>{
        //const sessionToken = sessionStorage.getItem("token");
        const jwt = Cookies.get('jwt');
        const name = Cookies.get('name')
        if(jwt){
            dispatch(setToken({token:jwt,name}));
        }
    }
    getTokenFromSession();
    // useEffect(()=>{
    //     const checkToken = async(token) => {
    //         try{
    //             const response = await axios.post(
    //                 `${process.env.REACT_APP_BACKEND}/auth/verify`,
    //                 {token}
    //             );
    //             if(!response.data){
    //                 //sessionStorage.removeItem("token");
    //                 Cookies.remove('jwt');
    //                 dispatch(removeToken());
    //             }
    //         }
    //         catch(error){
    //             console.error(error);
    //         }
    //     }
    //     if(token){
    //         checkToken(token);
    //     }
    // },[token]);

    return (<>
    {token ?<IncidentsLayout /> : <LoginLayout />}
    </>)
}
export default MainPage;
