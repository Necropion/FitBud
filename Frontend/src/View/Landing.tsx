import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col px-6 py-8">

            <header className="w-full border-b border-[#1A1A1A]">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-4">
                    <h1 className="text-3xl font-extrabold text-[#E6AC00] tracking-tight">FitBud</h1>
                    <nav className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="outline" className="border-[#E6AC00] text-[#E6AC00] hover:bg-[#E6AC00] hover:text-black">
                                Log In
                            </Button>
                        </Link>
                        <Link to="/sign-up">
                            <Button className="bg-[#E6AC00] hover:bg-[#cc9900] text-black shadow-md">
                                Get Started
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center text-center py-16">
                <Badge className="bg-[#E6AC00] text-black mb-4">Your Fitness Companion</Badge>
                <h2 className="text-5xl font-bold leading-tight mb-6">
                    Achieve Your Fitness Goals <br />
                    With <span className="text-[#E6AC00]">Clarity</span> and <span className="text-[#E6AC00]">Consistency</span>
                </h2>
                <p className="text-[#AFAFAF] text-lg max-w-xl mb-8">
                    FitBud helps you stay on track with smart progress tracking and personalized routines built just for you.
                </p>
                <Link to="/sign-up">
                    <Button size="lg" className="bg-[#E6AC00] hover:bg-[#cc9900] text-black px-8 py-4 text-lg">
                        Join Now
                    </Button>
                </Link>
            </main>

            <Separator className="bg-[#1A1A1A] my-8" />

            <footer className="text-center text-[#AFAFAF] text-sm">
                © {new Date().getFullYear()} FitBud. All rights reserved.
            </footer>
        </div>
    );
};

export default Landing;
