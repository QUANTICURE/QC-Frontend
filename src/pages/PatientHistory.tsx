import React from 'react';
import { useParams } from 'react-router-dom';
import { History as Timeline, Calendar, FileText, Pill, Activity, AlertTriangle, ArrowLeft } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

interface HistoryEvent {
  id: string;
  date: string;
  type: 'visit' | 'prescription' | 'lab' | 'condition' | 'alert';
  title: string;
  description: string;
}

const PatientHistory: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // In a real application, you would fetch the patient's history based on the ID
  const history: HistoryEvent[] = [
    {
      id: 'h1',
      date: '2024-03-15',
      type: 'visit',
      title: 'Rheumatology Consultation',
      description: 'Initial assessment of joint pain and stiffness. Diagnosed with Rheumatoid Arthritis.'
    },
    {
      id: 'h2',
      date: '2024-03-15',
      type: 'lab',
      title: 'Laboratory Tests',
      description: 'RF, Anti-CCP, and CRP levels tested. All markers elevated.'
    },
    {
      id: 'h3',
      date: '2024-03-01',
      type: 'prescription',
      title: 'Medication Started',
      description: 'Started on Amlodipine 5mg daily for hypertension.'
    },
    {
      id: 'h4',
      date: '2024-02-15',
      type: 'condition',
      title: 'New Symptom Reported',
      description: 'Patient reported increasing morning stiffness and joint pain.'
    },
    {
      id: 'h5',
      date: '2024-02-01',
      type: 'alert',
      title: 'Allergic Reaction',
      description: 'Documented allergy to Penicillin - moderate reaction.'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Calendar className="text-blue-500" size={20} />;
      case 'lab':
        return <Activity className="text-purple-500" size={20} />;
      case 'prescription':
        return <Pill className="text-green-500" size={20} />;
      case 'condition':
        return <FileText className="text-orange-500" size={20} />;
      case 'alert':
        return <AlertTriangle className="text-red-500" size={20} />;
      default:
        return <Timeline className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="outline"
            className="mb-2"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => window.history.back()}
          >
            Back to Patient
          </Button>
          <h1 className="text-3xl font-bold">Patient History</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Patient ID: {id}</p>
        </div>
      </div>
      
      <Card 
        title="Timeline" 
        className="mb-8 transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20"
      >
        <div className="space-y-8">
          {history.map((event, index) => (
            <div key={event.id} className="relative group">
              {index !== history.length - 1 && (
                <div className="absolute top-8 left-[1.65rem] bottom-0 w-px bg-gray-200 dark:bg-gray-700 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-600 transition-colors" />
              )}
              <div className="flex items-start space-x-4">
                <div className="bg-white dark:bg-gray-800 rounded-full p-2 relative z-10 shadow-md transition-transform group-hover:scale-110 group-hover:shadow-cyan-100 dark:group-hover:shadow-cyan-900/30">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md dark:group-hover:shadow-cyan-900/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                      {event.date}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card 
          title="Conditions"
          className="transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20"
        >
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-cyan-900/20">
              <div className="flex items-center">
                <Activity size={18} className="text-red-500 mr-3" />
                <div>
                  <span className="font-medium">Rheumatoid Arthritis</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Primary Condition</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">2024-03-15</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Diagnosed</p>
              </div>
            </li>
            <li className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-cyan-900/20">
              <div className="flex items-center">
                <Activity size={18} className="text-orange-500 mr-3" />
                <div>
                  <span className="font-medium">Hypertension</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Secondary Condition</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">2023-12-01</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Diagnosed</p>
              </div>
            </li>
            <li className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-cyan-900/20">
              <div className="flex items-center">
                <Activity size={18} className="text-yellow-500 mr-3" />
                <div>
                  <span className="font-medium">Hyperlipidemia</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Secondary Condition</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">2023-11-15</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Diagnosed</p>
              </div>
            </li>
          </ul>
        </Card>
        
        <Card 
          title="Allergies & Alerts"
          className="transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-red-900/20"
        >
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-red-900/20">
              <div className="flex items-center">
                <AlertTriangle size={18} className="text-red-500 mr-3" />
                <div>
                  <span className="font-medium text-red-700 dark:text-red-300">Penicillin</span>
                  <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">High Risk - Avoid Use</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                Severe
              </span>
            </li>
            <li className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-red-900/20">
              <div className="flex items-center">
                <AlertTriangle size={18} className="text-red-500 mr-3" />
                <div>
                  <span className="font-medium text-red-700 dark:text-red-300">Sulfa drugs</span>
                  <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">Monitor Closely</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                Moderate
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PatientHistory; 