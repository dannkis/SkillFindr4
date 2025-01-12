import React, { useEffect, useState } from 'react';
import { Row, Column } from '@carbon/react';

const UserResponse = ({ user_response }) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <Row
      condensed
      style={{
        margin: 0,
        padding: '0 1rem',
      }}>
      <Column style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'end',
          }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0f62fe',
              color: '#ffffff',
            }}>
            <p style={{ margin: 0 }}>{user_response}</p>
          </div>
        </div>
      </Column>
    </Row>
  );
};

export default UserResponse;
