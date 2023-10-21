// screens/EmotionRatingScreen.js
import React from 'react';
import { View, Text, Slider, Button, StyleSheet } from 'react-native';

export default EmotionRatingScreen = ({ route, navigation }) => {
  const { emotions } = route.params; // These are the emotions from your ML model

  // You could map over your emotions, creating sliders for each
  // For simplicity, we'll assume just one here

  return (
    <View style={styles.screen}>
      <Text>Adjust your emotion ratings:</Text>
      {Object.keys(emotions).map((emotion) => (
        <View key={emotion} style={styles.sliderContainer}>
          <Text>{emotion}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={emotions[emotion]}
            onValueChange={(newValue) => {
              // update the corresponding emotion rating
            }}
          />
          <Text>{emotions[emotion]}</Text>
        </View>
      ))}
      <Button title="Confirm" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
});
