import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Star } from 'lucide-react';
import { useLanguage } from '../../../../../hooks/useLanguage';

export const SlowDownMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      py: { xs: 8, md: 12 },
      px: 3,
      textAlign: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, px: 2, py: 0.5, borderRadius: '50px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Star size={16} color="#4ade80" />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#4ade80' }}>
            {data.bespokeData?.heroTags?.[0] || 'Premium Tool'}
          </Typography>
        </Box>
        <Typography component="h1" sx={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          lineHeight: 1.1,
          mb: 3,
          background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.7))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {data.h1}
        </Typography>
        <Typography sx={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.8)', mb: 5, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
          {data.description}
        </Typography>
        <Button variant="contained" size="large" sx={{
          background: '#4ade80',
          color: '#000',
          fontWeight: 800,
          px: 5,
          py: 2,
          fontSize: '1.2rem',
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          '&:hover': { background: '#fff', transform: 'translateY(-2px)' },
          transition: 'all 0.2s'
        }}>
          Start Converting Now
        </Button>
      </Container>
    </Box>
  );
};
