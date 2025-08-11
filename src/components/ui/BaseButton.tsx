import clsx from 'clsx';
import React from 'react';
import { Loading } from './Loading';

export type BaseButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeClasses = {
  xs: 'px-3 py-1 rounded-full text-sm font-medium',
  sm: 'px-2 py-1 text-sm min-w-[64px] min-h-[22px]',
  md: 'px-4 py-2 text-base max-h-11 min-w-[80px] min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-w-[96px] min-h-[48px]',
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  variant,
  size = 'md',
  className,
  loading,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex whitespace-nowrap items-center cursor-pointer justify-center rounded-md focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variant && variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <Loading size={15} /> : children}
    </button>
  );
};
