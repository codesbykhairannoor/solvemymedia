import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Briefcase } from 'lucide-react';

export const CompressMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Box sx={{ py: 12, background: '#111827', color: 'white', mb: '80px', borderRadius: '40px', mx: { xs: 2, lg: 4 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: '20px', 
          background: 'rgba(255,255,255,0.1)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mx: 'auto',
          mb: 4
        }}>
          <Briefcase size={40} color="#4ade80" />
        </Box>
        <Typography component="h2" sx={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, mb: 3 }}>
          {data.bespokeData?.privacyTitle}
        </Typography>
        <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
          {data.bespokeData?.privacyDesc}
        </Typography>
      </Container>
    </Box>
  );
};
