import type { Route } from './+types/calculate-revenue';
import { RevenueCalculator, type RevenueData } from '../utils/calculate';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const customers = parseInt(formData.get('customers'));
  const newProjects = parseInt(formData.get('newProjects'));
  const existingProjects = parseInt(formData.get('existingProjects'));

  const revenue: RevenueData[] = RevenueCalculator(customers, newProjects, existingProjects);

  return JSON.stringify(revenue);
}

export default function Calculator() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  );
}
