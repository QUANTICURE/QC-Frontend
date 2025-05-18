import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface Citation {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  url: string;
  text: string;
}

interface CitationsProps {
  citations: Citation[];
  onCitationClick: (citationId: string) => void;
}

const Citations: React.FC<CitationsProps> = ({ citations, onCitationClick }) => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  
  // Remove duplicates based on citation id
  const uniqueCitations = citations.filter((citation, index, self) => 
    index === self.findIndex((c) => c.id === citation.id)
  );
  
  const filteredCitations = uniqueCitations.filter(citation => 
    citation.title.toLowerCase().includes(search.toLowerCase()) ||
    citation.authors.toLowerCase().includes(search.toLowerCase()) ||
    citation.journal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {uniqueCitations.length > 0 ? (
        <>
          <div className={`relative mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 focus:bg-gray-800 text-white' 
                  : 'bg-white focus:bg-white text-gray-900'
              } focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500`}
            />
          </div>
          
          <div className="space-y-3">
            {filteredCitations.length > 0 ? (
              filteredCitations.map((citation) => (
                <div 
                  key={citation.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    isDarkMode 
                      ? 'hover:bg-gray-750 bg-gray-800 border border-gray-700' 
                      : 'hover:bg-gray-100 bg-white border border-gray-200'
                  }`}
                  onClick={() => onCitationClick(citation.id)}
                >
                  <div className="flex items-start">
                    <BookOpen size={16} className="text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-sm">{citation.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{citation.authors}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {citation.journal}, {citation.year}
                      </p>
                      
                      <div className="mt-2 text-xs flex justify-between items-center">
                        <button className="text-cyan-600 dark:text-cyan-400 flex items-center">
                          Read more
                          <ExternalLink size={12} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No citations matching your search
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-10 px-4">
          <BookOpen size={32} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No citations yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Citations from the conversation will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default Citations;