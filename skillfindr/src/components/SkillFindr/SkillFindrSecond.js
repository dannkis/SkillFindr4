import React, { useState } from 'react';
import {
  IconButton,
  Button,
  TextInput,
  AILabel,
  AILabelContent,
  Grid,
  FlexGrid,
  Column,
  TextArea,
} from '@carbon/react';
import { ChatLaunch } from '@carbon/icons-react';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div fullWidth condensed>
      <IconButton
        renderIcon={ChatLaunch}
        label=""
        iconDescription=""
        hasIconOnly
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          justifyContent: 'center',
        }}
      ></IconButton>

      {isOpen && (
        <Grid
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
          }}
        >
          <Column sm={16} md={16} lg={16}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#f4f4f4',
              }}
            >
              <span>
                <h6>Powered by AI</h6>
                <h4
                  style={{
                    margin: 0,
                  }}
                >
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
                }}
              >
                ✕
              </Button>
            </div>
          </Column>
          <Column sm={16} md={16} lg={16}>
            <div
              style={{
                padding: '1rem',
                overflowY: 'auto',
                fontSize: '0.875rem',
                color: '#393939',
              }}
            >
              <div
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#0f62fe',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 600,
                  }}
                >
                  S
                </div>
                <div
                  style={{
                    marginLeft: '0.75rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                    }}
                  >
                    SkillFindr 2:23PM
                  </p>
                  <p style={{ margin: 0 }}>
                    New generative AI capabilities! We are excited to introduce
                    new features that use SkillFindr to enhance and deliver
                    richer, context-aware interactions.
                  </p>
                </div>
              </div>
              <div
                style={{
                  marginBottom: '1rem',
                  textAlign: 'right',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0f62fe',
                    color: '#ffffff',
                    borderRadius: '8px',
                  }}
                >
                  <p style={{ margin: 0 }}>What's new?</p>
                </div>
              </div>
            </div>
          </Column>
          <Column sm={16} md={16} lg={16}>
            <Grid
              condensed
              style={{
                padding: '1rem',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Column sm={12} md={12} lg={12}>
                <TextInput
                  id="chat-input"
                  size="lg"
                  placeholder="Type your message..."
                />
              </Column>
              <Column sm={4} md={4} lg={4}>
                <Button onClick={() => console.log('Message sent')}>
                  Send
                </Button>
              </Column>
            </Grid>
          </Column>
        </Grid>
      )}
    </div>
  );
};

export default ChatbotPopup;
