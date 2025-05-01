import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import UserGoogleDataDTO from "@/types/api/Authentication/GoogleUserDataDTO.tsx"
import UserDTO from "@/types/api/Authentication/UserDTO.tsx";

export const useAuthGoogle = () => {

    const { gateway, setUser, setAuthenticated } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Direct user to google authentication url
    const fetchGoogleOAuthURL = async () => {
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

            const { id, given_name, family_name, name, email,  picture, verified_email } = await fetchToken.json();

            const userGoogleData: UserGoogleDataDTO = { id, given_name, family_name, name, email, picture, verified_email}

            const linkUser = await linkUserDataWithGoogle(userGoogleData);

            const userData: UserDTO = await linkUser.data;

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

    const linkUserDataWithGoogle = async (userGoogleData: UserGoogleDataDTO) => {
        setLoading(true);
        setError(null);

        try {
            const postUserGoogleData = await fetch(`${gateway.authentication}api/user/`, {
                method: "POST",
                body: JSON.stringify({
                    provider_data: {
                        provider: "google",
                        provider_user_id: userGoogleData.id,
                        provider_user_name: userGoogleData.name,
                    },
                    user_data: {
                        email: userGoogleData.email
                    }
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            if (!postUserGoogleData || !postUserGoogleData.ok) throw new Error("Invalid response from server");

            const response = await postUserGoogleData.json();

            return response;

        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when linking user.")
            }
        } finally {
            setLoading(false)
        }
    }

    return{
        fetchGoogleOAuthURL,
        exchangeCodeForToken,
        loading,
        error
    }
}