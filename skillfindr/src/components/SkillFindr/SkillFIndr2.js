import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

const ChatbotPopup = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1000,
      }}
    >
      <button>Chatbot</button>
    </div>,
    document.body
  );
};

export default ChatbotPopup;
