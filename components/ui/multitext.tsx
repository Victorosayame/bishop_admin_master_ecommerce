"use client"

import { useState } from "react";
import { Input } from "./input";
import { Badge } from "./badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("")
  }

  return (
    <>
    <Input 
      className="rounded border-gray-300"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e: any) => setInputValue(e.target.value)}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addValue(inputValue);
        }
      }}
    />

    <div className="flex gap-1 flex-wrap mt-4">
      {value.map((item, index) => (
        <Badge key={index} className="bg-grey-1 text-white rounded-xl border-gray-300 hover:bg-grey-1 hover:text-white">
          {item}
          <button 
            className="ml-1 rounded-full outline-none hover:bg-blue-500"
            onClick={() => onRemove(item)}
          >
            <X className="h-3 w-3"/>
          </button>
        </Badge>
      ))}
    </div>
    </>
  )
}

export default MultiText