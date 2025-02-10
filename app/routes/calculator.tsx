import * as React from 'react';
import type { Route } from './+types/calculator';
import { useFetcher } from 'react-router';
import { Tooltip } from '@mui/material';
import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import StyledSlider from '../components/slider';
import { type RevenueData } from '../utils/calculate';

const uData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G', 'Page H', 'Page I', 'Page J', 'Page K', 'Page L'];

const tooltipNewProjects = 'This is the number of new projects each of your referred customer installs on average per month';
const tooltipExistingProjects = 'This is the number of existing projects each of your referred customer already has on average';

export async function loader({  }) {

};
  
export default function Calculator({}: Route.ComponentProps) {
  let fetcher = useFetcher();
  
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

  const handleCalculate = async () => {
    await fetcher.submit(
      { customers: customersValue, newProjects: newProjectsValue, existingProjects: existingProjectsValue },
      { action: 'calculate', method: 'post' });
  };

  React.useEffect(() => {
    if (fetcher.data) {
      const data: RevenueData[] =  JSON.parse(fetcher.data);
      setIncomeValue(data[12].revenue);
    }
  }, [fetcher.data]);
  
  return (
    <>
      <h1 className="text-center text-5xl font-bold leading-tight mb-12 capitalize">
        Calculate your recurring <br /> passive income
      </h1>
      <div className="flex flex-wrap flex-row justify-center text-lg mb-12 items-center">
        <div className="basis-85 mr-30">
          <p className="font-medium text-black mb-10">
            Add in your expected referrals to see how much you could earn as a <strong>Sunvoy Affiliate</strong> in just 1 year
          </p>

          <div className="text-gray-600 text-base font-medium mb-10">
            <div className="flex justify-between">
              <p>Referred Customers per month</p>
              <p>{customersValue}</p>
            </div>

            <StyledSlider value={customersValue} min={1} max={10} onChangeCommitted={handleCalculate} onChange={handleChangeCustomers} className="mb-1" />

            <div className="flex justify-between">
              <p>
                Avg. new projects per month &nbsp;
                <Tooltip title={tooltipNewProjects}>
                  <FontAwesomeIcon icon={faCircleInfo} />{' '}
                </Tooltip>
              </p>
              <p>{newProjectsValue}</p>
            </div>

            <StyledSlider value={newProjectsValue} min={5} max={50} onChangeCommitted={handleCalculate} onChange={handleChangeNewProjects} className="mb-1" />

            <div className="flex justify-between">
              <p>
                Avg. existing projects &nbsp;
                <Tooltip title={tooltipExistingProjects}>
                  <FontAwesomeIcon icon={faCircleInfo} />{' '}
                </Tooltip>
              </p>
              <p>{existingProjectsValue}</p>
            </div>

            <StyledSlider
              value={existingProjectsValue}
              min={0}
              max={10000}
              onChangeCommitted={handleCalculate}
              onChange={handleChangeExistingProjects}
              className="mb-1"
            />
          </div>

          <p className="text-lg font-medium text-black text-center mb-2">
            Your <strong>montly income</strong> after 1 year:
          </p>
          <p className="text-center text-6xl font-bold">${incomeValue.toLocaleString('en-US')}</p>
        </div>

        <div className="basis-170 ">
          <BarChart
            tooltip={{ trigger: 'none' }}
            width={1000}
            height={600}
            series={[{ data: uData, type: 'bar' }]}
            xAxis={[{ disableTicks: true, disableLine: true, scaleType: 'band', data: xLabels }]}
            yAxis={[{ disableTicks: true, disableLine: true, tickLabelStyle: { display: 'none' } }]}
          >
            <BarPlot />
          </BarChart>
        </div>
      </div>

      <p className="text-gray-600 text-center font-medium mb-10">
        Calculations are based on the number of customers you refer each month and their avg. project volume. <br />
        Factor in our churn rate and this brings you to your estimated total passive future income.
      </p>

      {fetcher.data ? <p>{fetcher.data} ****</p> : <p> nadinnadita</p>}
    </>
  );
}
