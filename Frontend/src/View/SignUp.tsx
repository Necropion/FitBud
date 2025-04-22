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
import {Link, useNavigate} from "react-router-dom";
import * as React from "react";

const SignUp = () => {

    const navigate = useNavigate();

    const handleEvent = async (e : React.MouseEvent<HTMLAnchorElement>) => {

        if (e.currentTarget.id == "loginBtn"){
            navigate("/login")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <Card className="w-full max-w-md bg-zinc-900 text-white shadow-lg rounded-lg border border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Create an Account
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Join FitBud to stay on top of your goals.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                        />
                    </div>
                    <Button className="bg-black hover:bg-orange-500 text-white transition">
                        Sign Up
                    </Button>
                    <div className="text-center text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link id="loginBtn" to="/login" className="text-orange-500 hover:underline" onClick={handleEvent}>
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;