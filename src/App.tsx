
import './styles/global.css';
import './lib/dayjs';

//import { Habit } from './components/Habit'


import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';
import { useState } from 'react';

export function App() {

  const [reloadComp, setReloadComp] = useState(false);

  const updateSummary = () => setReloadComp(!reloadComp);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex-col gap-16'>
        <Header updateSummary={updateSummary} />
        <SummaryTable />
      </div>
    </div>
  )
}
