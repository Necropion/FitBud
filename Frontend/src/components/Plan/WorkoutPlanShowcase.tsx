interface GetWorkoutPlanShowcaseParams {
    planId: number;
}

const WorkoutPlanShowcase = ({
    planId
}: GetWorkoutPlanShowcaseParams) => {



    return (
        <div className="bg-[#1F1F1F] text-white w-full h-full p-6 rounded-lg space-y-6 overflow-y-auto">
            {/* Title and Metadata */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">{workoutPlanFormData.name}</h1>
                <p className="text-md text-gray-300"><span className="font-semibold text-gray-400">Goal:</span> {userGoals.find((goal) => goal.id === workoutPlanFormData.goal_id)?.type || "N/A"}</p>
            </div>

            {/* Description */}
            {workoutPlanFormData.description && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-1">Description</h2>
                    <p className="text-sm text-gray-300">{workoutPlanFormData.description}</p>
                </div>
            )}

            {/* Notes */}
            {workoutPlanFormData.notes && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-1">Notes</h2>
                    <p className="text-sm text-gray-300">{workoutPlanFormData.notes}</p>
                </div>
            )}

            {/* Exercises by Muscle Group */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-2">Workout Plan Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMuscleGroups.map((muscle) => (
                        <div key={muscle} className="bg-[#2A2A2A] p-4 rounded-lg border border-[#444] shadow-sm">
                            <h3 className="text-lg font-semibold text-yellow-400 mb-2">{muscle}</h3>
                            <ul className="space-y-2">
                                {workoutPlanFormData.exercises
                                    .filter(e => exercises.find(ex => ex.id === e.exercise_id)?.category === muscle)
                                    .map((e, idx) => {
                                        const exerciseInfo = exercises.find(ex => ex.id === e.exercise_id);
                                        return (
                                            <li key={idx} className="text-sm text-gray-300 border-b border-[#444] pb-2">
                                                <div className="font-medium text-white">{exerciseInfo?.name}</div>
                                                <div className="text-gray-400">Sets: {e.sets} | Reps: {e.reps} | Duration: {exerciseInfo?.duration} min</div>
                                                <div>Description: {exerciseInfo?.description}</div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkoutPlanShowcase;