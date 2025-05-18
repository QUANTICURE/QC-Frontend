import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, MessageSquare, Pill, Atom, 
  ClipboardCheck, Workflow, Dna, BrainCircuit 
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home: React.FC = () => {
  const modules = [
    {
      title: 'Patient Data Intake',
      description: 'Collect and analyze patient data with AI assistance',
      icon: <UserCircle size={24} className="text-cyan-600" />,
      path: '/patient-intake',
      color: 'bg-cyan-100 dark:bg-cyan-900/30'
    },
    {
      title: 'Medical Chatbot',
      description: 'RAG-powered medical assistant with evidence citations',
      icon: <MessageSquare size={24} className="text-indigo-600" />,
      path: '/chatbot',
      color: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      title: 'Drug Recommendations',
      description: 'AI-generated personalized treatment options',
      icon: <Pill size={24} className="text-emerald-600" />,
      path: '/drug-dashboard',
      color: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    {
      title: 'Quantum Simulations',
      description: 'Interactive 3D molecular binding visualizations',
      icon: <Atom size={24} className="text-purple-600" />,
      path: '/simulation-viewer',
      color: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: 'Doctor Review',
      description: 'Approve treatments and generate patient reports',
      icon: <ClipboardCheck size={24} className="text-amber-600" />,
      path: '/doctor-review',
      color: 'bg-amber-100 dark:bg-amber-900/30'
    }
  ];

  const stats = [
    {
      label: 'Quantum Simulations',
      value: '24,581',
      icon: <Workflow size={20} className="text-purple-500" />,
    },
    {
      label: 'Patients Analyzed',
      value: '8,942',
      icon: <UserCircle size={20} className="text-cyan-500" />,
    },
    {
      label: 'Genetic Markers',
      value: '128K+',
      icon: <Dna size={20} className="text-emerald-500" />,
    },
    {
      label: 'AI Models',
      value: '12',
      icon: <BrainCircuit size={20} className="text-amber-500" />,
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 rounded-xl p-8 shadow-sm">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to <span className="text-cyan-600 dark:text-cyan-400">QuantiCure</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            The next generation of AI-powered personalized medicine, enhanced with quantum computing simulations for optimal treatment selection.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<UserCircle size={20} />}
              as={Link}
              to="/patient-intake"
            >
              New Patient
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<MessageSquare size={20} />}
              as={Link}
              to="/chatbot"
            >
              Medical Assistant
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className={`rounded-lg p-3 ${
                index === 0 ? 'bg-purple-100 dark:bg-purple-900/30' :
                index === 1 ? 'bg-cyan-100 dark:bg-cyan-900/30' :
                index === 2 ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                'bg-amber-100 dark:bg-amber-900/30'
              }`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8">Platform Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Link to={module.path} key={index} className="block h-full">
            <Card className="h-full transition-all hover:shadow-md dark:hover:shadow-none hover:border-cyan-300 dark:hover:border-cyan-700">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${module.color}`}>
                  {module.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{module.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{module.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Treatment approved for <span className="font-medium">Michael Chen</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Doctor: Dr. Sarah Wilson • 10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">New patient data added for <span className="font-medium">Emily Rodriguez</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Entered by: Dr. James Taylor • 43 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Quantum simulation completed for <span className="font-medium">Quantaril</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">128 qubits • 2 hours ago</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="text"
              size="sm"
            >
              View All Activity
            </Button>
          </div>
        </Card>
        
        <Card title="System Status">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-sm font-medium">Quantum Processor</span>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Operational
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Current load: 78%</span>
                <span>128 qubits available</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-sm font-medium">AI Medical Models</span>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Operational
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '52%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Current load: 52%</span>
                <span>12 models active</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm font-medium">Genomic Database</span>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  Maintenance
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Storage: 95%</span>
                <span>Scheduled update: 1h remaining</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-sm text-cyan-800 dark:text-cyan-300">
            <p className="font-medium">System Notification</p>
            <p className="mt-1 text-xs">Scheduled maintenance for database optimization planned for tomorrow at 02:00 UTC. Expected downtime: 30 minutes.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;