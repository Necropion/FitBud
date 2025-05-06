import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthProviders} from "@/hooks/authentication/useAuthProviders.ts";

const Callback = () => {

    const { exchangeCodeForToken, loading, error } = useAuthProviders();
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        const doAuthentication = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const state = params.get("state");

            if (!code || !state) {
                console.error("Missing code or state in query params");
                navigate("/login");
                return;
            }

            // Check if states before call and after are matching
            if (state !== localStorage.getItem("state")) {
                console.warn("⚠️ State mismatch between frontend and backend");
            }

            const provider = state.split("_")[0];
            console.log(state)

            try {
                const res = await exchangeCodeForToken(code, state, provider);

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