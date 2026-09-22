import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isValidLanguageCode } from '../i18n/languages';
import { getStandardSlug } from '../i18n/slugs';

interface WorkspaceContextType {
  hasActiveFile: boolean;
  setHasActiveFile: (active: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  hasActiveFile: false,
  setHasActiveFile: () => {}
});

function getToolIdFromPathname(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  let candidate = segments[0];
  let lang = 'en';
  if (isValidLanguageCode(candidate)) {
    lang = candidate;
    candidate = segments[1] || '';
  }
  if (!candidate) return null;
  const nonToolRoutes = ['about-us', 'privacy-policy', 'terms-of-service', 'security', 'pricing', 'compare', 'supported-languages'];
  if (nonToolRoutes.includes(candidate)) return null;
  return getStandardSlug(candidate, lang);
}

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasActiveFile, setHasActiveFile] = useState(false);
  const location = useLocation();
  const previousToolRef = useRef<string | null>(getToolIdFromPathname(location.pathname));

  // Only reset active file state if user navigates to a different tool or away to home/legal pages
  useEffect(() => {
    const currentTool = getToolIdFromPathname(location.pathname);
    if (previousToolRef.current !== currentTool) {
      previousToolRef.current = currentTool;
      setHasActiveFile(false);
    }
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

