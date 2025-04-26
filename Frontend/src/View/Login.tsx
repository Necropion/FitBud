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
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import {useContext, useState} from "react";
import AppContext from "@//context/AppContext.tsx";
import { authenticateUser } from "@/api/AuthApi";

const Login = () => {

    const { gateway, setAuthenticated, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    // Form Variables
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Message Variable
    const [message, setMessage] = useState<string>("Log in to track your progress and smash your goals.");

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.currentTarget.id === "signUpBtn") {
            navigate("/sign-up");
        }
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email == "" || password == ""){
            setMessage("Please fill out all the fields to proceed!")
        }

        if (email && password) {
            
            const authResult = await authenticateUser(gateway, email, password)

            if (authResult == "true") {

                const user = {
                    Email: email
                }

                setAuthenticated(true);
                localStorage.setItem("authenticated", JSON.stringify(true));
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));

                navigate("/home")
            }

            if (authResult == "false") {
                setAuthenticated(false);
                localStorage.setItem("authenticated", JSON.stringify(false));
                setMessage("Email/Password or both were incorrect, please try again.");
            }

            if (authResult == "error") {
                setMessage("There was an error that occured, please try again later.");
            }
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
                        {message}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit} className="grid gap-4">
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
                            type="submit"
                            className="bg-black hover:bg-orange-500 text-white transition"
                        >
                            Log In
                        </Button>
                    </form>

                    <div className="text-center text-sm text-zinc-400">or continue with</div>

                    <div className="grid gap-2">
                        <Button className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 transition">
                            <FaGoogle className="text-red-500" />
                            Google
                        </Button>
                        <Button className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                            <FaFacebook />
                            Facebook
                        </Button>
                        <Button className="flex items-center justify-center gap-2 bg-zinc-100 text-black hover:bg-zinc-300 transition">
                            <FaApple className="text-black" />
                            Apple
                        </Button>
                    </div>

                    <div className="text-center text-sm text-zinc-400 mt-2">
                        Don&apos;t have an account?{" "}
                        <Link
                            id="signUpBtn"
                            to="/sign-up"
                            className="text-orange-500 hover:underline"
                            onClick={handleClick}
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