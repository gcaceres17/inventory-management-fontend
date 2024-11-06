import React from 'react';

// Componente principal Select
export const Select = ({ children, value, onValueChange, ...props }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="border rounded p-2 w-full"
    {...props}
  >
    {children}
  </select>
);

// Componente para el trigger del select
export const SelectTrigger = ({ children, ...props }) => (
  <div className="relative" {...props}>
    {children}
  </div>
);

// Componente para el contenido del select
export const SelectContent = ({ children }) => (
  <>{children}</>
);

// Componente para cada opción del select
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

// Componente para el valor del select
export const SelectValue = ({ placeholder, ...props }) => (
  <input type="text" placeholder={placeholder} {...props} />
); 