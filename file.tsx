import React, {useRef, useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isFirstOnTop, setIsFirstOnTop] = useState(false);

  const fadeIn = () => {
    // First view comes to front, second goes to back
    setIsFirstOnTop(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Second view comes to front, first goes to back
    setIsFirstOnTop(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.stack}>
          <Animated.View
            style={[
              styles.card,
              styles.firstCard,
              {opacity: fadeAnim},
              isFirstOnTop ? styles.top : styles.bottom,
            ]}>
            <Text style={styles.fadingText}>First View</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.card,
              styles.secondCard,
              {
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
              !isFirstOnTop ? styles.top : styles.bottom,
            ]}>
            <Text style={styles.fadingText}>Second View</Text>
          </Animated.View>
        </View>

        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
          <Button title="Fade Out View" onPress={fadeOut} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    width: '80%',
    aspectRatio: 1,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  firstCard: {
    backgroundColor: 'powderblue',
  },
  secondCard: {
    backgroundColor: 'pink',
  },
  top: {
    zIndex: 2,
    elevation: 2,
  },
  bottom: {
    zIndex: 1,
    elevation: 1,
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default App;
