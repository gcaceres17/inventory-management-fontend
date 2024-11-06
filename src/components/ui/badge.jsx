import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Badge = ({ variant, children }) => {
  const badgeClass = classNames(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    {
      'bg-green-100 text-green-800': variant === 'success',
      'bg-yellow-100 text-yellow-800': variant === 'warning',
      'bg-red-100 text-red-800': variant === 'error',
      'bg-blue-100 text-blue-800': variant === 'info',
    }
  );

  return <span className={badgeClass}>{children}</span>;
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  children: PropTypes.node.isRequired,
};

Badge.defaultProps = {
  variant: 'info',
};

export { Badge }; 