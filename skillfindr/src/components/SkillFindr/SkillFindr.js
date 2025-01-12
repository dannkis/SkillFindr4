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

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <FlexGrid condensed>
      <Column>
        {!isOpen && (
          //button for skillfindr
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

            <Column style={{ overflow: 'auto' }}>
              {/*example chatbot responce*/}
              <Row
                condensed
                style={{
                  margin: 0,
                  padding: '1rem',
                }}>
                <Column style={{ margin: 0, padding: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span className="bg-primary">
                      <Chat
                        size={25}
                        style={{ margin: '0.5rem' }}
                        className="white"
                      />
                    </span>
                    <div
                      style={{
                        marginLeft: '0.75rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e0e0e0',
                      }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          marginBottom: '0.25rem',
                        }}>
                        SkillFindr 2:23PM
                      </p>
                      <p style={{ margin: 0 }}>
                        New generative AI capabilities! We are excited to
                        introduce new features that use SkillFindr to enhance
                        and deliver richer, context-aware interactions.
                      </p>
                    </div>
                  </div>
                </Column>
              </Row>

              {/*example user responce*/}
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
                      <p style={{ margin: 0 }}>What's new?</p>
                    </div>
                  </div>
                </Column>
              </Row>
              {/*example chatbot responce*/}
              <Row
                condensed
                style={{
                  margin: 0,
                  padding: '1rem',
                }}>
                <Column style={{ margin: 0, padding: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span className="bg-primary">
                      <Chat
                        size={25}
                        style={{ margin: '0.5rem' }}
                        className="white"
                      />
                    </span>
                    <div
                      style={{
                        marginLeft: '0.75rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e0e0e0',
                      }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          marginBottom: '0.25rem',
                        }}>
                        SkillFindr 2:24PM
                      </p>
                      <p style={{ margin: 0 }}>Nothing new I am afraid.</p>
                    </div>
                  </div>
                </Column>
              </Row>
              {/*example user responce*/}
              <UserResponse user_response="Testing" />
              {/*example chatbot responce*/}
              <Row
                condensed
                style={{
                  margin: 0,
                  padding: '1rem',
                }}>
                <Column style={{ margin: 0, padding: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span className="bg-primary">
                      <Chat
                        size={25}
                        style={{ margin: '0.5rem' }}
                        className="white"
                      />
                    </span>
                    <div
                      style={{
                        marginLeft: '0.75rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e0e0e0',
                      }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          marginBottom: '0.25rem',
                        }}>
                        SkillFindr 2:24PM
                      </p>
                      <p style={{ margin: 0 }}>
                        There is nothing new, thanks for asking!
                      </p>
                    </div>
                  </div>
                </Column>
              </Row>
            </Column>

            {/*user input*/}
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
                      onClick={() => console.log('Message sent')}
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
