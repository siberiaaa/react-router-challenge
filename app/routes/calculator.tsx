import { useEffect, useState } from "react";
import type { Route, Info } from './+types/calculator';
import { useFetcher } from 'react-router';
import { Tooltip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import StyledSlider from '../components/slider';
import { type RevenueData } from '../utils/calculate';

const tooltipNewProjects = 'This is the number of new projects each of your referred customer installs on average per month';
const tooltipExistingProjects = 'This is the number of existing projects each of your referred customer already has on average';

export const loader = () => {
  return { customers: 1, newProjects: 10, existingProjects: 300 };
};


export default function Calculator({loaderData}: Route.ComponentProps) {
  const fetcher = useFetcher();

  const { data, submit, state } = useFetcher<Info["actionData"]>();

  const { customers, newProjects, existingProjects } = data || loaderData;

  const [form, setForm] = useState({
    customers,
    newProjects,
    existingProjects,
  });

  const [customersValue, setCustomersValue] = useState<number>(1);
  const [newProjectsValue, setNewProjectsValue] = useState<number>(10);
  const [existingProjectsValue, setExistingProjectsValue] = useState<number>(300);

  const [incomeValue, setIncomeValue] = useState<string>('$0');
  const [barData, setBarData] = useState<RevenueData[]>([]);

  //Control just slider values
  const handleChangeCustomers = (event: Event, newValue: number | number[]) => {
    setCustomersValue(newValue as number);
  };

  const handleChangeNewProjects = (event: Event, newValue: number | number[]) => {
    setNewProjectsValue(newValue as number);
  };

  const handleChangeExistingProjects = (event: Event, newValue: number | number[]) => {
    setExistingProjectsValue(newValue as number);
  };
  //
  
  const handleCalculate = async () => {
    setForm({ ...form, customers: Number(customersValue), newProjects: Number(newProjectsValue), existingProjects: Number(existingProjectsValue) })
  };

  useEffect(() => {
    fetcher.submit({ customers: form.customers, newProjects: form.newProjects, existingProjects: form.existingProjects }, { action: 'calculate', method: 'post' });
  
  }, [form.customers, form.newProjects, form.existingProjects, submit]);

  useEffect(() => {
    if (fetcher.data) {
      const data: RevenueData[] = JSON.parse(fetcher.data);

      setBarData(data);
      setIncomeValue(data[12].revenueLabel);
    }
  }, [fetcher.data]);

  return (
    <>
      <h1 className="text-center text-5xl font-bold leading-tight capitalize">
        Calculate your recurring <br /> passive income
      </h1>
      <div className="flex flex-wrap flex-row justify-evenly text-lg mb-5 items-center ">
        <div className="flex flex-col basis-85 pt-25 ml-5 mr-5">
          <p className="font-medium text-black mb-10 w-80">
            Add in your expected referrals to see how much you could earn as a <strong>Sunvoy Affiliate</strong> in just 1 year
          </p>

          <div className="text-gray-600 text-base font-medium mb-10">
            <div className="flex justify-between">
              <p>Referred Customers per month</p>
              <p>{form.customers}</p>
            </div>

            <StyledSlider value={form.customers} min={1} max={10} onChangeCommitted={handleCalculate} onChange={handleChangeCustomers} className="mb-1" />

            <div className="flex justify-between">
              <p>
                Avg. new projects per month &nbsp;
                <Tooltip title={tooltipNewProjects}>
                  <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5"/>
                </Tooltip>
              </p>
              <p>{form.newProjects}</p>
            </div>

            <StyledSlider value={form.newProjects} min={5} max={50} onChangeCommitted={handleCalculate} onChange={handleChangeNewProjects} className="mb-1" />

            <div className="flex justify-between">
              <p>
                Avg. existing projects &nbsp;
                <Tooltip title={tooltipExistingProjects}>
                  <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5"/>
                </Tooltip>
              </p>
              <p>{form.existingProjects}</p>
            </div>

            <StyledSlider
              value={form.existingProjects}
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
         
  <p className="text-center text-6xl font-bold min-h-[180px]">{incomeValue}</p>

        </div>

        <div className="flex  justify-center basis-250">
          {fetcher.state === 'idle' ? (
            <ResponsiveContainer height={680}>
              <BarChart data={barData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="var(--color-gray-500)" />
                <YAxis domain={[0, 'dataMax + 4950']} hide={true} />

                <Bar maxBarSize={50} dataKey="revenue" offset={50}>
                  {barData.map((entry, index) => (
                    <Cell fill={index != 12 ? 'var(--color-gray-400)' : 'var(--color-green)'} />
                  ))}
                  <LabelList dataKey="revenueLabel" position="top" fill="var(--color-gray-500)" fontWeight={400} dy={-5} fontSizeAdjust={100} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <FontAwesomeIcon icon={faCircleNotch} size="4x"/>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-center font-medium">
        Calculations are based on the number of customers you refer each month and their avg. project volume. <br />
        Factor in our churn rate and this brings you to your estimated total passive future income.
      </p>
    </>
  );
}
