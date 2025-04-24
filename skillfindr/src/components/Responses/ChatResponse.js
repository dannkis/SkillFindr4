import React, { useEffect, useState } from 'react';
import { Row, Column } from '@carbon/react';
import { Bot } from '@carbon/icons-react';
import './_chat-response.scss';

// safely escape and format chat text to HTML
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
      html += trimmed ? `<p>${trimmed}</p>` : '<br />';
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

const ChatResponse = ({
  chat_response,
  animate = false,
  onAnimationComplete,
  container,
}) => {
  const [isMounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const [displayedText, setDisplayedText] = useState(
    animate ? '' : chat_response
  );

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setTime(formattedTime);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!chat_response || !animate) return;

    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      index++;
      const newText = chat_response.slice(0, index);
      setDisplayedText(newText);

      if (container) {
        container.scrollTop = container.scrollHeight;
      }

      if (index >= chat_response.length) {
        clearInterval(interval);
        onAnimationComplete?.();
      }
    }, 5);

    return () => clearInterval(interval);
  }, [chat_response, animate, onAnimationComplete, container]);

  if (!isMounted) return null;

  return (
    <Row condensed className="chat-response-row">
      <Column className="chat-response-column">
        <div className="chat-response-container">
          <span className="icon-container">
            <Bot size={25} className="bot-icon" />
          </span>
          <div className="message-container">
            <p className="message-header">SkillFindr {time}</p>
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
