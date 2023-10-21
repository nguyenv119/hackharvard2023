// screens/DailyPromptScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewEntryScreen = () => {
  const [prompt, setPrompt] = useState('');
  
  const submitPrompt = async () => {
    if (prompt) {
      try {
        const extractedEmotions = await extractEmotions(prompt); // this is your ML extraction result
        navigation.navigate('EmotionRatingScreen', { emotions: extractedEmotions });
      } catch (error) {
        // handle error
      }
    }
  };

  return (
    <View style={styles.screen}>
      <TextInput 
        style={styles.input} 
        value={prompt} 
        onChangeText={setPrompt} 
        placeholder="How are you feeling today?" 
      />
      <Button title="Submit" onPress={submitPrompt} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default NewEntryScreen;
