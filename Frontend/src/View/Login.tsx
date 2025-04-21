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
import { Link } from "react-router-dom"; // Assuming you're using React Router

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-md rounded-lg border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Welcome Back! 💪
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Log in to track your progress and smash your goals.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="bg-primary text-white hover:bg-primary/90">
                        Log In
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;