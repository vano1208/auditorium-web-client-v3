import React from 'react';
import { createPortal } from 'react-dom';
import usePortal from './Portal';

type PropTypes = {
id: string
}

const DropdownUsersList: React.FC<PropTypes> = ({ id, children }) => {
  const target: any = usePortal(id);
  return createPortal(
    children,
    target,
  );
};

export default DropdownUsersList;