import React from 'react';
import { Button } from '@carbon/react';

const Tag = ({ label, onClick }) => (
  <Button kind="tertiary" size="sm" onClick={() => onClick(label)}>
    {label}
  </Button>
);

export default Tag;
