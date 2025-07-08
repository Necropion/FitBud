import AppContext from "@/context/AppContext";
import {useContext, useState} from "react";

export const useTrainingGoal = () => {

    const { gateway, user, setUserGoals } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUserGoals = async () => {
        setLoading(true);
        setError(null);

        try{
            const fetchUserGoals = await fetch(`${gateway.training}api/goal/?user_id=${user.id}`)
            const response = await fetchUserGoals.json();

            if (!fetchUserGoals.ok){
                throw new Error (response.error || "Something went wrong when fetching user goals")
            }

            setUserGoals(response.data)
            localStorage.setItem("userGoals", JSON.parse(response.data))
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when fetching muscle groups.")
            }
        } finally {
            setLoading(false);
        }
    }

    return{
        getUserGoals,
        loading,
        error
    }
}