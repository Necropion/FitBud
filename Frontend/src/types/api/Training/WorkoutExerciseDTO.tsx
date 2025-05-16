import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx";

type WorkoutExerciseDTO = {
    id: number;
    exercise: ExerciseDTO;
    workout_id: number;
    workout_plan_id: number;
    sets?: number;
    reps?: number;
    duration?: number;
}

export default WorkoutExerciseDTO;