import React from 'react';
import { ToastProps } from './types';

const toastColors: Record<string, string> = {
  success: '#4caf50',
  error: '#f44336',
  info: '#2196f3',
  warning: '#ff9800'
};

interface Props extends ToastProps {
  onClose: () => void;
}

export const Toast = ({ message, type = 'info', onClose }: Props) => {
  return (
    <div
      style={{
        background: toastColors[type],
        color: '#fff',
        padding: '12px 18px',
        borderRadius: '8px',
        marginBottom: '8px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '220px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease'
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        ×
      </button>
    </div>
  );
};
