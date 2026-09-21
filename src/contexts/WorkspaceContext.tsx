import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface WorkspaceContextType {
  hasActiveFile: boolean;
  setHasActiveFile: (active: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  hasActiveFile: false,
  setHasActiveFile: () => {}
});

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasActiveFile, setHasActiveFile] = useState(false);
  const location = useLocation();

  // Reset active file state whenever user navigates to another page
  useEffect(() => {
    setHasActiveFile(false);
  }, [location.pathname]);

  // Synchronize with document.body class and data attribute for global CSS styling
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (hasActiveFile) {
        document.body.classList.add('has-active-media-file');
        document.body.setAttribute('data-has-active-file', 'true');
      } else {
        document.body.classList.remove('has-active-media-file');
        document.body.removeAttribute('data-has-active-file');
      }
    }
  }, [hasActiveFile]);

  return (
    <WorkspaceContext.Provider value={{ hasActiveFile, setHasActiveFile }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
