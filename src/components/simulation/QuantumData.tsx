import React from 'react';
import { ArrowRight, AtomIcon, ExternalLink } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';

interface QuantumDataProps {
  drugId?: string;
}

const QuantumData: React.FC<QuantumDataProps> = ({ drugId = 'drug-1' }) => {
  // Mock data for quantum simulations
  const quantumSimulations = [
    {
      id: 'sim1',
      title: 'Binding Affinity Simulation',
      target: 'TNF-α Receptor',
      confidence: 92,
      epochsCompleted: 1000,
      qubits: 64,
      date: '2025-03-15',
      researcher: 'Dr. Sarah Chen',
      methodologyUrl: '#'
    },
    {
      id: 'sim2',
      title: 'Off-target Binding Analysis',
      target: 'Multiple Receptors (n=24)',
      confidence: 87,
      epochsCompleted: 750,
      qubits: 48,
      date: '2025-03-12',
      researcher: 'Dr. Michael Kim',
      methodologyUrl: '#'
    },
    {
      id: 'sim3',
      title: 'Metabolic Pathway Simulation',
      target: 'Liver Enzymes (CYP450)',
      confidence: 81,
      epochsCompleted: 500,
      qubits: 32,
      date: '2025-03-10',
      researcher: 'Dr. James Wilson',
      methodologyUrl: '#'
    }
  ];

  // Mock data for quantum energy states
  const energyStates = [
    { state: 'Ground State (S₀)', energy: -9.42, probability: 0.68 },
    { state: 'First Excited (S₁)', energy: -7.31, probability: 0.22 },
    { state: 'Second Excited (S₂)', energy: -5.17, probability: 0.08 },
    { state: 'Third Excited (S₃)', energy: -2.84, probability: 0.02 }
  ];

  // Mock data for related research papers
  const researchPapers = [
    {
      title: 'Quantum Computing Approaches to Drug-Target Binding Prediction',
      authors: 'Chen, S., Smith, J., Garcia, M.',
      journal: 'Nature Quantum Biology',
      year: '2024',
      doi: '10.1038/nqb.2024.0042'
    },
    {
      title: 'Enhanced Molecular Dynamics through Quantum Circuit Optimization',
      authors: 'Wilson, J., Kim, M., Johnson, A.',
      journal: 'Quantum Chemistry Letters',
      year: '2024',
      doi: '10.1021/qcl.9b01584'
    }
  ];

  return (
    <div className="space-y-6">
      <Card title="Quantum Simulation Metadata">
        <div className="space-y-4">
          {quantumSimulations.map((sim) => (
            <div 
              key={sim.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h3 className="font-medium text-cyan-700 dark:text-cyan-400">{sim.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Target: {sim.target}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {sim.qubits} qubits
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {sim.epochsCompleted} epochs
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Confidence Level:</span>
                  <span className="text-sm font-medium">{sim.confidence}%</span>
                </div>
                <ProgressBar 
                  value={sim.confidence} 
                  color={sim.confidence >= 90 ? 'success' : sim.confidence >= 80 ? 'primary' : 'warning'}
                  size="sm"
                />
              </div>
              
              <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-x-4 gap-y-1">
                <div>Date: {new Date(sim.date).toLocaleDateString()}</div>
                <div>Researcher: {sim.researcher}</div>
                <a 
                  href={sim.methodologyUrl} 
                  className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center"
                >
                  Methodology
                  <ArrowRight size={12} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Quantum Energy States">
          <div className="space-y-3">
            {energyStates.map((state, index) => (
              <div 
                key={index}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-emerald-500' :
                      index === 1 ? 'bg-cyan-500' :
                      index === 2 ? 'bg-purple-500' : 'bg-amber-500'
                    } mr-2`}></div>
                    <span className="font-medium">{state.state}</span>
                  </div>
                  <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {state.energy} eV
                  </span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Probability:</span>
                    <span className="text-xs">{(state.probability * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`${
                        index === 0 ? 'bg-emerald-500' :
                        index === 1 ? 'bg-cyan-500' :
                        index === 2 ? 'bg-purple-500' : 'bg-amber-500'
                      } h-1.5 rounded-full`}
                      style={{ width: `${state.probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <AtomIcon size={18} className="text-cyan-600 dark:text-cyan-400 mr-2" />
            <span>Calculations performed using 128-qubit quantum processor</span>
          </div>
        </Card>
        
        <Card title="Related Research">
          <div className="space-y-4">
            {researchPapers.map((paper, index) => (
              <div 
                key={index}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h3 className="font-medium text-cyan-700 dark:text-cyan-400">{paper.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{paper.authors}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {paper.journal}, {paper.year}
                </p>
                
                <a 
                  href={`https://doi.org/${paper.doi}`}
                  className="mt-2 inline-flex items-center text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOI: {paper.doi}
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            ))}
            
            <a 
              href="#"
              className="block text-center text-sm text-cyan-600 dark:text-cyan-400 hover:underline py-2"
            >
              View all 14 related papers
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuantumData;