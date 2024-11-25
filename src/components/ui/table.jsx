// src/components/ui/table.js
import React from 'react';

export const Table = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200">
    {children}
  </table>
);

export const TableHead = ({ children }) => (
  <thead className="bg-gray-50">
    {children}
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {children}
  </tbody>
);

export const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);

export const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {children}
  </td>
);