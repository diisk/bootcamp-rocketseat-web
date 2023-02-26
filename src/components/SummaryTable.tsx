import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = "DSTQQSS".split('');

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSyze = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSyze - summaryDates.length;

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, index) => {
                    return (
                        <div key={`${weekDay}-${index}`} className="text-zinc-400 text-xl h-10 w-10 flex font-bold items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map(date => {
                    return <HabitDay
                        key={date.toString()}
                        completedHabits={Math.round(Math.random()*5)}
                        maxHabits={5}
                    />
                })}

                {
                    amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((x, index) => {
                        return <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>;
                    })
                }
            </div>
        </div>
    )
}