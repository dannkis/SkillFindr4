import React from 'react';
import { TextInput, Grid, Column, IconButton } from '@carbon/react';
import { ArrowRight, Microphone } from '@carbon/icons-react';

const ChatInput = ({
  input,
  setInput,
  sendMessage,
  startVoiceRecognition,
  isRecording,
}) => {
  return (
    <Grid
      condensed
      style={{
        padding: '1rem',
        borderTop: '1px solid #e0e0e0',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Column style={{ flex: 1, margin: 0, padding: 0 }}>
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
      <Column style={{ flex: '0 0 auto', margin: 0, padding: 0 }}>
        <IconButton
          renderIcon={ArrowRight}
          label="Send"
          onClick={sendMessage}
        />
        <IconButton
          renderIcon={Microphone}
          label="Voice Input"
          onClick={startVoiceRecognition}
          style={{ marginLeft: '0.5rem' }}
          kind={isRecording ? 'danger' : 'primary'}
        />
      </Column>
    </Grid>
  );
};

export default ChatInput;
