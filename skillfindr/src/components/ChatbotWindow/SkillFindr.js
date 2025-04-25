// imports react hooks and carbon components
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IconButton, Button, Row, Column, FlexGrid } from '@carbon/react';
import { Bot } from '@carbon/icons-react';

// imports custom components for chat
import UserResponse from '@/components/Responses/UserResponse';
import ChatResponse from '@/components/Responses/ChatResponse';
import SuggestionTags from '../SuggestionTags/SuggestionTags';
import ChatInput from '../ChatInput/ChatInput';

// imports styling
import './_skillfindr.scss';

const SkillFindr = () => {
  // sets up state variables
  const container = document.querySelector('.skillfindr__chat-column');
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am SkillFindr! How can I help you today?',
    },
  ]);

  // handles voice input using web speech API
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

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
  };

  // sets component as mounted on first render
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // prevent rendering if not mounted
  if (!isMounted) return null;

  // sends user message to backend and updates chat history
  const sendMessage = async (msgInput = input) => {
    if (!msgInput.trim()) return;

    const userMessage = { role: 'user', content: msgInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      const suggestionRes = await fetch('/api/suggestions', {
        method: 'POST',
        headers,
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

  // renders chatbot UI via portal
  return ReactDOM.createPortal(
    <FlexGrid condensed>
      <Column>
        {!isOpen && (
          // button for opening the chatbot
          <IconButton
            renderIcon={() => <Bot size={24} />}
            size="lg"
            label=""
            iconDescription="Robot Icon"
            hasIconOnly
            onClick={() => setIsOpen(true)}
            className="skillfindr__toggle-button no-padding center-item"
          />
        )}
        {isOpen && (
          // chatbot container
          <FlexGrid condensed className="skillfindr__container">
            {/* chat header */}
            <Row className="skillfindr__header-row">
              <Column className="skillfindr__header-column">
                <span className="skillfindr__title-wrapper">
                  <h6>Powered by AI</h6>
                  <h4>SkillFindr</h4>
                </span>
                <Button
                  kind="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="skillfindr__close-button">
                  ✕
                </Button>
              </Column>
            </Row>

            {/* chat messages */}
            <Column className="skillfindr__chat-column">
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
                      container={container}
                    />
                    {msg.suggestions?.length > 0 &&
                      msg.content !== 'Thinking...' &&
                      msg.animated && (
                        <SuggestionTags
                          className="skillfindr__suggestion-tags"
                          suggestions={msg.suggestions}
                          onTagClick={(tag) => {
                            if (messages[messages.length - 1].animated) {
                              setInput(tag);
                              sendMessage(tag);
                            }
                          }}
                        />
                      )}
                  </React.Fragment>
                )
              )}
              {loading && <ChatResponse chat_response="Thinking..." />}
            </Column>

            {/* chat input box */}
            <Row condensed className="skillfindr__input-row">
              <Column className="skillfindr__input-column">
                <ChatInput
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  startVoiceRecognition={startVoiceRecognition}
                  isRecording={isRecording}
                  animated={messages[messages.length - 1].animated}
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

export default SkillFindr;
