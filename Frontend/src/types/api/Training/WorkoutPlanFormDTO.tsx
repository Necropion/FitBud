import WorkoutExerciseCreateDTO from "@/types/api/Training/WorkoutExerciseCreateDTO.tsx";

type WorkoutPlanFormDTO = {
    user_id: number;
    goal_id: number;
    name: string;
    description?: string;
    notes?: string;
    exercises: WorkoutExerciseCreateDTO[];
}

export default WorkoutPlanFormDTO;