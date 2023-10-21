import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above
import { extractEmotions } from '../services/ML'; // Adjust the import statement to your file structure
import { useFonts } from 'expo-font';
import TextBox from './TextBox';

const NewEntry = () => {
	const [prompt, setPrompt] = useState('');

	const [fontsLoaded] = useFonts({
		'Caudex': require('../assets/fonts/Caudex-Regular.ttf'),

	});

	const customFont = fontsLoaded ? 'Caudex' : 'Arial';

	const navigation = useNavigation(); // This hook is for navigation

	const submitPrompt = async () => {
		if (prompt.trim()) {
			try {
				const extractedEmotions = await extractEmotions(prompt);
				navigation.navigate('EmotionRating', { emotions: extractedEmotions });
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
			<TextBox prompt={prompt} setPrompt={setPrompt} customFont={customFont} />
			<TouchableOpacity
				style={[styles.customButton, { fontFamily: customFont }]}
				onPress={submitPrompt}
			>
				<Text style={{ fontFamily: customFont }}>Continue</Text>
			</TouchableOpacity>
			{/* <Button title="Continue" titleStyle={{ fontFamily: customFont }}  onPress={() => submitPrompt} /> */}
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
		color: 'green', // Example text color
		fontSize: 18,
		fontFamily: 'Caudex', // Apply the custom font to the button text
	},
});

export default NewEntry;