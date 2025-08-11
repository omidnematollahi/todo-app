import React from 'react';
import { BaseButton } from '~components/ui/BaseButton';
import { TextField } from '~components/ui/TextField';

type Props = {
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
};

export const TodoHeader: React.FC<Props> = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  const buttonClasses = (active: boolean) =>
      active
        ? 'bg-purple-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-1">
      <div className="flex flex-wrap items-center gap-3 justify-end w-full">
        <div className="flex gap-2">
          <span>filters: </span>
          <BaseButton
            className={buttonClasses(filter === 'all')}
            size='xs'
            onClick={() => setFilter('all')}
          >
            All
          </BaseButton>
          <BaseButton
            className={buttonClasses(filter === 'done')}
            size='xs'
            onClick={() => setFilter('done')}
          >
            Done
          </BaseButton>
          <BaseButton
            className={buttonClasses(filter === 'notdone')}
            size='xs'
            onClick={() => setFilter('notdone')}
          >
            Not done
          </BaseButton>
        </div>

        <TextField
          placeholder="Search todos..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="px-3 py-1 border rounded-lg text-sm w-48"
        />
      </div>
    </div>
  );
};
