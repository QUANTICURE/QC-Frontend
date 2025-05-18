import React from 'react';
import PatientForm from '../components/patient/PatientForm';

const PatientIntake: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patient Data Intake</h1>
      <PatientForm />
    </div>
  );
};

export default PatientIntake;