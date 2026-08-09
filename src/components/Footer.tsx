import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'var(--bg-app)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 24px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, justifyContent: 'space-between' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-main)', marginBottom: 24 }}>
            <span style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>SolveMyMedia</span>
          </Link>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem', maxWidth: 400 }}>
            The next-generation browser media tools. Compress, convert, edit, and transcribe your media files entirely in your browser without ever sending them to the cloud.
          </p>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 24 }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <li>
              <Link to="/about-us" className="footer-link">About Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
            </li>
            <li>
              <Link to="/security" className="footer-link">Security & Trust</Link>
            </li>
          </ul>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 24 }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <li>
              <Link to="/pricing" className="footer-link">Pricing</Link>
            </li>
            <li>
              <Link to="/compare" className="footer-link">Compare</Link>
            </li>
            <li>
              <Link to="/supported-languages" className="footer-link">Supported Languages</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ maxWidth: 1200, margin: '60px auto 0 auto', borderTop: '1px dashed var(--border-color)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} SolveMyMedia. All rights reserved.
        </div>
      </div>
      
      <style>{`
        .footer-link {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        .footer-link:hover {
          color: var(--brand-primary);
        }
      `}</style>
    </footer>
  );
};
