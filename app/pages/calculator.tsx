import * as React from 'react';
import { Tooltip } from '@mui/material';
import StyledSlider from '../components/slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

export default function Calculator() {
  const tooltipNewProjects = 'This is the number of new projects each of your referred customer installs on average per month';
  const tooltipExistingProjects = 'This is the number of existing projects each of your referred customer already has on average';
  
  const [customersValue, setCustomersValue] = React.useState<number>(1);
  const [newProjectsValue, setNewProjectsValue] = React.useState<number>(10);
  const [existingProjectsValue, setExistingProjectsValue] = React.useState<number>(300);

  const [incomeValue, setIncomeValue] = React.useState<number>(3075);

  const handleChangeCustomers = (event: Event, newValue: number | number[]) => {
    setCustomersValue(newValue as number);
  };

  const handleChangeNewProjects = (event: Event, newValue: number | number[]) => {
    setNewProjectsValue(newValue as number);
  };

  const handleChangeExistingProjects = (event: Event, newValue: number | number[]) => {
    setExistingProjectsValue(newValue as number);
  };

  return (
    <>
      <h1 className='text-center text-5xl font-bold leading-tight mb-16 capitalize'>
        Calculate your recurring <br /> passive income
      </h1>
      <div className='flex flex-wrap flex-row justify-around text-lg'>
        <div className='basis-85'>
          <p className='font-medium text-black mb-10'>
            Add in your expected referrals to see how much you could earn as a <strong>Sunvoy Affiliate</strong> in just 1 year
          </p>

          <div className='text-gray-600 text-base font-medium mb-10'>
          
            <div className='flex justify-between'>
              <p>Referred Customers per month</p>
              <p>{customersValue}</p>
            </div>

            <StyledSlider value={customersValue} min={1} max={10} onChange={handleChangeCustomers} className='mb-1'/>

            <div className='flex justify-between'>
              <p>Avg. new projects per month &nbsp;<Tooltip title={tooltipNewProjects}><FontAwesomeIcon icon={faCircleInfo} /> </Tooltip></p>
              <p>{newProjectsValue}</p>
            </div>

            <StyledSlider value={newProjectsValue} min={5} max={50} onChange={handleChangeNewProjects} className='mb-1'/>

            <div className='flex justify-between'>
              <p>Avg. existing projects &nbsp;<Tooltip title={tooltipExistingProjects}><FontAwesomeIcon icon={faCircleInfo} /> </Tooltip></p>
              <p>{existingProjectsValue}</p>
            </div>

            <StyledSlider value={existingProjectsValue} min={0} max={10000} onChange={handleChangeExistingProjects} className='mb-1'/>

          </div>

          <p className='text-lg font-medium text-black text-center mb-2'>
            Your <strong>montly income</strong> after 1 year:
          </p>
          <p className='text-center text-6xl font-bold'>
            ${incomeValue.toLocaleString('en-US')}
          </p>

        </div>
      </div>
    </>
  );
}
