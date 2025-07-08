import {Dumbbell, Pencil, Target} from "lucide-react";

const DiagonalIconGrid = () => {

    return(
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[300%] h-[300%] ml-[20px]" style={{transform: "translate(-200px, -125px)"}}>
                {[...Array(30)].map((_, row) =>
                    [...Array(40)].map((_, col) => {
                        const spacing = 70;
                        const left = col * spacing;
                        const top = row * spacing;

                        const iconIndex = (row + col) % 3;

                        const baseProps = {
                            className: "absolute text-yellow-500 opacity-10 w-[30px] h-[30px]",
                            style: { top: `${top}px`, left: `${left}px` },
                        };

                        const key = `icon-${row}-${col}`;

                        if (iconIndex === 0) {
                            // Dumbbells move
                            return (
                                <Dumbbell
                                    key={key}
                                    {...baseProps}
                                    className={`${baseProps.className} animate-diagonal-down-oscillate`}
                                />
                            );
                        } else if (iconIndex === 1) {
                            return <Target
                                key={key}
                                {...baseProps}
                                className={`${baseProps.className} animate-diagonal-up-oscillate`}
                            />;
                        } else {
                            return <Pencil
                                key={key}
                                {...baseProps}
                                className={`${baseProps.className} animate-diagonal-down-2-oscillate`}
                            />;
                        }
                    })
                )}
            </div>
        </div>
    )
}

export default DiagonalIconGrid;