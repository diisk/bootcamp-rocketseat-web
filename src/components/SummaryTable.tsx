import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = "DSTQQSS".split('');

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSyze = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSyze - summaryDates.length;

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}



export function SummaryTable() {

    const [summary, setSummary] = useState<Summary[]>([]);

    function reloadSummary(){
        api.get('summary')
            .then(response => {
                setSummary(response.data);
            });
    }

    useEffect(() => {
        reloadSummary(); 
    }, []);

    

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
                {summary.length > 0 && summaryDates.map(date => {
                    const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'));
                    return <HabitDay
                        key={date.toString()}
                        date={date}
                        defaultCompletedHabits={dayInSummary?.completed}
                        defaultMaxHabits={dayInSummary?.amount}
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