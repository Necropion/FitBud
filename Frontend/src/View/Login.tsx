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
import { useState} from "react";
import { useAuthUser } from "@/hooks/authentication/useAuthUser.ts"
import {useAuthProviders} from "@/hooks/authentication/useAuthProviders.ts";

const Login = () => {

    const { authenticateUser, loading, error } = useAuthUser();
    const { fetchOAuthURL } = useAuthProviders();
    const navigate = useNavigate();

    // Form Variables
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Message Variable
    const [message, setMessage] = useState<string>("Log in to track your progress and smash your goals.");
    const displayMessage = message || error;

    const handleFormEvent = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Login Form
        if(e.currentTarget.id === "loginForm") {

            if (email == "" || password == "") {
                setMessage("Please fill out all the fields to proceed!")
            }

            if (email && password) {

                const authResult = await authenticateUser(email, password)

                if (authResult == "true") {
                    console.log("User logged in.")
                    navigate("/home")
                }

                if (!authResult) {
                    setMessage("Email/password were both incorrect, please try again.");
                }
            }
        }
    }

    const handleClickEvent = async (e : React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {

        // Sign up Button
        if (e.currentTarget.id === "signUpBtn") {
            navigate("/sign-up");
        }

        // Google Login Button
        if (e.currentTarget.id === "googleBtn") {

            const provider: string = "google"
            window.location.href = await fetchOAuthURL(provider);
            navigate('/home')
        }

        // Facebook Login Button
        if (e.currentTarget.id === "facebookBtn") {
            const provider: string = "facebook"
            window.location.href = await fetchOAuthURL(provider);
            navigate('home')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0E0E0E] text-white">
            <Card className="w-full max-w-md bg-[#1A1A1A] text-white shadow-lg rounded-lg border border-[#2A2A2A]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription
                        className={`text-sm ${
                            /please|incorrect/i.test(message)
                                ? "text-[#B52230] animate-pulse drop-shadow-[0_0_5px_rgba(181,34,48,0.8)]"
                                : "text-[#AFAFAF]"
                        }`}
                    >
                        {displayMessage}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <form id="loginForm" onSubmit={handleFormEvent} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Username or E-mail"
                                className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <Button
                            id="loginBtn"
                            type="submit"
                            className="bg-[#E6AC00] hover:bg-[#cc9900] text-black transition"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-[#AFAFAF]">or continue with</div>

                    <div className="grid gap-2">
                        <Button id="googleBtn" onClick={handleClickEvent} className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 transition">
                            <FaGoogle className="text-[#B52230]" />
                            Google
                        </Button>
                        <Button id="facebookBtn" onClick={handleClickEvent} className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                            <FaFacebook />
                            Facebook
                        </Button>
                    </div>

                    <div className="text-center text-sm text-[#AFAFAF] mt-2">
                        Dont have an account?{" "}
                        <Link
                            id="signUpBtn"
                            to="/sign-up"
                            className="text-[#E6AC00] hover:underline"
                            onClick={handleClickEvent}
                        >
                            Sign up
                        </Link>
                    </div>
                    <div className="text-center text-xs text-[#AFAFAF]">
                        <Link to="/forgot-password" className="text-[#E6AC00] hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;