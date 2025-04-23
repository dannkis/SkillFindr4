import React from 'react';
import { Row, Column } from '@carbon/react';
import Tag from './Tag';

// rendering a row of clickable suggestion tags if any are provided
const SuggestionTags = ({ suggestions, onTagClick }) => {
  if (!suggestions?.length) return null;

  return (
    <Row condensed style={{ margin: 0 }}>
      <Column style={{ padding: '0rem 0rem 1rem 1rem', flex: 1 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
          }}>
          {suggestions.map((tag, i) => (
            <Tag key={i} label={tag} onClick={onTagClick} />
          ))}
        </div>
      </Column>
    </Row>
  );
};

export default SuggestionTags;
