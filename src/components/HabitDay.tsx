import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
    completedHabits: number
    maxHabits: number
}

export function HabitDay({ completedHabits, maxHabits }: HabitDayProps) {
    const percent = Math.round((completedHabits / maxHabits) * 100);

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
                        segunda-feira
                    </span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">
                        17/01
                    </span>

                    <ProgressBar progress={percent} />
                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}