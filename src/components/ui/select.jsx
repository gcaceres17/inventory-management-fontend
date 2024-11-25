import React from 'react';
import {Select, SelectSection, SelectItem} from "@nextui-org/select";

export default function SelectComponent() {
  return (
    <Select
      placeholder="Select an option"
      onChange={(e) => console.log(e.target.value)}
    >
      <SelectSection title="Section 1">
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </SelectSection>
      <SelectSection title="Section 2">
        <SelectItem value="4">Option 4</SelectItem>
        <SelectItem value="5">Option 5</SelectItem>
        <SelectItem value="6">Option 6</SelectItem>
      </SelectSection>
    </Select>
  );
}


