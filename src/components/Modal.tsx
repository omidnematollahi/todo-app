import React from 'react';
import { BaseButton } from '~components/ui/BaseButton';

type Props = {
  open: boolean;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({
  open,
  title,
  children,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-4 w-full h-full max-w-lg max-h-[250px] flex flex-col">
        <h3 className="font-semibold mb-2 border-b pb-2">{title}</h3>
        <div className="mb-4 grow">{children}</div>
        <div className="flex gap-2 justify-end">
          <BaseButton className="px-3 py-1 rounded border" onClick={onCancel}>
            Cancel
          </BaseButton>
          <BaseButton
            className="px-3 py-1 rounded bg-red-500 text-white"
            onClick={onConfirm}
          >
            Delete
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
