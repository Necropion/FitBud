import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const daysInMonth = currentMonth.daysInMonth();
    const startOfMonth = currentMonth.startOf("month").day();

    const days = [];
    for (let i = 0; i < startOfMonth; i++) {
        days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        days.push(d);
    }

    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth.add(1, "month"));
    };

    return (
        <Card className="bg-zinc-900 border border-zinc-800 w-full max-w-xl">
            <CardHeader className="flex flex-col items-center">
                <div className="flex justify-between w-full mb-4">
                    <Button onClick={handlePrevMonth} variant="ghost" className="text-white">
                        ←
                    </Button>
                    <CardTitle className="text-white text-lg">
                        <FaCalendarAlt className="inline mr-2 text-orange-500" />
                        {currentMonth.format("MMMM YYYY")}
                    </CardTitle>
                    <Button onClick={handleNextMonth} variant="ghost" className="text-white">
                        →
                    </Button>
                </div>
                <CardDescription className="text-zinc-400 text-sm">
                    Track your training days and upcoming sessions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center text-zinc-400 text-sm mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`aspect-square flex items-center justify-center rounded-md border border-zinc-700 text-white ${
                                day ? "bg-zinc-800 hover:bg-orange-500 transition cursor-pointer" : ""
                            }`}
                        >
                            {day || ""}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Calendar;
