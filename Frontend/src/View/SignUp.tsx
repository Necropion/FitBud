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
import {useState} from "react";
import { useAuthUser } from "@/hooks/authentication/useAuthUser.ts"
import userFormDTO from "@/types/api/Authentication/UserFormDTO.tsx";
import ProviderDTO from "@/types/api/Authentication/ProviderDTO.tsx";

const SignUp = () => {

    const { registerUser, loading ,error } = useAuthUser();
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

    const handleSignUp = async (e : React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();


        if (name == "" || email == "" || password == "" || passwordCheck == "") {
            setMessage("Please fill out the whole form!")
        }

        if (password != passwordCheck) {
            setMessage("Please make sure the passwords match!")
        }

        if (password == passwordCheck) {
            const provider_data: ProviderDTO = { provider: "none" }

            const user_data: userFormDTO = { name, email, password }
            const postResult = await registerUser(provider_data, user_data)
            if (postResult == "registered") {
                console.log("User registered!")

                navigate("/home")
            }
            if (!postResult) {
                console.log("Something went wrong in postUser in SignUp Page.")
                setMessage("Something went wrong, please try again later.")
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
            <Card className="w-full max-w-md bg-zinc-900 text-white shadow-lg rounded-lg border border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Create an Account
                    </CardTitle>
                    <CardDescription className={`text-sm ${message.includes("Please") ? "text-red-500 animate-pulse drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : "text-zinc-400"}`}>
                        {displayMessage}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                    {/* Sign-up Form */}
                    <form onSubmit={handleSignUp} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm password"
                                className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                                onChange={(e) => setPasswordCheck(e.currentTarget.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-black hover:bg-orange-500 text-white transition"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="text-center text-sm text-zinc-400">
                        or sign up with
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid gap-2">
                        <Button className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 transition">
                            <FaGoogle className="text-red-500" />
                            Sign up with Google
                        </Button>
                        <Button className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                            <FaFacebook />
                            Sign up with Facebook
                        </Button>
                        <Button className="flex items-center justify-center gap-2 bg-zinc-100 text-black hover:bg-zinc-300 transition">
                            <FaApple className="text-black" />
                            Sign up with Apple
                        </Button>
                    </div>

                    {/* Already have an account? */}
                    <div className="text-center text-sm text-zinc-400 mt-4">
                        Already have an account?{" "}
                        <Link
                            id="loginBtn"
                            to="/login"
                            className="text-orange-500 hover:underline"
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