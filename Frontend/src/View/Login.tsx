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
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <Card className="w-full max-w-md bg-zinc-900 text-white shadow-lg rounded-lg border border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription
                        className={`text-sm ${
                            /please|incorrect/i.test(message)
                                ? "text-red-500 animate-pulse drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]"
                                : "text-zinc-400"
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
                                className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
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
                                className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <Button
                            id="loginBtn"
                            type="submit"
                            className="bg-black hover:bg-orange-500 text-white transition"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-zinc-400">or continue with</div>

                    <div className="grid gap-2">
                        <Button id="googleBtn" onClick={handleClickEvent} className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 transition">
                            <FaGoogle className="text-red-500" />
                            Google
                        </Button>
                        <Button id="facebookBtn" onClick={handleClickEvent} className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                            <FaFacebook />
                            Facebook
                        </Button>
                    </div>

                    <div className="text-center text-sm text-zinc-400 mt-2">
                        Dont have an account?{" "}
                        <Link
                            id="signUpBtn"
                            to="/sign-up"
                            className="text-orange-500 hover:underline"
                            onClick={handleClickEvent}
                        >
                            Sign up
                        </Link>
                    </div>
                    <div className="text-center text-xs text-zinc-500">
                        <Link to="/forgot-password" className="text-orange-500 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;