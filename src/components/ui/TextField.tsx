import React, { useMemo } from 'react';

type TextFieldProps = {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  className: string;
  errors?: {
    [key: string]: {
      message: string
    }
  };
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const hasError = useMemo(() => {
    return props.errors ? !!Object.keys(props.errors).length : false;
  }, [props.errors]);

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <input
        {...props}
        type="text"
        id="success"
        className={`${
          hasError
            ? 'bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
            : ''
        } border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 `}
        placeholder={props.placeholder}
      />
      {hasError && props.errors
        ? Object.keys(props.errors).map((error) => (
            <p
              className="mt-2 text-sm text-red-600 dark:text-red-500"
              key={Math.random() * 6}
            >
              <span className="font-medium">
                {props.errors?.[error]?.message}
              </span>
            </p>
          ))
        : ''}
    </div>
  );
};
