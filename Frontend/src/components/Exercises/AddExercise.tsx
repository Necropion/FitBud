import React from "react";
import { Button } from "@/components/ui/button";
import ExerciseFormDTO from "@/types/api/Training/ExerciseFormDTO.tsx";

interface AddExerciseProps {
    handleClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    exerciseFormData: ExerciseFormDTO;
    setExerciseFormData: React.Dispatch<React.SetStateAction<ExerciseFormDTO>>;
}

const AddExercise: React.FC<AddExerciseProps> = ({ handleClickEvent, exerciseFormData, setExerciseFormData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExerciseFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1A1A1A] text-white rounded-2xl shadow-lg flex flex-col justify-between w-[80%] h-[80%] p-6 relative border border-[#333] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Add New Exercise</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={exerciseFormData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Duration (min)</label>
                        <input
                            type="number"
                            name="duration"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={exerciseFormData.duration}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Intensity</label>
                        <select
                            name="intensity"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={exerciseFormData.intensity}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={exerciseFormData.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Equipment Required</label>
                        <input
                            type="text"
                            name="equipment_required"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            value={exerciseFormData.equipment_required}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            rows={4}
                            value={exerciseFormData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button id="postExerciseBtn" onClick={handleClickEvent} className="w-[20%] bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                        Add Exercise
                    </Button>
                    <Button id="cancelBtn" onClick={handleClickEvent} className="w-[20%] bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddExercise;
