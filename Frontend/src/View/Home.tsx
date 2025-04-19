import {useEffect, useState} from "react";

const Home = () => {

    const [serverMsg, setServerMsg] = useState<string>("")

    const [name] = useState("Jokubas");

    const fetchMsg = async () => {

        try {
            const response = await fetch("http://localhost:5000")
            const msg = await response.json();

            if (response.ok) {
                setServerMsg(msg.message);
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
            <h1>Hello {name}, {serverMsg}</h1>
        </div>
    )
}

export default Home;