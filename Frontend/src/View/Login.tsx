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
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <Card className="w-full max-w-md bg-zinc-900 text-white shadow-lg rounded-lg border border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Welcome Back! 💪
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Log in to track your progress and smash your goals.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Username or E-mail"
                            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400"
                        />
                    </div>
                    <Button className="bg-black hover:bg-orange-500 text-white transition">
                        Log In
                    </Button>
                    <div className="text-center text-sm text-zinc-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-orange-500 hover:underline">
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
