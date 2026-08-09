// src/components/workspace/tools/WatermarkControl.tsx
import React, { useRef } from 'react';
import { useTranslation } from "react-i18next";
import { Type, RefreshCw, Layers, Image as ImageIcon, Upload } from 'lucide-react';

export type WatermarkPosition = 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'tiled';

interface WatermarkControlProps {
  watermarkType: 'text' | 'image';
  setWatermarkType: (type: 'text' | 'image') => void;
  watermarkImage: HTMLImageElement | null;
  setWatermarkImage: (img: HTMLImageElement | null) => void;
  watermarkText: string;
  setWatermarkText: (text: string) => void;
  watermarkColor: string;
  setWatermarkColor: (color: string) => void;
  watermarkOpacity: number;
  setWatermarkOpacity: (val: number) => void;
  watermarkPosition: WatermarkPosition;
  setWatermarkPosition: (pos: WatermarkPosition) => void;
  watermarkScale: number;
  setWatermarkScale: (val: number) => void;
  watermarkRotation: number;
  setWatermarkRotation: (val: number) => void;
  onProcessBatch?: () => void;
  onReset: () => void;
  onUploadOther?: () => void;
  isProcessing: boolean;
  batchCount?: number;
}

export const WatermarkControl: React.FC<WatermarkControlProps> = ({
  watermarkType,
  setWatermarkType,
  watermarkImage,
  setWatermarkImage,
  watermarkText,
  setWatermarkText,
  watermarkColor,
  setWatermarkColor,
  watermarkOpacity,
  setWatermarkOpacity,
  watermarkPosition,
  setWatermarkPosition,
  watermarkScale,
  setWatermarkScale,
  watermarkRotation,
  setWatermarkRotation,
  onProcessBatch,
  onReset,
  onUploadOther,
  isProcessing,
  batchCount = 0,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setWatermarkImage(img);
        
      };
      img.src = url;
    }
  };

  const positions: { val: WatermarkPosition; label: string }[] = [
    { val: 'center', label: t('watermark.pos.center') },
    { val: 'bottom-right', label: t('watermark.pos.br') },
    { val: 'bottom-left', label: t('watermark.pos.bl') },
    { val: 'tiled', label: t('watermark.pos.tiled') },
  ];

  return (
    <div className="space-y-6 overflow-y-visible">
      
      {/* Type Selector */}
      <div className="flex bg-dark-800 p-1 rounded-xl">
        <button
          onClick={() => { setWatermarkType('text'); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${watermarkType === 'text' ? 'bg-neon-indigo text-white shadow-glow-indigo' : 'text-slate-400 hover:text-white'}`}
        >
          <Type className="w-4 h-4" /> {t('watermark.type.text')}
        </button>
        <button
          onClick={() => { setWatermarkType('image'); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${watermarkType === 'image' ? 'bg-neon-cyan text-dark-900 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
        >
          <ImageIcon className="w-4 h-4" /> {t('watermark.type.image')}
        </button>
      </div>

      {watermarkType === 'text' ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Type className="w-4 h-4 text-neon-cyan" />
              <span>{t('watermark.textLabel')}</span>
            </div>
          </div>
          <input
            type="text"
            value={watermarkText}
            onChange={(e) => {
              setWatermarkText(e.target.value);
              
            }}
            placeholder="HelpMyIMG.com"
            className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50"
          />
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ImageIcon className="w-4 h-4 text-neon-cyan" />
              <span>{t('watermark.uploadLabel')}</span>
            </div>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 bg-dark-800 border border-dashed border-neon-cyan/50 rounded-xl px-4 py-4 text-sm text-slate-300 hover:bg-dark-700 transition-colors"
          >
            <Upload className="w-5 h-5 text-neon-cyan" />
            <span>{watermarkImage ? t('watermark.changeLogo') : t('watermark.selectLogo')}</span>
          </button>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Advanced Settings: Color, Opacity, Scale, Rotation */}
      <div className="grid grid-cols-2 gap-4">
        {watermarkType === 'text' && (
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-400 block">{t('watermark.color')}</label>
            <div className="flex items-center gap-2 bg-dark-800 border border-dark-600 px-2.5 py-1.5 rounded-xl">
              <input
                type="color"
                value={watermarkColor}
                onChange={(e) => {
                  setWatermarkColor(e.target.value);
                  
                }}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="font-mono text-xs uppercase text-slate-300 font-bold flex-1 text-center">
                {watermarkColor}
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-400 block">
            {t('watermark.opacity')} ({Math.round(watermarkOpacity * 100)}%)
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={watermarkOpacity}
            onChange={(e) => {
              setWatermarkOpacity(parseFloat(e.target.value));
              
            }}
            className="w-full accent-neon-cyan mt-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-400 block">{t('watermark.scale')} ({Math.round(watermarkScale * 100)}%)</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={watermarkScale}
            onChange={(e) => {
              setWatermarkScale(parseFloat(e.target.value));
              
            }}
            className="w-full accent-neon-indigo mt-3"
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-400 block">{t('watermark.rotation')} ({watermarkRotation}°)</label>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={watermarkRotation}
            onChange={(e) => {
              setWatermarkRotation(parseInt(e.target.value));
              
            }}
            className="w-full accent-neon-pink mt-3"
          />
        </div>
      </div>

      {/* Posisi Watermark */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Layers className="w-4 h-4 text-neon-indigo" />
          <span>{t('watermark.position')}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {positions.map((p) => (
            <button
              key={p.val}
              onClick={() => {
                setWatermarkPosition(p.val);
                
              }}
              className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all duration-200 ${
                watermarkPosition === p.val
                  ? 'bg-neon-indigo/20 border-neon-indigo text-neon-indigo font-bold shadow-glow-indigo'
                  : 'bg-dark-800 border-dark-600 text-slate-300 hover:bg-dark-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-dark-600/50">

          {onProcessBatch && batchCount > 1 && (
            <button
              onClick={() => onProcessBatch()}
              disabled={isProcessing || (watermarkType === 'text' ? !watermarkText.trim() : !watermarkImage)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan font-extrabold shadow-sm transition-all duration-200 disabled:opacity-50 border border-neon-cyan/50"
            >
              <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
              <span className="text-xs">{t('watermark.processAll', { count: String(batchCount) }) === 'watermark.processAll' ? `Watermark All (${batchCount})` : t('watermark.processAll', { count: String(batchCount) })}</span>
            </button>
          )}

        {batchCount === 1 && (
          <button
            onClick={onUploadOther || onReset}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 font-medium text-sm transition-colors border border-dark-600"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('editor.reset')}</span>
          </button>
        )}
      </div>
    </div>
  );
};
