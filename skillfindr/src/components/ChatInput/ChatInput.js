import React from 'react';
import { TextInput, Grid, Column, IconButton } from '@carbon/react';
import { ArrowRight, Microphone } from '@carbon/icons-react';
import './_chat-input.scss';

const ChatInput = ({
  input,
  setInput,
  sendMessage,
  startVoiceRecognition,
  isRecording,
}) => {
  return (
    <Grid condensed className="chat-input-grid">
      {/* input field column */}
      <Column className="chat-input__column">
        <TextInput
          id="chat-input"
          size="lg"
          placeholder="Type your message..."
          value={input}
          labelText=""
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
      </Column>

      {/* icon buttons column */}
      <Column className="chat-input__buttons">
        <IconButton
          renderIcon={Microphone}
          iconDescription="microphone icon"
          label="voice input"
          onClick={startVoiceRecognition}
          className="chat-input__microphone-button"
          kind={isRecording ? 'primary' : 'secondary'}
        />
        <IconButton
          renderIcon={ArrowRight}
          iconDescription="send arrow icon"
          label="send"
          onClick={sendMessage}
        />
      </Column>
    </Grid>
  );
};

export default ChatInput;
