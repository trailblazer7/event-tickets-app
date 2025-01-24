import React from 'react';

interface RadioGroupProps {
  options: { label: string; value: string }[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex space-x-4 items-center justify-center min-h-[30px]">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="form-radio text-blue-600"
          />
          <span className="ml-1">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
