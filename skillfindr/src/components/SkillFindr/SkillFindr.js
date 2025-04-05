import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  IconButton,
  Button,
  TextInput,
  Grid,
  Row,
  Column,
  FlexGrid,
} from '@carbon/react';
import { ChatLaunch, ArrowRight, Chat } from '@carbon/icons-react';
import UserResponse from '@/components/UserResponse/UserResponse';
import ChatResponse from '@/components/ChatResponse/ChatResponse';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isMounted) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.reply, animated: false },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <FlexGrid condensed>
      <Column>
        {!isOpen && (
          //button for skillfindr chatbot
          <IconButton
            renderIcon={ChatLaunch}
            label=""
            iconDescription=""
            hasIconOnly
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 1000,
              justifyContent: 'center',
            }}
          />
        )}
        {isOpen && (
          //chatbot box
          <FlexGrid
            condensed
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '500px',
              height: '550px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              backgroundColor: '#ffffff',
              zIndex: 1000,
              border: '1px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              margin: 0,
              padding: 0,
            }}>
            {/*box header*/}
            <Row
              style={{
                margin: 0,
                padding: 0,
              }}>
              <Column
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem 1rem',
                  backgroundColor: '#f4f4f4',
                }}>
                <span>
                  <h6>Powered by AI</h6>
                  <h4
                    style={{
                      margin: 0,
                    }}>
                    SkillFindr
                  </h4>
                </span>

                <Button
                  kind="ghost"
                  size="small"
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    padding: '0 1rem',
                    alignItems: 'center',
                  }}>
                  ✕
                </Button>
              </Column>
            </Row>

            {/* Chat history */}
            <Column style={{ overflow: 'auto', padding: '1rem', flex: 1 }}>
              {messages.map((msg, i) =>
                msg.role === 'user' ? (
                  <UserResponse key={i} user_response={msg.content} />
                ) : (
                  <ChatResponse
                    key={i}
                    chat_response={msg.content}
                    animate={!msg.animated}
                    onAnimationComplete={() => {
                      // mark message as animated after animation finishes
                      setMessages((prev) =>
                        prev.map((m, idx) =>
                          idx === i ? { ...m, animated: true } : m
                        )
                      );
                    }}
                  />
                )
              )}
              {loading && <ChatResponse chat_response="Thinking..." />}
            </Column>

            {/* user input */}
            <Row
              condensed
              style={{
                margin: 0,
                padding: 0,
                marginTop: 'auto',
              }}>
              <Column style={{ margin: 0, padding: 0 }}>
                <Grid
                  condensed
                  style={{
                    padding: '1rem',
                    borderTop: '1px solid #e0e0e0',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Column
                    style={{
                      flex: 1,
                      margin: 0,
                      padding: 0,
                    }}>
                    <TextInput
                      id="chat-input"
                      size="lg"
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMessage();
                      }}
                    />
                  </Column>
                  <Column
                    style={{
                      flex: '0 0 auto',
                      margin: 0,
                      padding: 0,
                    }}>
                    <IconButton
                      renderIcon={ArrowRight}
                      label="Send"
                      onClick={sendMessage}
                    />
                  </Column>
                </Grid>
              </Column>
            </Row>
          </FlexGrid>
        )}
      </Column>
    </FlexGrid>,
    document.body
  );
};

export default ChatbotPopup;
