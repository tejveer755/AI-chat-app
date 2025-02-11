import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ChatLoadingSkeleton = () => {
  const shimmerOpacity = new Animated.Value(0.3);

  // Animation effect for shimmer
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerOpacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Animated.View
          style={[styles.messageBubble, { opacity: shimmerOpacity, width: '80%' }]}
        />
        <Animated.View
          style={[styles.messageBubble,  { opacity: shimmerOpacity , width: '40%'}]}
        />
        <Animated.View
          style={[styles.messageBubble, { opacity: shimmerOpacity , width: '66%'}]}
        />
        <Animated.View
          style={[styles.messageBubble,  { opacity: shimmerOpacity , width: '50%'}]}
        />
        <Animated.View
          style={[styles.messageBubble, { opacity: shimmerOpacity , width: '60%'}]}
        />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
  
  messageContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  messageBubble: {
    backgroundColor: '#515050',
    height: 14,
    borderRadius: 7,
    marginBottom: 6,
  },
  shortBubble: {
    width: '40%',
  },

});

export default ChatLoadingSkeleton;
