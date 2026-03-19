import React from 'react';
import { Search01Icon } from 'hugeicons-react';
import { Input } from '../../components/ui/Input';

export function SearchBar() {
  return (
    <div className="bg-[#F8FAFC] rounded-[2.5rem] p-4 flex flex-col md:flex-row items-end gap-4 w-full max-w-4xl relative z-20">
      <div className="flex-1 w-full text-left">
        <Input id="location" label="Location" placeholder="Where to?" className="bg-white" />
      </div>
      <div className="flex-1 w-full text-left">
        <Input id="date" type="date" label="Date" className="bg-white" />
      </div>
      <div className="flex-1 w-full text-left">
        <Input id="guests" type="number" label="Guests" placeholder="How many?" min={1} className="bg-white" />
      </div>

      <button className="bg-primary rounded-2xl w-[60px] h-[60px] mb-1 flex items-center justify-center shrink-0 hover:bg-blue-600 transition-colors cursor-pointer text-white">
        <Search01Icon className="w-5 h-5" />
      </button>
    </div>
  );
}
