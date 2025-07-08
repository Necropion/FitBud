import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {useState} from "react";
import { useAuthUser } from "@/hooks/Authentication/useAuthUser.ts"
import {useAuthProviders} from "@/hooks/Authentication/useAuthProviders.ts"
import userFormDTO from "@/types/api/Authentication/UserFormDTO.tsx";
import ProviderDTO from "@/types/api/Authentication/ProviderDTO.tsx";

const SignUp = () => {

    const { registerUser, loading ,error } = useAuthUser();
    const { fetchOAuthURL } = useAuthProviders();
    const navigate = useNavigate();

    // Form Variables
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");

    // Message Variable
    const [message, setMessage] = useState<string>("Join FitBud to stay on top of your goals.")
    const displayMessage = message || error;

    const handleClick = () => {
        navigate("/login");
    };

    const handleFormEvent = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();


        if (name == "" || email == "" || password == "" || passwordCheck == "") {
            setMessage("Please fill out the whole form!")
        }

        if (password != passwordCheck) {
            setMessage("Please make sure the passwords match!")
        }

        if (password == passwordCheck && password != "" && passwordCheck != "") {
            const provider_data: ProviderDTO = { provider: "none" }

            const user_data: userFormDTO = { name, email, password }
            const postResult = await registerUser(provider_data, user_data)
            if (postResult == "registered") {
                console.log("User registered!")

                navigate("/home")
            }
            if (!postResult) {
                console.log("Something went wrong in postUser in SignUp Page." + postResult)
                setMessage("Something went wrong, please try again later.")
            }
        }
    }

    const handleButtonEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Google Sign Up Button
        if (e.currentTarget.id === "googleBtn") {

            const provider: string = "google"
            window.location.href = await fetchOAuthURL(provider);
            navigate('/home')
        }

        // Facebook Sign Up Button
        if (e.currentTarget.id === "facebookBtn") {
            const provider: string = "facebook"
            window.location.href = await fetchOAuthURL(provider);
            navigate('/home')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0E0E0E] text-white px-4">
            <Card className="w-full max-w-md bg-[#1A1A1A] text-white shadow-lg rounded-lg border border-[#2A2A2A]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Create an Account
                    </CardTitle>
                    <CardDescription className={`text-sm ${message.includes("Please") ? "text-[#B52230] animate-pulse drop-shadow-[0_0_5px_rgba(181,34,48,0.8)]" : "text-[#AFAFAF]"}`}>
                        {displayMessage}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                    {/* Sign-up Form */}
                    <form onSubmit={handleFormEvent} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm password"
                                className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                                onChange={(e) => setPasswordCheck(e.currentTarget.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#E6AC00] hover:bg-[#cc9900] text-black transition"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="text-center text-sm text-[#AFAFAF]">
                        or sign up with
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid gap-2">
                        <Button id="googleBtn" onClick={handleButtonEvent} className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 transition">
                            <FaGoogle className="text-[#B52230]" />
                            Sign up with Google
                        </Button>
                        <Button id="facebookBtn" onClick={handleButtonEvent} className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                            <FaFacebook />
                            Sign up with Facebook
                        </Button>
                    </div>

                    {/* Already have an account? */}
                    <div className="text-center text-sm text-[#AFAFAF] mt-4">
                        Already have an account?{" "}
                        <Link
                            id="loginBtn"
                            to="/login"
                            className="text-[#E6AC00] hover:underline"
                            onClick={handleClick}
                        >
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};

export default SignUp;
