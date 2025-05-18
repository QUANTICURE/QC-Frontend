import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Filter as FilterIcon } from 'lucide-react';
import DrugCard from './DrugCard';
import Button from '../common/Button';
import Card from '../common/Card';

interface Drug {
  id: string;
  name: string;
  type: string;
  mechanism: string;
  dosage: string;
  efficacyRating: number;
  risks: { type: string; level: 'low' | 'medium' | 'high' }[];
  interactions: string[];
  quantumConfidence: number;
}

const mockDrugs: Drug[] = [
  {
    id: 'd1',
    name: 'Quantaril',
    type: 'TNF-α Inhibitor',
    mechanism: 'Selectively binds to TNF-α receptors, blocking inflammatory cascade',
    dosage: '50mg twice daily',
    efficacyRating: 87,
    risks: [
      { type: 'Immunosuppression', level: 'medium' },
      { type: 'Hepatotoxicity', level: 'low' }
    ],
    interactions: ['Methotrexate', 'Corticosteroids'],
    quantumConfidence: 92
  },
  {
    id: 'd2',
    name: 'Genolfix',
    type: 'JAK1/JAK2 Inhibitor',
    mechanism: 'Disrupts JAK-STAT signaling pathway to reduce inflammation',
    dosage: '15mg once daily',
    efficacyRating: 76,
    risks: [
      { type: 'Thrombosis', level: 'medium' },
      { type: 'Infection', level: 'medium' },
      { type: 'Hyperlipidemia', level: 'low' }
    ],
    interactions: ['CYP3A4 inhibitors', 'Probenecid', 'Fluconazole'],
    quantumConfidence: 84
  },
  {
    id: 'd3',
    name: 'Qubitril',
    type: 'IL-6 Receptor Antagonist',
    mechanism: 'Binds to soluble and membrane-bound IL-6 receptors',
    dosage: '200mg weekly subcutaneous injection',
    efficacyRating: 92,
    risks: [
      { type: 'Neutropenia', level: 'medium' },
      { type: 'Elevated liver enzymes', level: 'medium' }
    ],
    interactions: ['Live vaccines', 'Immunosuppressants'],
    quantumConfidence: 95
  },
  {
    id: 'd4',
    name: 'Neurocal-D',
    type: 'Selective Dopamine Modulator',
    mechanism: 'Modulates D2/D3 receptors with quantum-computed binding specificity',
    dosage: '25mg daily, titrate up to 75mg',
    efficacyRating: 82,
    risks: [
      { type: 'Dizziness', level: 'low' },
      { type: 'Sleep disturbances', level: 'medium' }
    ],
    interactions: ['MAO inhibitors', 'SSRIs', 'Alcohol'],
    quantumConfidence: 88
  },
  {
    id: 'd5',
    name: 'Cardioquant',
    type: 'Novel Beta-blocker',
    mechanism: 'Quantum-optimized cardiac β1-receptor antagonist',
    dosage: '10mg once daily',
    efficacyRating: 79,
    risks: [
      { type: 'Bradycardia', level: 'medium' },
      { type: 'Hypotension', level: 'medium' },
      { type: 'Fatigue', level: 'low' }
    ],
    interactions: ['Calcium channel blockers', 'Antiarrhythmics'],
    quantumConfidence: 81
  },
  {
    id: 'd6',
    name: 'Immunodyne',
    type: 'PD-1 Inhibitor',
    mechanism: 'Blocks PD-1 receptor interaction with PD-L1/PD-L2 ligands',
    dosage: '3mg/kg every 2 weeks',
    efficacyRating: 94,
    risks: [
      { type: 'Autoimmune reactions', level: 'high' },
      { type: 'Pneumonitis', level: 'medium' },
      { type: 'Colitis', level: 'medium' }
    ],
    interactions: ['Corticosteroids', 'Other immunotherapies'],
    quantumConfidence: 91
  }
];

const DrugDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('efficacy');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const drugTypes = Array.from(new Set(mockDrugs.map(drug => drug.type)));
  
  const riskLevels = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const filteredDrugs = mockDrugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drug.mechanism.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === '' || drug.type === selectedType;
    
    const matchesRiskLevel = selectedRiskLevels.length === 0 || 
                            drug.risks.some(risk => selectedRiskLevels.includes(risk.level));
    
    return matchesSearch && matchesType && matchesRiskLevel;
  });

  const sortedDrugs = [...filteredDrugs].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'efficacy') {
      comparison = a.efficacyRating - b.efficacyRating;
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'confidence') {
      comparison = a.quantumConfidence - b.quantumConfidence;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const toggleRiskLevel = (level: string) => {
    if (selectedRiskLevels.includes(level)) {
      setSelectedRiskLevels(selectedRiskLevels.filter(l => l !== level));
    } else {
      setSelectedRiskLevels([...selectedRiskLevels, level]);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedRiskLevels([]);
    setSortBy('efficacy');
    setSortOrder('desc');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search drugs by name or mechanism..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        
        <div className="flex space-x-2 self-end md:self-auto">
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filters
          </Button>
          
          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center space-x-1"
              leftIcon={<ArrowUpDown size={16} />}
              onClick={toggleSortOrder}
            >
              <span>
                {sortBy === 'efficacy' ? 'Efficacy' : 
                 sortBy === 'name' ? 'Name' : 
                 'Confidence'}
              </span>
              <span className="text-xs">
                ({sortOrder === 'desc' ? 'High to Low' : 'Low to High'})
              </span>
            </Button>
            
            <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 w-40 hidden">
              <div className="py-1">
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => setSortBy('efficacy')}
                >
                  Efficacy Rating
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => setSortBy('name')}
                >
                  Name
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => setSortBy('confidence')}
                >
                  Quantum Confidence
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isFilterOpen && (
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drug Type</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="all-types"
                    type="radio"
                    checked={selectedType === ''}
                    onChange={() => setSelectedType('')}
                    className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="all-types" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    All Types
                  </label>
                </div>
                
                {drugTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`type-${type}`}
                      type="radio"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Level</h3>
              <div className="space-y-2">
                {riskLevels.map((level) => (
                  <div key={level.value} className="flex items-center">
                    <input
                      id={`risk-${level.value}`}
                      type="checkbox"
                      checked={selectedRiskLevels.includes(level.value)}
                      onChange={() => toggleRiskLevel(level.value)}
                      className="h-4 w-4 text-cyan-600 rounded border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                    />
                    <label htmlFor={`risk-${level.value}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {level.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="sort-efficacy"
                    type="radio"
                    checked={sortBy === 'efficacy'}
                    onChange={() => setSortBy('efficacy')}
                    className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="sort-efficacy" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Efficacy Rating
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sort-name"
                    type="radio"
                    checked={sortBy === 'name'}
                    onChange={() => setSortBy('name')}
                    className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="sort-name" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sort-confidence"
                    type="radio"
                    checked={sortBy === 'confidence'}
                    onChange={() => setSortBy('confidence')}
                    className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="sort-confidence" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Quantum Confidence
                  </label>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    id="sort-order-desc"
                    type="radio"
                    checked={sortOrder === 'desc'}
                    onChange={() => setSortOrder('desc')}
                    className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="sort-order-desc" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    High to Low
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sort-order-asc"
                    type="radio"
                    checked={sortOrder === 'asc'}
                    onChange={() => setSortOrder('asc')}
                    className="h-4 w-4 text-cyan-600 border-gray-300 dark:border-gray-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="sort-order-asc" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Low to High
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="mr-2"
            >
              Reset Filters
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDrugs.map(drug => (
          <DrugCard key={drug.id} drug={drug} />
        ))}
        
        {sortedDrugs.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <FilterIcon size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No drugs match your filters</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugDashboard;