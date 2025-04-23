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
  cx,
} from '@carbon/react';
import { ArrowRight, Microphone, Bot } from '@carbon/icons-react';
import UserResponse from '@/components/Responses/User/UserResponse';
import ChatResponse from '@/components/Responses/Chat/ChatResponse';
import SuggestionTags from '../SuggestionTags/SuggestionTags';
import ChatInput from '../ChatInput/ChatInput';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

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

      const suggestionRes = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...newMessages,
            { role: 'assistant', content: data.reply },
          ],
        }),
      });
      const suggestionData = await suggestionRes.json();

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.reply,
          animated: false,
          suggestions: suggestionData.tags || [],
        },
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
          //button for the skillfindr chatbot
          <IconButton
            renderIcon={Bot}
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
              height: '650px',
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
                  <React.Fragment key={i}>
                    <ChatResponse
                      chat_response={msg.content}
                      animate={!msg.animated}
                      onAnimationComplete={() => {
                        setMessages((prev) =>
                          prev.map((m, idx) =>
                            idx === i ? { ...m, animated: true } : m
                          )
                        );
                      }}
                    />
                    {msg.suggestions?.length > 0 &&
                      msg.content !== 'Thinking...' &&
                      msg.animated && (
                        <SuggestionTags
                          suggestions={msg.suggestions}
                          onTagClick={(tag) => {
                            setInput(tag);
                            sendMessage();
                          }}
                        />
                      )}
                  </React.Fragment>
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
                <ChatInput
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  startVoiceRecognition={startVoiceRecognition}
                  isRecording={isRecording}
                />
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
