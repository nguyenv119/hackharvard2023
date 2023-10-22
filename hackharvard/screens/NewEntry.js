import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { extractEmotions } from '../services/ML'; 
import {useFonts} from 'expo-font';

const NewEntry = () => {
  const [prompt, setPrompt] = useState('');
  const [fontsLoaded] = useFonts({
	'Caudex': require('../assets/fonts/Caudex-Regular.ttf'),
	
});

  const customFont = fontsLoaded ? 'Caudex' : 'Arial';
  const navigation = useNavigation(); 

  const submitPrompt = async () => {
    if (prompt.trim()) {
		try {
			const { detailedResponse, emotionSummary } = await extractEmotions(prompt);
			// // console.log(detailedResponse);
			// console.log(emotionSummary);
			navigation.navigate('EmotionRating', { 
				detailedResponse: detailedResponse,
				emotions: emotionSummary 
			});
		} catch (error) {
			console.error(error);
			Alert.alert('Error', 'There was an error processing your request.'); 
		}
		} else {
		Alert.alert('Input Required', 'Please enter your feelings to proceed.'); 
		}
  };

  return (
		<View style={styles.screen}>
		<TextInput 
			style={[styles.input, { fontFamily: customFont }]} 
			multiline 
			value={prompt} 
			onChangeText={setPrompt} 
			placeholder="How are you feeling today?" 
		/>

		<TouchableOpacity
			style={[styles.customButton, { fontFamily: customFont }]}
			onPress={submitPrompt}
		>
			<Text style={{ fontFamily: customFont }}>Continue</Text>
		</TouchableOpacity>
		{/* <Button title="Submit" onPress={() => submitPrompt()} /> */}
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
		fontFamily: 'Caudex', 
	},
	buttonText: {
		color: 'green', 
		fontSize: 18,
		fontFamily: 'Caudex', 
	},
});

export default NewEntry;