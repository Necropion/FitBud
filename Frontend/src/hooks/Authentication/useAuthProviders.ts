import UserDTO from "@/types/api/Authentication/UserDTO.tsx";
import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";

export const useAuthProviders = () => {

    const { gateway, setUser, setAuthenticated } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Direct User to Authentication url
    const fetchOAuthURL = async (provider: string) => {
        setLoading(true);
        setError(null);

        try {
            const fetchURL = await fetch(`${gateway.authentication}api/${provider}/oauth_url/`);
            const { message, data } = await fetchURL.json();

            localStorage.setItem("state", data.state);
            console.log(`${message}: ${data.state}`);

            console.log(`${provider} auth URL fetched successfully!`)
            return data.url;
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

    const exchangeCodeForToken = async (code: string, state: string, provider: string) => {
        setLoading(true);
        setError(null);

        try {
            let userData: UserDTO | null = null;

            // Google Data
            if (provider === "google") {
                const fetchToken = await fetch(`${gateway.authentication}api/${provider}/callback/`, {
                    method: "POST",
                    body: JSON.stringify({code, state}),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (!fetchToken || !fetchToken.ok) throw new Error("Invalid response from server");

                const response = await fetchToken.json();
                console.log("Backend response:", response);


                const {id, name, email, created_at} = response.data;

                const googleUser: UserDTO = {
                    id,
                    name,
                    email,
                    created_at
                }

                console.log("User facebook details fetched successfully!")
                userData = googleUser;
            }

            // Facebook Data
            if (provider === "facebook") {
                const fetchFacebookUser = await fetch(`${gateway.authentication}api/${provider}/callback/`, {
                    method: "POST",
                    body: JSON.stringify({ code, state }),
                    headers: {
                        "Content-Type":"application/json"
                    }
                })
                if (!fetchFacebookUser.ok){
                    throw new Error("Something went wrong while fetching facebook user details")
                }

                const response = await fetchFacebookUser.json();
                console.log("Facebook response:", response);

                const { id, name , email, created_at} = response.data;

                const facebookUser: UserDTO = {
                    id,
                    name,
                    email,
                    created_at
                }

                console.log("User facebook details fetched successfully!")
                userData = facebookUser;
            }

            if (!userData) {throw new Error("User linking failed.")}

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setAuthenticated(true);
            localStorage.setItem("authenticated", JSON.stringify(true));

            return "validated"
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

    return {
        fetchOAuthURL,
        exchangeCodeForToken,
        loading,
        error
    }
}