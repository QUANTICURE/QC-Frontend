import React, { useEffect, useRef, useState } from 'react';
import { Maximize, ZoomIn, ZoomOut, RotateCw, Info } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface MoleculeViewerProps {
  moleculeId?: string;
  title?: string;
  description?: string;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  moleculeId = 'molecule-1',
  title = 'Quantum Molecular Simulation',
  description = 'Visualizing drug-protein binding and quantum energy states',
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedAtom, setSelectedAtom] = useState<{
    element: string;
    position: { x: number; y: number; z: number };
    energyLevel: number;
    bondAngle: number;
  } | null>(null);

  useEffect(() => {
    // This would normally initialize a 3D viewer like 3DMol.js
    // For this demo, we'll simulate it with a placeholder
    const initViewer = () => {
      if (viewerRef.current) {
        // Placeholder content - in a real app, this would initialize the 3D viewer
        console.log('Molecule viewer initialized');
      }
    };

    initViewer();

    return () => {
      // Cleanup the viewer if needed
    };
  }, [moleculeId]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch(err => {
          console.error(`Error attempting to exit full-screen mode: ${err.message}`);
        });
    }
  };

  const simulateAtomSelect = () => {
    // Simulate selecting a random atom with quantum data
    const elements = ['Carbon', 'Hydrogen', 'Oxygen', 'Nitrogen', 'Sulfur'];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    setSelectedAtom({
      element: randomElement,
      position: {
        x: parseFloat((Math.random() * 10 - 5).toFixed(2)),
        y: parseFloat((Math.random() * 10 - 5).toFixed(2)),
        z: parseFloat((Math.random() * 10 - 5).toFixed(2)),
      },
      energyLevel: parseFloat((Math.random() * -10).toFixed(2)),
      bondAngle: parseFloat((Math.random() * 180).toFixed(1)),
    });
  };

  const zoomIn = () => {
    // Would normally control the 3D viewer zoom
    console.log('Zoom in');
  };

  const zoomOut = () => {
    // Would normally control the 3D viewer zoom
    console.log('Zoom out');
  };

  const rotate = () => {
    // Would normally control the 3D viewer rotation
    console.log('Rotate');
  };

  return (
    <Card title={title} description={description}>
      <div className="relative">
        <div 
          ref={viewerRef}
          className={`
            aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-950 rounded-lg border border-gray-700
            ${isFullscreen ? 'fixed inset-0 z-50 w-full h-full rounded-none border-0' : ''}
          `}
          onClick={simulateAtomSelect}
        >
          {/* This would be replaced with an actual 3D molecule renderer */}
          {/* For now we'll show a placeholder with a simulated molecule */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4 max-w-md">
              {/* Central atom */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
              
              {/* Surrounding atoms */}
              <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-red-400 rounded-full shadow-md shadow-red-400/50"></div>
              <div className="absolute top-2/3 left-2/3 w-6 h-6 bg-green-400 rounded-full shadow-md shadow-green-400/50"></div>
              <div className="absolute top-2/3 left-1/4 w-5 h-5 bg-purple-400 rounded-full shadow-md shadow-purple-400/50"></div>
              <div className="absolute top-1/4 left-2/3 w-5 h-5 bg-yellow-400 rounded-full shadow-md shadow-yellow-400/50"></div>
              
              {/* Bonds */}
              <div className="absolute top-[40%] left-[35%] w-[20%] h-1 bg-gray-400 transform rotate-12 origin-left"></div>
              <div className="absolute top-[50%] left-[55%] w-[20%] h-1 bg-gray-400 transform rotate-12 origin-left"></div>
              <div className="absolute top-[60%] left-[35%] w-[20%] h-1 bg-gray-400 transform -rotate-30 origin-left"></div>
              <div className="absolute top-[40%] left-[55%] w-[20%] h-1 bg-gray-400 transform -rotate-30 origin-left"></div>
              
              {/* Quantum field visualization */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
              
              {/* Energy level indicators */}
              <div className="absolute top-1/4 right-1/4 w-4 h-1 bg-cyan-400 shadow-sm shadow-cyan-400/50"></div>
              <div className="absolute top-1/3 right-1/4 w-6 h-1 bg-cyan-400 shadow-sm shadow-cyan-400/50"></div>
              <div className="absolute top-1/2 right-1/4 w-3 h-1 bg-cyan-400 shadow-sm shadow-cyan-400/50"></div>
              <div className="absolute top-2/3 right-1/4 w-5 h-1 bg-cyan-400 shadow-sm shadow-cyan-400/50"></div>
            </div>
          </div>
          
          {/* Information overlay */}
          {selectedAtom && (
            <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 text-white text-sm max-w-xs">
              <h4 className="font-medium text-cyan-400">{selectedAtom.element} Atom</h4>
              <div className="mt-1 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Position:</span>
                  <span>
                    x: {selectedAtom.position.x}, 
                    y: {selectedAtom.position.y}, 
                    z: {selectedAtom.position.z}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Energy Level:</span>
                  <span className="text-cyan-400 font-mono">{selectedAtom.energyLevel} eV</span>
                </div>
                <div className="flex justify-between">
                  <span>Bond Angle:</span>
                  <span>{selectedAtom.bondAngle}°</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Control panel */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 ${isFullscreen ? 'fixed' : ''}`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/70 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Maximize size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/70 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800"
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/70 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/70 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800"
            onClick={rotate}
            aria-label="Rotate"
          >
            <RotateCw size={16} />
          </Button>
          
          <Button
            variant={isInfoVisible ? 'primary' : 'outline'}
            size="sm"
            className={`${!isInfoVisible && 'bg-gray-900/70 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800'}`}
            onClick={() => setIsInfoVisible(!isInfoVisible)}
            aria-label={isInfoVisible ? "Hide information" : "Show information"}
          >
            <Info size={16} />
          </Button>
        </div>
      </div>
      
      {isInfoVisible && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <h4 className="font-medium mb-2">Quantum Simulation Details</h4>
          
          <div className="space-y-2">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Simulation Type:</span>
              <span className="ml-2 font-medium">Density Functional Theory (DFT)</span>
            </div>
            
            <div>
              <span className="text-gray-500 dark:text-gray-400">Basis Set:</span>
              <span className="ml-2 font-medium">6-31G(d,p)</span>
            </div>
            
            <div>
              <span className="text-gray-500 dark:text-gray-400">Exchange-Correlation Functional:</span>
              <span className="ml-2 font-medium">B3LYP</span>
            </div>
            
            <div>
              <span className="text-gray-500 dark:text-gray-400">Quantum Processing Units:</span>
              <span className="ml-2 font-medium">128 QPUs</span>
            </div>
            
            <div>
              <span className="text-gray-500 dark:text-gray-400">Binding Energy:</span>
              <span className="ml-2 font-medium">-9.7 kcal/mol</span>
            </div>
            
            <div>
              <span className="text-gray-500 dark:text-gray-400">Calculation Time:</span>
              <span className="ml-2 font-medium">3.2 seconds</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Click on atoms to view quantum state information and bond angles. Hover over bonds to see electron density visualizations.
          </div>
        </div>
      )}
    </Card>
  );
};

export default MoleculeViewer;