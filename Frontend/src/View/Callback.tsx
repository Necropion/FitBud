import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthGoogle} from "@/hooks/authentication/useAuthGoogle.ts";

const Callback = () => {

    const { exchangeCodeForToken, loading, error } = useAuthGoogle();
    const navigate = useNavigate();

    useEffect(() => {
        const doAuthentication = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const state = params.get("state");

            if (!code || !state) {
                console.error("Missing code or state in query params");
                navigate("/login");
                return;
            }

            if (state !== localStorage.getItem("state")) {
                console.warn("⚠️ State mismatch between frontend and backend");
            }

            try {
                const res = await exchangeCodeForToken(code, state);

                if (!res) {
                    throw new Error(`Backend error: Something went wrong`);
                }

                if (res === "validated") {
                    navigate('/home')
                }

            } catch (err) {
                console.error("Google login failed:", err);
                navigate('/login')
            }
        };


        doAuthentication().catch((err) => {
            console.error("Authentication failed", err);
        });
    }, [exchangeCodeForToken, navigate]);

    return (
        <div>
            <p>{loading ? "Signing you in..." : ""}</p>
            <p>{error ? error : ""}</p>
        </div>
    )
}

export default Callback;