import { Button, Card, CardActions, Box, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/loginSlice";
import Cookies from "js-cookie";
import { useState } from "react";

const LoginLayout = () => {
    const [error, setError] = useState(undefined);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        debugger;
        // replace with SSO logic
        try {
            debugger;
            const url = process.env.REACT_APP_BACKEND;
            const response = await axios.post(`${url}/auth/getToken`, {
                username: "myname",
                password: "test",
            });
            // const REACT_APP_BACKEND =
            //     "http://localhost:30005";
            // const response = await axios.post(
            //     `${REACT_APP_BACKEND}/auth/getToken`,
            //     { username: "test", password: "test" }
            // );
            const token = response.data.token;
            const name = response.data.name;

            if (token && name) {
                setError(undefined);
                dispatch(setToken({ token, name }));
                //sessionStorage.setItem("token",token);
                Cookies.set("jwt", token, {
                    secure: true,
                    sameSite: "strict",
                    expires: 7,
                });
                Cookies.set("name", name, {
                    secure: true,
                    sameSite: "strict",
                    expires: 7,
                });
            } else {
                setError("Problem occured with signing in");
            }
        } catch (error) {
            setError("Problem occured with signing in");
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Card
                sx={{
                    minWidth: 275,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30vh",
                    width: "20vw",
                }}
            >
                <CardActions>
                    <Button variant="contained" onClick={handleLogin}>
                        {" "}
                        Log in{" "}
                    </Button>
                </CardActions>
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
            </Card>
        </Box>
    );
};
export default LoginLayout;
