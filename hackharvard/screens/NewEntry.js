import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Image, View, Keyboard, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above
import { extractEmotions } from '../services/ML'; // Adjust the import statement to your file structure
import { useFonts } from 'expo-font';
import TextBox from './TextBox';
import Antdesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


const NewEntry = () => {
	const [prompt, setPrompt] = useState('');
	const [padding, setPadding] = useState(0);
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


	const styles = StyleSheet.create({
		screen: {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F2F0E4',
			// position: 'absolute',
			// top: 30,
			// height: '100%',
			// width: '100%',
			flex: 1,
		},
		titleContainer: {
			width: '100%',
			position: 'absolute',
			zIndex: 1,
		},
		title: {
			fontFamily: customFont,
			fontSize: 30,
			color: '#343434',
			// position: 'absolute',
			top: 80,
			left: 30,
		},
		input: {
			width: '80%',
			// borderColor: 'gray',
			borderWidth: 1,
			padding: 10,
			fontFamily: 'Caudex',
		},
		buttonText: {
			color: 'green', // Example text color
			fontSize: 18,
			fontFamily: 'Caudex', // Apply the custom font to the button text
		},
		image: {
			width: 100,
			height: 100,
		},
		arrowContainer: {
			alignItems: 'flex-end',
			backgroundColor: '#F2F0E4',
			borderTopColor: 'black',
			paddingRight: 30,
			paddingBottom: 30,
		}

	});


	return (
		<>


			<View style={styles.titleContainer}>
				<Text style={styles.title}>Add New Journal Entry</Text>
			</View>
			<View style={styles.screen}>

				<TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={Keyboard.dismiss} />
				<TextBox prompt={prompt} setPrompt={setPrompt} customFont={customFont} />

				{/* <Button title="Continue" titleStyle={{ fontFamily: customFont }}  onPress={() => submitPrompt} /> */}
				{/* <View style={styles.container}>
					<Image source={require('../assets/sadness.gif')} style={styles.image} />
				</View> */}

			</View>


			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View >

					<TouchableOpacity
						style={[styles.arrowContainer, { fontFamily: customFont }]}
						onPress={submitPrompt}
					>
						{/* <Antdesign
					name='rightcircleo'
					color='#343434'
					size={70}
				/> */}

						<EvilIcons
							name='arrow-right'
							color='#343434'
							size={70}
						/>

					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView >

		</>

	);
};



export default NewEntry;