import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import UserDTO from "@/types/api/UserDTO.tsx";

export const useAuthGoogle = () => {

    const { gateway, setUser, setAuthenticated } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Direct user to google authentication url
    const fetchOAuthURL = async () => {
        setLoading(true);
        setError(null);

        try {
            const fetchURL = await fetch(`${gateway.authentication}api/google/oauth_url/`);
            const { url, state } = await fetchURL.json();  // ⬅ get `state` from backend

            localStorage.setItem("state", state); // Save for comparison/debugging
            console.log("OAuth state from backend:", state);  // ⬅ log here

            return url;
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when authenticating user.")
            }
        } finally {
            setLoading(false)
        }
    }

    //
    const exchangeCodeForToken = async (code: string, state: string) => {
        setLoading(true);
        setError(null);

        try {
            const fetchToken = await fetch(`${gateway.authentication}api/google/callback/`, {
                method: "POST",
                body: JSON.stringify({code, state}),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (!fetchToken || !fetchToken.ok) throw new Error("Invalid response from server");

            const response = await fetchToken.json();

            if (!fetchToken.ok) {
                throw new Error(response?.message || "Something went wrong when authenticating user data.");
            }

            const userData: UserDTO = { Id: response.id, Name: response.name, Email: response.email}
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setAuthenticated(true);
            localStorage.setItem("authenticated", JSON.stringify(true));

            return "validated";
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when authenticating user.")
            }
        } finally {
            setLoading(false)
        }
    }

    return{
        fetchOAuthURL,
        exchangeCodeForToken,
        loading,
        error
    }
}