import React from 'react';
import { Button } from '@carbon/react';

// rendering a small tertiary button for a tag, triggers onClick with the tag label
const Tag = ({ label, onClick }) => (
  <Button kind="tertiary" size="sm" onClick={() => onClick(label)}>
    {label}
  </Button>
);

export default Tag;
