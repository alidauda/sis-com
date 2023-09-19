import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function MyToggle({ status }: { status: boolean }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={status}
      className={`${
        status ? 'bg-green-400' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className='sr-only'>Enable notifications</span>
      <span
        className={`${
          status ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
