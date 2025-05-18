import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  UserCircle, MessageSquare, Pill, Atom, ClipboardCheck, 
  Home, Settings, HelpCircle, ChevronRight, ChevronDown,
  History, Calendar, X
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Close sidebar on route change in mobile view
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // eslint-disable-line

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpand = (key: string) => {
    if (expanded === key) {
      setExpanded(null);
    } else {
      setExpanded(key);
    }
  };

  const navItems = [
    { 
      title: 'Dashboard', 
      icon: <Home size={20} />, 
      path: '/' 
    },
    { 
      title: 'Patient Intake', 
      icon: <UserCircle size={20} />, 
      path: '/patient-intake' 
    },
    { 
      title: 'Medical Chatbot', 
      icon: <MessageSquare size={20} />, 
      path: '/chatbot' 
    },
    { 
      title: 'Drug Recommendations', 
      icon: <Pill size={20} />, 
      path: '/drug-dashboard' 
    },
    { 
      title: 'Quantum Simulations', 
      icon: <Atom size={20} />, 
      path: '/simulation-viewer' 
    },
    { 
      title: 'Doctor Review', 
      icon: <ClipboardCheck size={20} />, 
      path: '/doctor-review' 
    },
    {
      title: 'Appointments',
      icon: <Calendar size={20} />,
      path: '/appointments'
    }
  ];

  const secondaryItems = [
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { title: 'Help & Support', icon: <HelpCircle size={20} />, path: '/support' }
  ];

  const recentPatients = [
    { id: 'P-1234', name: 'Sarah Johnson', condition: 'Hypertension' },
    { id: 'P-5678', name: 'Michael Chen', condition: 'Type 2 Diabetes' },
    { id: 'P-9012', name: 'Emily Rodriguez', condition: 'Rheumatoid Arthritis' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border-r overflow-y-auto
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-700"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="p-4 pt-8 lg:pt-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                  ${isActive 
                    ? (isDarkMode ? 'bg-cyan-700 text-white' : 'bg-cyan-50 text-cyan-700')
                    : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                  }
                `}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-8">
            <div 
              className="flex items-center justify-between cursor-pointer px-3 py-2 text-sm font-medium text-gray-500"
              onClick={() => toggleExpand('patients')}
            >
              <span>RECENT PATIENTS</span>
              {expanded === 'patients' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            
            {expanded === 'patients' && (
              <div className="mt-1 pl-3 space-y-1">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="space-y-1">
                    <NavLink
                      to={`/patient/${patient.id}`}
                      className={`
                        flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors
                        ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        patient.condition === 'Hypertension' ? 'bg-amber-500' :
                        patient.condition === 'Type 2 Diabetes' ? 'bg-purple-500' : 'bg-cyan-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-xs text-gray-500">{patient.condition}</div>
                      </div>
                    </NavLink>
                    <NavLink
                      to={`/patient/${patient.id}/history`}
                      className={`
                        flex items-center gap-2 px-3 py-1 text-xs rounded-md transition-colors ml-4
                        ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}
                      `}
                    >
                      <History size={14} />
                      View History
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            {secondaryItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm
                  ${isActive 
                    ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900')
                    : (isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
                  }
                `}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;