import React from 'react';
import { ArrowRight, AlertTriangle, Waves, Atom, FilePieChart, Pill } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { Link } from 'react-router-dom';

interface Risk {
  type: string;
  level: 'low' | 'medium' | 'high';
}

interface Drug {
  id: string;
  name: string;
  type: string;
  mechanism: string;
  dosage: string;
  efficacyRating: number;
  risks: Risk[];
  interactions: string[];
  quantumConfidence: number;
}

interface DrugCardProps {
  drug: Drug;
}

const DrugCard: React.FC<DrugCardProps> = ({ drug }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEfficacyColor = (rating: number) => {
    if (rating >= 85) return 'success';
    if (rating >= 70) return 'primary';
    return 'warning';
  };

  return (
    <Card 
      className="h-full flex flex-col"
      hoverable
    >
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{drug.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{drug.type}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
            <Pill className="text-cyan-600 dark:text-cyan-400" size={20} />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Mechanism:</strong>
            <p className="mt-1">{drug.mechanism}</p>
          </div>
          
          <div className="mt-3 text-sm">
            <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Recommended Dosage:</strong>
            <p className="mt-1 font-medium">{drug.dosage}</p>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">AI Efficacy Rating:</strong>
              <span className="text-sm font-semibold">{drug.efficacyRating}%</span>
            </div>
            <ProgressBar 
              value={drug.efficacyRating} 
              color={getEfficacyColor(drug.efficacyRating)}
              size="md"
            />
            <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Atom size={14} className="mr-1" />
              <span>Quantum Confidence: {drug.quantumConfidence}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Risk Profile:</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {drug.risks.map((risk, index) => (
              <span 
                key={`${risk.type}-${index}`}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(risk.level)}`}
              >
                {risk.level === 'high' && <AlertTriangle size={12} className="mr-1" />}
                {risk.type}
              </span>
            ))}
          </div>
        </div>

        {drug.interactions.length > 0 && (
          <div className="mt-4">
            <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Interactions:</strong>
            <div className="mt-1 text-sm">
              {drug.interactions.map((interaction, index) => (
                <span key={interaction} className="mr-2">
                  {interaction}{index < drug.interactions.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-5 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <Link 
          to={`/simulation-viewer/${drug.id}`}
          className="text-sm text-cyan-600 dark:text-cyan-400 font-medium flex items-center hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
        >
          <Waves size={16} className="mr-1" />
          View Simulation
        </Link>
        
        <Link 
          to={`/drug-details/${drug.id}`}
          className="text-sm text-cyan-600 dark:text-cyan-400 font-medium flex items-center hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
        >
          <FilePieChart size={16} className="mr-1" />
          Full Report
        </Link>
      </div>
    </Card>
  );
};

export default DrugCard;