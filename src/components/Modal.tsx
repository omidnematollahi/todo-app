import React, { useEffect, useState } from 'react';
import { BaseButton } from './ui';

type ModalProps = {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onConfirm, onCancel, children }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm
        ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}
      onClick={onCancel}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 
          w-full max-w-md 
          ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}
        onClick={(e) => e.stopPropagation()} 
      >
          <h3 className='border-b pb-2 mb-2'>{title}</h3>
          {children}
          <div className='flex gap-2 justify-end'>
            <BaseButton className='px3 py-q rounded' onClick={onCancel}>cancel</BaseButton>
            <BaseButton className='px3 py-q rounded bg-red-500 text-white' onClick={onConfirm}>Delete</BaseButton>
          </div>
      </div>
    </div>
  );
};
