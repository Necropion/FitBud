import {useContext, useState} from "react";
import AppContext from "../../context/AppContext.tsx";
import UserFormDTO from "@/types/api/Authentication/UserFormDTO.tsx";
import ProviderDTO from "@/types/api/Authentication/ProviderDTO.tsx";

export const useAuthUser = () => {

    const { gateway, user, setUser, setAuthenticated } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticateUser = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const authCheck = await fetch(`${gateway.authentication}api/user/authenticate/`, {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
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
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));

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

    const registerUser = async (provider_data: ProviderDTO, user_data: UserFormDTO) => {
        setLoading(true)
        setError(null)

        try {
            const postUser = await fetch(`${gateway.authentication}api/user/`, {
                method: "POST",
                body: JSON.stringify({
                    provider_data,
                    user_data
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            });
            const response = await postUser.json();

            if(!postUser.ok){
                throw new Error(response?.message || "Something went wrong when posting user data.")
            }

            if(!response?.data){
                throw new Error(response?.message || "Invalid response, missing user data.")
            }

            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setAuthenticated(true);
            localStorage.setItem("authenticated", JSON.stringify(true))

            return "registered"

        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
                console.log(error)
            } else {
                setError("An error has occurred when registering user.")
            }
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async () => {
        setLoading(true)
        setError(null)

        try {
            console.log("fetchUser activated")
            const getUser = await fetch(`${gateway.authentication}api/user/${user.id}`);
            const response = await getUser.json();

            if (getUser.ok) {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log("User data fetched successfully!")
            }

        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when registering user.")
            }
        } finally {
            setLoading(false)
        }
    };

    const deleteUser = async (userId: number | undefined) => {
        setLoading(true)
        setError(null)

        try {
        const userDelete = await fetch(`${gateway.authentication}api/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
        });

        if (userDelete.ok) {
            setAuthenticated(false);
            localStorage.setItem("authenticated", JSON.stringify(false))
            setUser({})
            localStorage.setItem("user", JSON.stringify({}))
            return "User Deleted"
        }

        return null;
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
        fetchUser,
        deleteUser,
        loading,
        error
    }
}