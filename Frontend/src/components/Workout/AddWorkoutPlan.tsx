import React from "react";
import { Button } from "@/components/ui/button";
import WorkoutPlanFormDTO from "@/types/api/Training/WorkoutPlanFormDTO.tsx";

interface AddWorkoutPlanProps {
    handleClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    workoutPlanFormData: WorkoutPlanFormDTO;
    setWorkoutPlanFormData: React.Dispatch<React.SetStateAction<WorkoutPlanFormDTO>>;
}

const AddWorkoutPlan: React.FC<AddWorkoutPlanProps> = ({ handleClickEvent,  workoutPlanFormData,  setWorkoutPlanFormData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkoutPlanFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1A1A1A] text-white rounded-2xl shadow-lg flex flex-col justify-between w-[80%] h-[80%] p-6 relative border border-[#333] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Create New Workout Plan</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={workoutPlanFormData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            rows={4}
                            value={workoutPlanFormData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Goal ID</label>
                        <input
                            type="number"
                            name="goal_id"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={workoutPlanFormData.goal_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Notes</label>
                        <textarea
                            name="notes"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            rows={3}
                            value={workoutPlanFormData.notes}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button id="postWorkoutPlanBtn" onClick={handleClickEvent} className="w-[20%] bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                        Create Plan
                    </Button>
                    <Button id="cancelBtn" onClick={handleClickEvent} className="w-[20%] bg-[#B52230] hover:bg-[#FFFFFF] text-black">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddWorkoutPlan;
