import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Lock } from 'lucide-react';

export const MkvToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Box sx={{ background: '#ffffff', py: 10, mb: '80px' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 8,
          alignItems: 'center'
        }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Box sx={{ 
              p: 4, 
              background: 'rgba(0,0,0,0.03)', 
              borderRadius: '24px', 
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px'
            }}>
              <Lock size={100} strokeWidth={1} color="var(--primary-main)" />
            </Box>
          </Box>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Typography component="h2" sx={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, mb: 3 }}>
              {data.bespokeData?.benefitsTitle}
            </Typography>
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', mb: 4 }}>
              {data.bespokeData?.benefitsDesc}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {data.bespokeData?.benefitsItems?.map((item: string, idx: number) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-main)' }} />
                  <Typography sx={{ fontSize: '1.05rem', fontWeight: 600 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
