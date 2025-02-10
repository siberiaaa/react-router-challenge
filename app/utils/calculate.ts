import { REFERRAL_PAYOUT, CHURN_RATE } from "./constants";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']

export interface RevenueData {
    month: string;
    revenue: number;
    revenueLabel: string;
  }

export function RevenueCalculator(customers: number, newProjects: number, existingProjects: number): RevenueData[] {
    const results: RevenueData[] = [];

    let currentMonth : number = new Date().getMonth();
    let currentYear : number = new Date().getFullYear();

    let existingCustomer : number = 0;
    let existingProjectsPerCustomer : number = existingProjects;

    for (let i = 0; i < 13; i++){
      const totalCustomer = existingCustomer + customers;

      const revenue = (totalCustomer * (newProjects * 95 + existingProjectsPerCustomer * 0.25)) * REFERRAL_PAYOUT;
    
      const revenueObj : RevenueData = {
        month: months[currentMonth],
        revenue:parseFloat(revenue.toFixed(2)),
        revenueLabel:`$${parseFloat(revenue.toFixed(2)).toLocaleString('en-US')}`
      }

      if (currentMonth == 0){
        revenueObj.month += ` ${currentYear.toString()}`;
        currentYear += 1;
      }
      else if(i == 0){
        revenueObj.month += ` ${currentYear.toString()}`;
        currentYear += 1;
      } 
      
      existingCustomer = existingCustomer - (existingCustomer * CHURN_RATE) + customers;
      existingProjectsPerCustomer += newProjects;

      if (currentMonth == 11) currentMonth = 0;
      else currentMonth += 1;

      results.push(revenueObj);
    }

    return results;
  }