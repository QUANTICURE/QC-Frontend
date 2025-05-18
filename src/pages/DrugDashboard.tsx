import React from 'react';
import DrugDashboard from '../components/drugs/DrugDashboard';

const DrugDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Drug Recommendations</h1>
      <DrugDashboard />
    </div>
  );
};

export default DrugDashboardPage;