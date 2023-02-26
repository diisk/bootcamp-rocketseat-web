import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
    progress: number
}


export function ProgressBar(props: ProgressBarProps) {

    return (
        <Progress.Root value={props.progress} className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <Progress.Indicator
                style={{ width:`${props.progress}%`}}
                className='h-3 rounded-xl bg-violet-600 w-3/4'
            />
        </Progress.Root>
    );
}