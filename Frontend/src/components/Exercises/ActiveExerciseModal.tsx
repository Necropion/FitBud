import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx";
import {useState} from "react";

// Type definition for the props
interface ActiveExerciseModalProps {
    handleClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    progress: number;
    formattedRemainingTime: string;
    activeExercise: ExerciseDTO;
}

const ActiveExerciseModal: React.FC<ActiveExerciseModalProps> = ({ handleClickEvent, formattedRemainingTime, activeExercise }) => {

    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const totalSets = 3
    const sessionProgress = Math.min((sets / totalSets) * 100, 100);

    const incrementSets = () => setSets(prev => Math.min(prev + 1, totalSets));
    const decrementSets = () => setSets(prev => Math.max(prev - 1, 0));

    const incrementReps = () => setReps(prev => prev + 1);
    const decrementReps = () => setReps(prev => Math.max(prev - 1, 0));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1A1A1A] text-white rounded-2xl shadow-lg flex flex-col justify-between w-[80%] h-[80%] p-6 relative border border-[#333]">
                <div className="text-center text-4xl mb-4">{activeExercise.name}</div>

                <div className="flex justify-between mb-4">
                    <div>
                        <div className="text-lg mb-1">Sets</div>
                        <div className="flex items-center space-x-2">
                            <Button onClick={decrementSets}>-</Button>
                            <div className="text-xl">{sets}</div>
                            <Button onClick={incrementSets}>+</Button>
                        </div>
                    </div>

                    <div>
                        <div className="text-lg mb-1">Reps</div>
                        <div className="flex items-center space-x-2">
                            <Button onClick={decrementReps}>-</Button>
                            <div className="text-xl">{reps}</div>
                            <Button onClick={incrementReps}>+</Button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-3xl pb-6">{formattedRemainingTime}</div>

                <div className="w-full bg-[#333] h-4 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-[#E6AC00] transition-all duration-300 ease-linear"
                        style={{ width: `${sessionProgress}%` }}
                    />
                </div>

                <div className="text-center text-2xl mb-6">
                    Intensity: {activeExercise.intensity}
                </div>

                <Button
                    id="stopBtn"
                    onClick={handleClickEvent}
                    className="self-center mt-4 w-[30%] bg-[#E6AC00] hover:bg-[#cc9900] text-black"
                >
                    Stop Workout
                </Button>
            </div>
        </div>
    );
};

export default ActiveExerciseModal;
