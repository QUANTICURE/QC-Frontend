import React from 'react';
import MoleculeViewer from '../components/simulation/MoleculeViewer';
import QuantumData from '../components/simulation/QuantumData';

const SimulationViewer: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Quantum Simulation Viewer</h1>
      <MoleculeViewer />
      <QuantumData />
    </div>
  );
};

export default SimulationViewer;