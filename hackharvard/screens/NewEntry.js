import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Image, View, Keyboard, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above
import { extractEmotions } from '../services/ML'; // Adjust the import statement to your file structure
import { useFonts } from 'expo-font';
import TextBox from './TextBox';
import Antdesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


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
				navigation.navigate('Loading');
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
			flex: 1,
		},
		titleContainer: {
			width: '100%',
			position: 'absolute',
			top: 50,
			zIndex: 1,
		},
		title: {
			fontFamily: customFont,
			fontSize: 30,
			color: '#343434',
			top: 80,
			left: 41,
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
		arrowContainer: {
			alignItems: 'flex-end',
			backgroundColor: '#F2F0E4',
			borderTopColor: 'black',
			paddingRight: 30,
			paddingBottom: 30,
		},
		backContainer: {
			alignItems: 'flex-start',
			backgroundColor: '#F2F0E4',
			paddingLeft: 20,
			paddingTop: 50,
			flexDirection: 'row',
			alignItems: 'center',
		},
		home: {
			fontFamily: customFont,
			fontSize: 25,
			color: '#343434',
			marginLeft: -10,
		},
	});


	return (
		<>
			<View style={styles.backContainer}>
				<EvilIcons
					name='chevron-left'
					color='brown'
					size={55}
				/>
				{/* <Text style={styles.home}>
					Home
				</Text> */}

			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Add New Journal Entry</Text>
			</View>
			<View style={styles.screen}>
				<TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={Keyboard.dismiss} />
				<TextBox prompt={prompt} setPrompt={setPrompt} customFont={customFont} />
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
							color='brown'
							size={70}
						/>

					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView >

		</>
	);
};



export default NewEntry;