import React, { useState } from 'react';
import { Save, Mic, MicOff } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import FileUpload from '../common/FileUpload';
import AIGuidancePanel from './AIGuidancePanel';

interface PatientFormData {
  name: string;
  age: string;
  sex: string;
  weight: string;
  height: string;
  symptoms: string;
  allergies: string;
  medications: string;
  conditions: string;
}

const initialFormData: PatientFormData = {
  name: '',
  age: '',
  sex: '',
  weight: '',
  height: '',
  symptoms: '',
  allergies: '',
  medications: '',
  conditions: '',
};

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [activeField, setActiveField] = useState<keyof PatientFormData | null>(null);
  const { isListening, transcript, startListening, stopListening } = useVoiceInput();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVoiceInput = (field: keyof PatientFormData) => {
    if (isListening && activeField === field) {
      stopListening();
      setFormData(prev => ({
        ...prev,
        [field]: prev[field] + ' ' + transcript
      }));
      setActiveField(null);
    } else {
      setActiveField(field);
      startListening();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Patient data submitted:', formData);
    // Add API call to save patient data
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Add processing logic for lab results and genome data
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card
          title="Patient Data Intake Form"
          description="Enter patient details for personalized medicine recommendations"
          className="mb-6"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-500"
                    onClick={() => handleVoiceInput('name')}
                    aria-label={isListening && activeField === 'name' ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening && activeField === 'name' ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="sex" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sex
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min="0"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    min="0"
                    value={formData.height}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Symptoms
                </label>
                <div className="relative">
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    rows={3}
                    value={formData.symptoms}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    placeholder="Describe current symptoms in detail"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-8 text-gray-400 hover:text-cyan-500"
                    onClick={() => handleVoiceInput('symptoms')}
                    aria-label={isListening && activeField === 'symptoms' ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening && activeField === 'symptoms' ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Known Allergies
                </label>
                <div className="relative">
                  <textarea
                    id="allergies"
                    name="allergies"
                    rows={2}
                    value={formData.allergies}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    placeholder="List any known allergies or 'None'"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-6 text-gray-400 hover:text-cyan-500"
                    onClick={() => handleVoiceInput('allergies')}
                    aria-label={isListening && activeField === 'allergies' ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening && activeField === 'allergies' ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="medications" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Medications
                </label>
                <div className="relative">
                  <textarea
                    id="medications"
                    name="medications"
                    rows={2}
                    value={formData.medications}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    placeholder="List current medications or 'None'"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-6 text-gray-400 hover:text-cyan-500"
                    onClick={() => handleVoiceInput('medications')}
                    aria-label={isListening && activeField === 'medications' ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening && activeField === 'medications' ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medical Conditions
                </label>
                <div className="relative">
                  <textarea
                    id="conditions"
                    name="conditions"
                    rows={2}
                    value={formData.conditions}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800"
                    placeholder="List pre-existing conditions or 'None'"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-6 text-gray-400 hover:text-cyan-500"
                    onClick={() => handleVoiceInput('conditions')}
                    aria-label={isListening && activeField === 'conditions' ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening && activeField === 'conditions' ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <FileUpload
                label="Upload Medical Data"
                helpText="Upload lab results (PDF, CSV) or genetic data (VCF, FASTA). Max 20MB per file."
                maxSize={20}
                multiple={true}
                onChange={handleFileUpload}
              />
            </div>

            <div className="mt-6 text-right">
              <Button 
                type="submit" 
                leftIcon={<Save size={18} />}
              >
                Save Patient Data
              </Button>
            </div>
          </form>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <AIGuidancePanel />
      </div>
    </div>
  );
};

export default PatientForm;