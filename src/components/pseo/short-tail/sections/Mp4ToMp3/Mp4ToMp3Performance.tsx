import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { HardDrive } from 'lucide-react';

export const Mp4ToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Box sx={{ py: 10, background: '#f1f5f9', mb: '80px' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography component="h2" sx={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, mb: 3 }}>
            {data.bespokeData?.performanceTitle}
          </Typography>
          <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '700px', mx: 'auto' }}>
            {data.bespokeData?.performanceDesc}
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 4 
        }}>
          {data.bespokeData?.performanceItems?.map((item: string, idx: number) => (
            <Box key={idx} sx={{ 
              p: 4, 
              border: '1px solid rgba(0,0,0,0.1)', 
              borderRadius: '16px',
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <Box sx={{ p: 2, background: 'var(--primary-main)', color: 'white', borderRadius: '12px', mb: 3 }}>
                <HardDrive size={24} />
              </Box>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
