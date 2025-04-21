import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"

const Home = () => {

    const [name, setName] = useState<string>("");

    const fetchMsg = async () => {

        try {
            const response = await fetch("http://localhost:5500/api/authentication/users/")
            const data = await response.json();

            if (response.ok) {
                setName(data[0].name);
                console.log("Fetch call made: ", + data)
            }
        } catch (error) {
            console.log(`Error trying to fetchMsg: ${error}`)
        }
    }

    useEffect(() => {
        fetchMsg();
    }, []);

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <h1>Hello {name}</h1>
            <Button>Shad Button</Button>
        </div>
    )
}

export default Home;