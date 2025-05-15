import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect} from "react";
import {useTrainingWorkout} from "@/hooks/Training/useTrainingWorkout.ts";
import {format} from "date-fns";

const Progress = () => {

    const { fetchUserWorkouts, workouts, loading } = useTrainingWorkout();

    useEffect(() => {
        fetchUserWorkouts();
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 flex flex-col gap-8 text-white">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Workouts</h1>
                <p className="text-[#AFAFAF] text-sm">
                    These are all the workouts you have started.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loading ? "Loading..." : workouts
                    .slice()
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((workout) => (
                    <Card key={workout.id} className="bg-[#1A1A1A] border border-[#2A2A2A]">
                        <CardHeader>
                            <CardTitle className="text-[#E6AC00] text-lg">{workout.name}</CardTitle>
                            <CardDescription className="text-[#AFAFAF]">
                                {workout.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-white space-y-1">
                            <p>
                                <span className="text-[#AFAFAF]">Created: </span> {workout.created_at ? format(new Date(workout.created_at), "HH:mm,  PPP") : "N/A"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Progress;
