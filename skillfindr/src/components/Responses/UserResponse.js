import React, { useEffect, useState } from 'react';
import { Row, Column } from '@carbon/react';

// import external styles
import './_user-response.scss';

const UserResponse = ({ user_response }) => {
  const [isMounted, setMounted] = useState(false);

  // handle component mount and unmount for rendering purposes
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // avoid rendering until mounted
  if (!isMounted) return null;

  return (
    <Row condensed className="user-response-row">
      <Column className="user-response-column">
        {/* align bubble to the right */}
        <div className="user-response-wrapper">
          {/* user message bubble */}
          <div className="user-response-bubble">
            <p className="user-response-text">{user_response}</p>
          </div>
        </div>
      </Column>
    </Row>
  );
};

export default UserResponse;
