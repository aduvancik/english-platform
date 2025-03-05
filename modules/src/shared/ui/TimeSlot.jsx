import { translateTimeSlotDay } from "../utils/translateTimeSlotDay";
import { formatTime } from "../utils/formatTime";


export const TimeSlot = ({ day, startTime }) => {
    return (
        <div className="w-[140px] h-[50px] flex flex-col justify-center items-center bg-[#36b889] rounded-md text-white">
            <p>{translateTimeSlotDay(day)}</p>
            <p>{formatTime(startTime)}</p>
        </div>
    );
};
