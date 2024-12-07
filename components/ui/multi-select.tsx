"use client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { FormControl } from "./form";


interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  console.log(value)

  

  return (
    <Command className="overflow-visible bg-white">
  <CommandInput 
    placeholder={placeholder} 
    value={inputValue} 
    onValueChange={setInputValue}
    onBlur={() => setOpen(false)}
    onFocus={() => setOpen(true)}
    defaultValue={inputValue}
  />
  
  <div className="mt-2 relative">
    {open && (
     <CommandList>
      <CommandEmpty>No Results found</CommandEmpty>
      <CommandGroup heading="Select Collection" className="w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
        {collections.map((collection) => (
          <CommandItem
            key={collection._id}
            onMouseDown={(e) => e.preventDefault()}
            onSelect={() => {onChange(collection._id)}}
            defaultValue={inputValue}
          >
           {collection.title}
          </CommandItem>
        ))}
      </CommandGroup>
     </CommandList>
    )}
  </div>
   
</Command>

    //  <Select
    //    onValueChange={setInputValue}
    //    value={inputValue}
    //    defaultValue={inputValue}
    //  >
    //   <FormControl className="rounded border-gray-300">
    //     <SelectTrigger>
    //       <SelectValue 
    //        defaultValue={inputValue}
    //        placeholder="Select a collection"
    //       />
    //     </SelectTrigger>
    //   </FormControl>
    //   <SelectContent className="rounded bg-white">
    //     {collections.map((collection) => (
    //       <SelectItem
    //         key={collection._id}
    //         value={collection._id}
    //       >
    //         {collection.title}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    //  </Select>

  )
}

export default MultiSelect