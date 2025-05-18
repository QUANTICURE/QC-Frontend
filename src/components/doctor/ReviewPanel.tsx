import React, { useState } from 'react';
import { 
  CheckCircle, Download, Send, XCircle, Clipboard, MessageSquare, 
  FileText, AlertTriangle, PenSquare, HeartPulse as Pulse, BookOpen,
  Calendar, Beaker, Pill, History, Brain, ChevronDown, Search
} from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface Treatment {
  id: string;
  drugName: string;
  dosage: string;
  duration: string;
  efficacyRating: number;
  warnings: string[];
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
}

interface LabResult {
  id: string;
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low';
  date: string;
}

const ReviewPanel: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: 't1',
      drugName: 'Quantaril',
      dosage: '50mg twice daily',
      duration: '12 weeks',
      efficacyRating: 87,
      warnings: ['Moderate risk of immunosuppression', 'Monitor liver function every 4 weeks'],
      status: 'pending',
      notes: ''
    },
    {
      id: 't2',
      drugName: 'Genolfix',
      dosage: '15mg once daily',
      duration: '8 weeks',
      efficacyRating: 76,
      warnings: ['Increased risk of thrombosis', 'Avoid in patients with history of blood clots'],
      status: 'pending',
      notes: ''
    }
  ]);

  const [labResults] = useState<LabResult[]>([
    {
      id: 'lab1',
      name: 'Rheumatoid Factor',
      value: '45',
      unit: 'IU/mL',
      referenceRange: '< 14',
      status: 'high',
      date: '2024-03-15'
    },
    {
      id: 'lab2',
      name: 'Anti-CCP',
      value: '85',
      unit: 'U/mL',
      referenceRange: '< 20',
      status: 'high',
      date: '2024-03-15'
    },
    {
      id: 'lab3',
      name: 'CRP',
      value: '2.8',
      unit: 'mg/dL',
      referenceRange: '< 0.8',
      status: 'high',
      date: '2024-03-15'
    }
  ]);
  
  const [currentTreatment, setCurrentTreatment] = useState<Treatment>(treatments[0]);
  const [notes, setNotes] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiQuery, setAIQuery] = useState('');
  
  const handleApprove = (treatmentId: string) => {
    setTreatments(treatments.map(t => 
      t.id === treatmentId 
        ? { ...t, status: 'approved', notes: notes } 
        : t
    ));
    setNotes('');
    setShowNote(false);
  };
  
  const handleReject = (treatmentId: string) => {
    setTreatments(treatments.map(t => 
      t.id === treatmentId 
        ? { ...t, status: 'rejected', notes: notes } 
        : t
    ));
    setNotes('');
    setShowNote(false);
  };
  
  const selectTreatment = (treatment: Treatment) => {
    setCurrentTreatment(treatment);
    setNotes('');
    setShowNote(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm">
            <CheckCircle size={12} className="mr-1.5 animate-pulse" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 shadow-sm">
            <XCircle size={12} className="mr-1.5" /> Rejected
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 shadow-sm">
            <AlertTriangle size={12} className="mr-1.5" /> High
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 shadow-sm">
            <AlertTriangle size={12} className="mr-1.5" /> Low
          </span>
        );
      case 'normal':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm">
            <CheckCircle size={12} className="mr-1.5" /> Normal
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 shadow-sm">
            <AlertTriangle size={12} className="mr-1.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      <div className="lg:col-span-1">
        <Card
          title="Patient: Sarah Johnson"
          description="Treatment recommendations requiring review"
          className="mb-8 shadow-lg hover:shadow-outer-glow transition-all duration-300"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="col-span-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Age:</span>
                <span className="float-right font-semibold">42</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Primary Condition:</span>
                <span className="float-right font-semibold">Rheumatoid Arthritis</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Secondary Conditions:</span>
                <span className="float-right font-semibold">Hypertension, Hyperlipidemia</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Allergies:</span>
                <span className="float-right font-semibold">Penicillin, Sulfa drugs</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Current Medications:</span>
                <span className="float-right font-semibold">Amlodipine, Simvastatin</span>
              </div>
            </div>
          
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Genomic Markers:</div>
              <div className="space-y-3">
                <div className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-3 animate-pulse"></div>
                  <div className="text-sm font-medium">HLA-DRB1 (RA risk allele)</div>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mr-3 animate-pulse"></div>
                  <div className="text-sm font-medium">CYP2D6 *4/*4 (Poor metabolizer)</div>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-3 animate-pulse"></div>
                  <div className="text-sm font-medium">MTHFR C677T (Heterozygous)</div>
                </div>
              </div>
            </div>
          
            <div className="mt-6 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Calendar size={16} />}
                className="flex-1"
              >
                Schedule Visit
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<History size={16} />}
                className="flex-1"
              >
                View History
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Lab Results" className="mb-8">
          <div className="space-y-4">
            {labResults.map((result) => (
              <div 
                key={result.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{result.name}</h4>
                    <div className="mt-1 text-sm">
                      <span className="font-semibold">{result.value}</span>
                      <span className="text-gray-500 dark:text-gray-400"> {result.unit}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Reference: {result.referenceRange}
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Beaker size={16} />}
              className="w-full"
            >
              View All Results
            </Button>
          </div>
        </Card>
        
        <Card title="Recommended Treatments">
          <div className="space-y-4">
            {treatments.map((treatment) => (
              <div 
                key={treatment.id}
                className={`p-4 border-2 rounded-xl cursor-pointer transform transition-all duration-200 hover:-translate-y-1 ${
                  currentTreatment.id === treatment.id
                    ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20 dark:border-cyan-600 shadow-cyan-100 dark:shadow-cyan-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => selectTreatment(treatment)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{treatment.drugName}</h3>
                  {getStatusBadge(treatment.status)}
                </div>
                
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {treatment.dosage} for {treatment.duration}
                </div>
                
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400 mr-1">AI Efficacy:</span>
                  <span className={`font-medium ${
                    treatment.efficacyRating >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
                    treatment.efficacyRating >= 70 ? 'text-cyan-600 dark:text-cyan-400' :
                    'text-amber-600 dark:text-amber-400'
                  }`}>
                    {treatment.efficacyRating}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <div className="sticky top-4 space-y-6">
          <Card
            title={`Treatment Review: ${currentTreatment.drugName}`}
            className="mb-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dosage Information</h4>
                  <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    {currentTreatment.dosage} for {currentTreatment.duration}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">AI Efficacy Rating</h4>
                  <div className={`text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex items-center font-medium ${
                    currentTreatment.efficacyRating >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
                    currentTreatment.efficacyRating >= 70 ? 'text-cyan-600 dark:text-cyan-400' :
                    'text-amber-600 dark:text-amber-400'
                  }`}>
                    <Pulse size={16} className="mr-2" />
                    {currentTreatment.efficacyRating}% based on quantum simulations
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Treatment Warnings</h4>
                <div className="space-y-2">
                  {currentTreatment.warnings.map((warning, index) => (
                    <div key={index} className="text-sm flex items-start bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 p-3 rounded-md">
                      <AlertTriangle size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                      <p>{warning}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genomic Compatibility</h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="flex items-start">
                    <div className={`w-4 h-4 rounded-full ${
                      currentTreatment.id === 't1' ? 'bg-emerald-500' : 'bg-amber-500'
                    } mr-2 mt-0.5`}></div>
                    <div>
                      <p className="text-sm font-medium">
                        {currentTreatment.id === 't1'
                          ? 'Optimal genomic compatibility'
                          : 'Moderate genomic compatibility'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {currentTreatment.id === 't1'
                          ? "Patient's HLA-DRB1 variant shows favorable response to TNF-α inhibitors based on quantum binding simulations."
                          : 'CYP2D6 poor metabolizer status may affect drug clearance. Consider lower initial dose with careful monitoring.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<BookOpen size={16} />}
                  >
                    Evidence Base
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Clipboard size={16} />}
                  >
                    Clinical Guidelines
                  </Button>
                </div>
                
                <Button
                  variant={showNote ? 'primary' : 'outline'}
                  size="sm"
                  leftIcon={<PenSquare size={16} />}
                  onClick={() => setShowNote(!showNote)}
                >
                  Add Notes
                </Button>
              </div>
              
              {showNote && (
                <div className="mt-2">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your clinical notes or reasoning for this decision..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800 p-3"
                    rows={4}
                  />
                </div>
              )}
              
              <div className="mt-2 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <Button
                  variant="danger"
                  leftIcon={<XCircle size={18} />}
                  onClick={() => handleReject(currentTreatment.id)}
                >
                  Reject Treatment
                </Button>
                
                <Button
                  variant="success"
                  leftIcon={<CheckCircle size={18} />}
                  onClick={() => handleApprove(currentTreatment.id)}
                >
                  Approve Treatment
                </Button>
              </div>
            </div>
          </Card>
          
          <Card title="AI Medical Assistant" className="mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAIQuery(e.target.value)}
                    placeholder="Ask about drug interactions, treatment guidelines, or patient-specific recommendations..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800 p-2"
                  />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Brain size={16} />}
                >
                  Ask AI
                </Button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Brain size={20} className="text-cyan-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Based on the patient's genomic profile and current medications, here are some key considerations:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <ChevronDown size={16} className="mr-2 mt-1 text-cyan-500" />
                        The patient's HLA-DRB1 variant suggests a good response to TNF-α inhibitors
                      </li>
                      <li className="flex items-start">
                        <ChevronDown size={16} className="mr-2 mt-1 text-cyan-500" />
                        CYP2D6 poor metabolizer status may require dose adjustments
                      </li>
                      <li className="flex items-start">
                        <ChevronDown size={16} className="mr-2 mt-1 text-cyan-500" />
                        Monitor for potential interaction between Quantaril and Amlodipine
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Treatment Report">
            <div className="text-center py-4">
              {treatments.every(t => t.status === 'pending') ? (
                <div className="text-gray-500 dark:text-gray-400">
                  <FileText size={32} className="mx-auto mb-2" />
                  <p>Review and approve treatments to generate final report</p>
                </div>
              ) : treatments.every(t => t.status !== 'pending') ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 p-4 rounded-lg">
                    <CheckCircle size={24} className="mx-auto mb-2" />
                    <p className="font-medium">Treatment plan finalized</p>
                    <p className="text-sm mt-1">All treatments have been reviewed</p>
                  </div>
                  
                  <div className="flex justify-center space-x-3">
                    <Button
                      variant="primary"
                      leftIcon={<Download size={18} />}
                    >
                      Download Report (PDF)
                    </Button>
                    
                    <Button
                      variant="outline"
                      leftIcon={<Send size={18} />}
                    >
                      Send to Patient
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 p-4 rounded-lg">
                  <AlertTriangle size={24} className="mx-auto mb-2" />
                  <p className="font-medium">Treatment plan partially reviewed</p>
                  <p className="text-sm mt-1">Please review all recommended treatments</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;