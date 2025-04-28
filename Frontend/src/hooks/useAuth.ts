import {useContext, useState} from "react";
import AppContext from "../context/AppContext.tsx";

export const useAuth = () => {

    const { gateway, setUser, setAuthenticated } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticateUser = async (Email: string, Password: string) => {
        setLoading(true);
        setError(null);

        try {
            const authCheck = await fetch(`${gateway.authentication}user/authenticate/`, {
                method: "POST",
                body: JSON.stringify({
                    Email,
                    Password
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const response = await authCheck.json();

            if (!authCheck.ok) {
                throw new Error(response?.message || "Something went wrong when authenticating user data.");
            }

            setAuthenticated(true);
            localStorage.setItem("authenticated", JSON.stringify(true));
            setUser({ Email });
            localStorage.setItem("user", JSON.stringify({ Email }));

            return "true"

        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when authenticating user.")
            }
        } finally {
            setLoading(false)
        }
    }

    const registerUser = async (Name: string, Email: string, Password: string) => {
        setLoading(true)
        setError(null)

        try {
            const postUser = await fetch(`${gateway.authentication}user/create/`, {
                method: "POST",
                body: JSON.stringify({
                    Name,
                    Email,
                    Password
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            });
            const response = await postUser.json();

            if(!postUser.ok){
                throw new Error(response?.message || "Something went wrong when posting user data.")
            }

            setUser(response);
            localStorage.setItem("user", JSON.stringify(response));
            setAuthenticated(true);
            localStorage.setItem("authenticated", JSON.stringify(true))

            return "registered"

        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when registering user.")
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        authenticateUser,
        registerUser,
        loading,
        error
    }
}