import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAI } from '../hooks/useAI';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface AIRecommendation {
  urgency: string;
  specialist: string;
  duration: string;
  preparation: string;
  considerations: string;
}

const AppointmentScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  
  const { getAppointmentAdvice, isLoading, error } = useAI({
    onError: (error) => {
      console.error('AI Service Error:', error);
      // You might want to show an error toast here
    }
  });

  // Simulated patient data - in a real app, this would come from your patient context/state
  const patientData = {
    symptoms: "Increasing joint pain and morning stiffness, particularly in hands and knees. Fatigue and occasional low-grade fever.",
    history: "Diagnosed with Rheumatoid Arthritis (March 2024). Current medications: Amlodipine for hypertension. Known allergies to Penicillin and Sulfa drugs."
  };

  useEffect(() => {
    const getRecommendation = async () => {
      const response = await getAppointmentAdvice(
        patientData.symptoms,
        patientData.history
      );
      
      if (response) {
        // Parse the AI response into structured data
        // This is a simple example - you might want to make this more robust
        const lines = response.split('\n');
        const recommendation: AIRecommendation = {
          urgency: lines.find(l => l.includes('urgency'))?.split(':')[1]?.trim() || '',
          specialist: lines.find(l => l.includes('specialist'))?.split(':')[1]?.trim() || '',
          duration: lines.find(l => l.includes('duration'))?.split(':')[1]?.trim() || '',
          preparation: lines.find(l => l.includes('preparation'))?.split(':')[1]?.trim() || '',
          considerations: lines.find(l => l.includes('considerations'))?.split(':')[1]?.trim() || ''
        };
        setRecommendation(recommendation);
      }
    };

    getRecommendation();
  }, [getAppointmentAdvice]);

  const timeSlots: TimeSlot[] = [
    { id: 't1', time: '09:00 AM', available: true },
    { id: 't2', time: '09:30 AM', available: false },
    { id: 't3', time: '10:00 AM', available: true },
    { id: 't4', time: '10:30 AM', available: true },
    { id: 't5', time: '11:00 AM', available: false },
    { id: 't6', time: '11:30 AM', available: true },
    { id: 't7', time: '02:00 PM', available: true },
    { id: 't8', time: '02:30 PM', available: true },
    { id: 't9', time: '03:00 PM', available: false },
    { id: 't10', time: '03:30 PM', available: true },
  ];

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment scheduled for ${selectedDate} at ${selectedTime}`);
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
            Back
          </Button>
          <h1 className="text-3xl font-bold">Schedule Appointment</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Select your preferred date and time</p>
        </div>
      </div>

      {isLoading ? (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center">
            <Loader2 size={40} className="text-cyan-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Getting AI recommendations...</p>
          </div>
        </Card>
      ) : error ? (
        <Card className="p-8 border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400">
            <p>Failed to get AI recommendations. Please try again later.</p>
          </div>
        </Card>
      ) : recommendation && (
        <Card 
          title="AI Recommendations"
          className="transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20 mb-8"
        >
          <div className="space-y-4">
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h3 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">Appointment Priority</h3>
              <p className="text-cyan-700 dark:text-cyan-300">{recommendation.urgency}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Recommended Specialist</h3>
                <p className="text-gray-600 dark:text-gray-300">{recommendation.specialist}</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Suggested Duration</h3>
                <p className="text-gray-600 dark:text-gray-300">{recommendation.duration}</p>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Preparation Instructions</h3>
              <p className="text-amber-700 dark:text-amber-300">{recommendation.preparation}</p>
            </div>
            
            {recommendation.considerations && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Special Considerations</h3>
                <p className="text-purple-700 dark:text-purple-300">{recommendation.considerations}</p>
              </div>
            )}
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card 
          title="Select Date" 
          className="transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20"
        >
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800 transition-shadow"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {selectedDate && (
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border border-cyan-100 dark:border-cyan-800 animate-fadeIn">
                <div className="flex items-center text-cyan-700 dark:text-cyan-300">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">Selected Date:</span>
                  <span className="ml-2">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        <Card 
          title="Select Time" 
          className={`transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20 ${
            !selectedDate && 'opacity-50 pointer-events-none'
          }`}
        >
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                className={`p-4 rounded-lg border text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                  !slot.available
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60'
                    : selectedTime === slot.time
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-md'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-600 hover:-translate-y-1 hover:shadow-md'
                }`}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Clock size={16} className="mr-2" />
                {slot.time}
                {!slot.available && (
                  <span className="absolute -top-2 right-0 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                    Booked
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>
      
      <Card 
        title="Appointment Details"
        className="transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20"
      >
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <User size={24} className="text-gray-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Sarah Johnson</h3>
              <p className="text-gray-500 dark:text-gray-400">Patient ID: 12345</p>
              <div className="flex items-center mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300">
                  Regular Checkup
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <MapPin size={24} className="text-gray-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">QuantiCure Medical Center</h3>
              <p className="text-gray-500 dark:text-gray-400">123 Quantum Lane, Suite 100</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">San Francisco, CA 94105</p>
            </div>
          </div>
          
          {selectedDate && selectedTime && (
            <div className="flex items-start space-x-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-fadeIn">
              <CheckCircle size={24} className="text-emerald-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-emerald-700 dark:text-emerald-300">Ready to Schedule</h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                </p>
                <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70 mt-2">
                  Estimated duration: 30 minutes
                </p>
              </div>
            </div>
          )}
          
          <Button
            variant="primary"
            className="w-full py-3 text-lg font-medium shadow-lg hover:shadow-cyan-100 dark:hover:shadow-cyan-900/30 transition-all duration-300"
            disabled={!selectedDate || !selectedTime}
            onClick={handleSchedule}
          >
            {selectedDate && selectedTime ? 'Confirm Appointment' : 'Select Date and Time'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentScheduler; 