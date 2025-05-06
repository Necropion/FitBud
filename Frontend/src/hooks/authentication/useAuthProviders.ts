import UserGoogleDataDTO from "@/types/api/Authentication/GoogleUserDataDTO.tsx";
import UserDTO from "@/types/api/Authentication/UserDTO.tsx";
import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import FacebookUserDataDTO from "@/types/api/Authentication/FacebookUserDataDTO.tsx";
import GoogleUserDataDTO from "@/types/api/Authentication/GoogleUserDataDTO.tsx";

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


                const {id, given_name, family_name, name, email, picture, verified_email} = response.data;

                const userGoogleData: UserGoogleDataDTO = {
                    id,
                    given_name,
                    family_name,
                    name,
                    email,
                    picture,
                    verified_email
                }

                const linkGoogle = await linkUserDataWithProvider(userGoogleData, provider);
                if (!linkGoogle) {
                    throw new Error("User linking failed");
                }
                userData = await linkGoogle;
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

                const { data } = await fetchFacebookUser.json();
                const { id, name, email } = data;

                const userFacebookData: FacebookUserDataDTO = {
                    id,
                    name,
                    email
                }

                const linkFacebook = await linkUserDataWithProvider(userFacebookData, provider);
                if (!linkFacebook) {
                    throw new Error("User linking failed");
                }
                userData = await linkFacebook;
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

    const linkUserDataWithProvider = async (providerData: GoogleUserDataDTO | FacebookUserDataDTO, provider: string) => {
        setLoading(true);
        setError(null);

        try {
            let linkUserPayload;
            console.log(`ProviderData: ${JSON.stringify(providerData)}`)

            if (provider === "google") {

                linkUserPayload = {
                    provider_data: {
                        provider: "google",
                        provider_user_id: providerData.id,
                        provider_user_name: providerData.name,
                    },
                    user_data: {
                        email: providerData.email
                    }
                }
            }

            if (provider === "facebook") {

                linkUserPayload = {
                    provider_data: {
                        provider: "facebook",
                        provider_user_id: providerData.id,
                        provider_user_name: providerData.name
                    },
                    user_data: {
                        email: providerData.email
                    }
                }
            }

            console.log("Payload: " + JSON.stringify(linkUserPayload))

            const postUserData = await fetch(`${gateway.authentication}api/user/`, {
                method: "POST",
                body: JSON.stringify(linkUserPayload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!postUserData || !postUserData.ok) throw new Error("Invalid response from server");

            const response = await postUserData.json();

            return response.data;

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

    return {
        fetchOAuthURL,
        exchangeCodeForToken,
        linkUserDataWithProvider,
        loading,
        error
    }
}