type WorkoutPlanDTO = {
    id: number;
    user_id: number;
    name: string;
    description: string;
    goal_id: number;
    created_at: string;
    notes: string;
}

export default WorkoutPlanDTO;