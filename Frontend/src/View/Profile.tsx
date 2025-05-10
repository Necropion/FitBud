import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/authentication/useAuthUser.ts";
import {useContext, useEffect} from "react";
import AppContext from "@/context/AppContext.tsx";
import * as React from "react";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { fetchUser, deleteUser } = useAuthUser();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(e.currentTarget.id === "deleteBtn"){
            const response = await deleteUser(user.id)
            if (response === "User Deleted"){
                navigate('/')
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 lg:px-12 pt-8 space-y-10 text-white">
            {/* Header */}
            <header className="text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Your Profile</h1>
                <p className="text-[#AFAFAF]">View and update your account details</p>
            </header>

            {/* Profile Overview */}
            <Card className="bg-[#1A1A1A] border border-[#2A2A2A]">
                <CardHeader className="text-center">
                    <img
                        src="/avatar-placeholder.png"
                        alt="User avatar"
                        className="mx-auto w-24 h-24 rounded-full border-4 border-[#E6AC00]"
                    />
                    <CardTitle className="mt-4 text-2xl font-semibold text-[#E6AC00]">
                        {user.name}
                    </CardTitle>
                    <CardDescription className="text-[#AFAFAF]">
                        Joined: {user.created_at ? format(new Date(user.created_at), "PPP") : "N/A"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm text-[#E0DED9] mt-4">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Goal:</strong> Build Muscle</p>
                    <p><strong>Workouts Completed:</strong> 132</p>
                    <p><strong>Current Streak:</strong> 5 days</p>
                </CardContent>
            </Card>

            {/* Editable Info */}
            <Card className="bg-[#1A1A1A] border border-[#2A2A2A]">
                <CardHeader>
                    <CardTitle className="text-[#E6AC00]">Edit Profile</CardTitle>
                    <CardDescription className="text-[#AFAFAF]">
                        Update your personal details below
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-white mb-2">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-white mb-2">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                        />
                    </div>
                    <div>
                        <Label htmlFor="goal" className="text-white mb-2">Fitness Goal</Label>
                        <Input
                            id="goal"
                            type="text"
                            placeholder="Fat Loss / Muscle Gain / Endurance"
                            className="bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder:text-[#777]"
                        />
                    </div>
                    <Button className="mt-4 bg-[#E6AC00] hover:bg-[#cc9900] text-black w-full">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <div className="text-center">
                <Button
                    id="deleteBtn"
                    variant="destructive"
                    onClick={handleClick}
                    className="bg-[#B52230] hover:bg-red-700 w-full max-w-sm mx-auto"
                >
                    Delete Account
                </Button>
            </div>
        </div>
    );
};

export default Profile;
