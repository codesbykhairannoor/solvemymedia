import React, { useRef } from 'react';
import { Calendar, Clock, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface ModernDateTimePickerProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  color?: string;
  placeholder?: string;
}

export const ModernDateTimePicker: React.FC<ModernDateTimePickerProps> = ({
  value,
  onChange,
  label,
  color = '#eab308',
  placeholder
}) => {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  // Convert standard "YYYY-MM-DD HH:mm:ss" to datetime-local "YYYY-MM-DDTHH:mm"
  const toLocalFormat = (str: string): string => {
    if (!str) return '';
    const clean = str.trim().replace(' ', 'T');
    if (clean.length >= 16) return clean.slice(0, 16);
    if (clean.length === 10) return `${clean}T12:00`;
    if (clean.length === 4) return `${clean}-01-01T12:00`;
    return '';
  };

  // Convert "YYYY-MM-DDTHH:mm" back to "YYYY-MM-DD HH:mm:00"
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!raw) {
      onChange('');
      return;
    }
    const formatted = raw.replace('T', ' ') + ':00';
    onChange(formatted);
  };

  // Preset: Set to current Date and Time
  const setNow = () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const y = now.getFullYear();
    const m = pad(now.getMonth() + 1);
    const d = pad(now.getDate());
    const h = pad(now.getHours());
    const min = pad(now.getMinutes());
    const s = pad(now.getSeconds());
    onChange(`${y}-${m}-${d} ${h}:${min}:${s}`);
  };

  const clearValue = () => {
    onChange('');
  };

  const openPicker = () => {
    if (inputRef.current) {
      if (typeof (inputRef.current as any).showPicker === 'function') {
        (inputRef.current as any).showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            <Calendar size={13} color={color} />
            <span>{label}</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              onClick={setNow}
              title={t('dateTimeNowBtn') || 'Set ke Waktu Sekarang'}
              style={{
                background: 'rgba(234, 179, 8, 0.1)',
                color: color,
                border: '1px solid rgba(234, 179, 8, 0.25)',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.2s'
              }}
            >
              <Clock size={11} />
              <span>{t('dateTimeNowBtn') || 'Sekarang'}</span>
            </button>
            {value && (
              <button
                type="button"
                onClick={clearValue}
                title={t('dateTimeClearBtn') || 'Hapus Waktu'}
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '2px 6px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <RotateCcw size={10} />
                <span>{t('dateTimeClearBtn') || 'Reset'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modern Datetime Input Container */}
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-app)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: '2px 8px 2px 34px',
          transition: 'border-color 0.2s',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
        }}
      >
        <button
          type="button"
          onClick={openPicker}
          title={t('dateTimeHelper') || 'Buka Kalender & Jam'}
          style={{ 
            position: 'absolute', 
            left: 6, 
            top: '50%', 
            transform: 'translateY(-50%)', 
            background: 'none',
            border: 'none',
            padding: 4,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            transition: 'opacity 0.2s'
          }}
        >
          <Calendar 
            size={16} 
            color={color} 
          />
        </button>
        
        <input
          ref={inputRef}
          type="datetime-local"
          value={toLocalFormat(value)}
          onChange={handleInputChange}
          placeholder={placeholder || 'YYYY-MM-DDTHH:mm'}
          style={{
            width: '100%',
            padding: '6px 0',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
            fontWeight: 500,
            outline: 'none',
            fontFamily: 'inherit',
            cursor: 'pointer',
            colorScheme: 'dark light'
          }}
        />
      </div>
    </div>
  );
};
