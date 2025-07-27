import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastProps } from './types';

interface NotifyContextProps {
  notify: (message: string, options?: Partial<ToastProps>) => void;
  remove: (id: string) => void;
  toasts: ToastProps[];
}

const NotifyContext = createContext<NotifyContextProps | undefined>(undefined);

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) throw new Error('useNotify must be used within NotifyProvider');
  return context;
};

export const NotifyProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const notify = (message: string, options: Partial<ToastProps> = {}) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastProps = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 4000,
      position: options.position || 'top-right'
    };
    setToasts((prev) => [...prev, toast]);

    // Auto remove after duration
    setTimeout(() => remove(id), toast.duration);
  };

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <NotifyContext.Provider value={{ notify, remove, toasts }}>
      {children}
    </NotifyContext.Provider>
  );
};
