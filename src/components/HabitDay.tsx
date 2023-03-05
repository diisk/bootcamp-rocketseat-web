import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface HabitDayProps {
    date: Date
    completedHabits?: number
    maxHabits?: number
}

export function HabitDay({ date, completedHabits = 0, maxHabits = 0 }: HabitDayProps) {
    const percent = maxHabits > 0 ? Math.round((completedHabits / maxHabits) * 100) : 0;

    const dayAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    const isBetween = (value: number, n1: number, n2: number) => {
        if (n1 > n2) {
            const aux = n1;
            n1 = n2;
            n2 = aux;
        }
        return value > n1 && value < n2;
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 border-2  rounded-lg", {
                    'bg-violet-500 border-violet-400': percent >= 80,
                    'bg-violet-600 border-violet-500': isBetween(percent, 59, 80),
                    'bg-violet-700 border-violet-500': isBetween(percent, 39, 60),
                    'bg-violet-800 border-violet-600': isBetween(percent, 19, 40),
                    'bg-violet-900 border-violet-700': isBetween(percent, 0, 20),
                    'bg-zinc-900 border-zinc-800': percent == 0,
                })}
            />
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">
                        {dayOfWeek}
                    </span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">
                        {dayAndMonth}
                    </span>

                    <ProgressBar progress={percent} />
                    <div className='mt-6 flex flex-col gap-3'>
                        <Checkbox.Root
                            className='flex items-center gap-3 group'
                        >
                            <div
                                className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'
                            >
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>


                            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                                Beber 2L de água
                            </span>
                        </Checkbox.Root>
                    </div>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}