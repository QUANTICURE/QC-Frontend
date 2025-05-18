import React from 'react';
import ReviewPanel from '../components/doctor/ReviewPanel';

const DoctorReview: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doctor Review & Approval</h1>
      <ReviewPanel />
    </div>
  );
};

export default DoctorReview;