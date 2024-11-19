import React, { useEffect, useCallback } from 'react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function ErrorToast({ message, onClose, duration = 3000 }: ErrorToastProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const timer = window.setTimeout(handleClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, handleClose]);

  return (
    <div 
      className="fixed top-4 right-4 z-[9999] animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
            </svg>
            <p className="font-semibold pr-8">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Fechar mensagem"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}