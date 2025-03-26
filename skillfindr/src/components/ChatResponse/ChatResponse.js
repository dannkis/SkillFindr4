import React, { useEffect, useState } from 'react';
import { Row, Column } from '@carbon/react';
import { Chat } from '@carbon/icons-react';

const formatText = (text) => {
  if (!text) return '';

  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = escaped.split('\n');
  let html = '';
  let inOl = false;
  let inUl = false;

  for (let line of lines) {
    const trimmed = line.trim();

    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inOl) {
        html += '<ol>';
        inOl = true;
      }
      html += `<li><strong>${trimmed}</strong></li>`;
    } else if (/^[-*]\s+/.test(trimmed)) {
      if (!inUl) {
        html += '<ul>';
        inUl = true;
      }
      html += `<li>${trimmed.replace(/^[-*]\s+/, '')}</li>`;
    } else {
      if (inOl) {
        html += '</ol>';
        inOl = false;
      }
      if (inUl) {
        html += '</ul>';
        inUl = false;
      }
      if (trimmed) {
        html += `<p>${trimmed}</p>`;
      } else {
        html += '<br />';
      }
    }
  }

  if (inOl) html += '</ol>';
  if (inUl) html += '</ul>';

  html = html
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*\*([^\*]+)\*\*\*/g, '<b><i>$1</i></b>')
    .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^\*]+)\*/g, '<i>$1</i>');

  return html;
};

const ChatResponse = ({ chat_response }) => {
  const [isMounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const formatted = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setTime(formatted);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!chat_response) return;

    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      index++;
      setDisplayedText(chat_response.slice(0, index));
      if (index >= chat_response.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [chat_response]);

  if (!isMounted) return null;

  return (
    <Row condensed style={{ margin: 0, padding: '1rem' }}>
      <Column style={{ margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span className="bg-primary">
            <Chat size={25} style={{ margin: '0.5rem' }} className="white" />
          </span>
          <div
            style={{
              marginLeft: '0.75rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#e0e0e0',
            }}>
            <p style={{ margin: 0, fontWeight: 600, marginBottom: '0.25rem' }}>
              SkillFindr {time}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: formatText(displayedText),
              }}
            />
          </div>
        </div>
      </Column>
    </Row>
  );
};

export default ChatResponse;
