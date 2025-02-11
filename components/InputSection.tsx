import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type InputAreaProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  recording: boolean;
  handleGetResponse: () => void;
};

const InputSection: React.FC<InputAreaProps> = ({
  message,
  setMessage,
  recording,
  handleGetResponse,
}) => {
  const handleChange = (text: string) => {
    setMessage(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.inputAreaWrapper}
    >
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={handleChange}
          editable={!recording}
        />

        {recording ? (
          <TouchableOpacity style={styles.stopButton}>
            <MaterialIcons name="stop" size={24} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.sendButton} onPress={handleGetResponse}>
              <MaterialIcons name="send" size={24} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.voiceButton}>
              <MaterialIcons name="keyboard-voice" size={24} color="#ffffff" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputSection;

const styles = StyleSheet.create({
  inputAreaWrapper: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1f1f1f',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 8,
    fontSize: 18,
  },
  sendButton: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    borderRadius: 24,
    marginRight: 8,
    elevation: 2,
  },
  voiceButton: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    borderRadius: 24,
    elevation: 2,
  },
  stopButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 24,
    marginRight: 8,
    elevation: 2,
  },
});
