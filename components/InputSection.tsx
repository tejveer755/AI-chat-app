import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import * as Haptics from "expo-haptics";

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
  const [recognizing, setRecognizing] = useState(false);
  const [speechIndicator] = useState(new Animated.Value(1));

  const handleStart = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
    });
  };

  useSpeechRecognitionEvent("start", () => {
    setRecognizing(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(speechIndicator, { toValue: 1.3, duration: 500, useNativeDriver: true }),
        Animated.timing(speechIndicator, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  });

  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);
    speechIndicator.setValue(1);
  });

  useSpeechRecognitionEvent("result", (event) => {
    setMessage(event.results[0]?.transcript);
  });

  const handleCancel = () => {
    setMessage("");
    setRecognizing(false);
    speechIndicator.setValue(1);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.inputAreaWrapper}
    >
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
          editable={!recording}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        {recognizing ? (
          <View style={styles.listeningContainer}>
            <Text style={styles.listeningText}>Listening...</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <MaterialIcons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.sendButton} onPress={handleGetResponse}>
              <MaterialIcons name="send" size={24} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.voiceButton} onPress={handleStart}>
              <Animated.View style={{ transform: [{ scale: speechIndicator }] }}>
                <MaterialIcons name="keyboard-voice" size={28} color="#ffffff" />
              </Animated.View>
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
    marginVertical: 10,
    marginHorizontal: 12,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#2C2C2C",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    minHeight: 85,
  },
  textInput: {
    flex: 1,
    color: "#ffffff",
    backgroundColor: "#3A3A3A",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 18,
    maxHeight: 150,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#3E3E3E",
    padding: 12,
    borderRadius: 28,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceButton: {
    backgroundColor: "#3E3E3E",
    padding: 12,
    borderRadius: 28,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  listeningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  listeningText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    padding: 6,
    borderRadius: 16,
  },
});
