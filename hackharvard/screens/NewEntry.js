import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Image, SafeAreaView, Pressable, View, Keyboard, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above
import { extractEmotions } from '../services/ML'; // Adjust the import statement to your file structure
import { useFonts } from 'expo-font';
import TextBox from '../components/TextBox';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

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
				// const { detailedResponse, emotionSummary } = await extractEmotions(prompt);
				// navigation.navigate('EmotionRating', {
				// 	detailedResponse: detailedResponse,
				// 	emotions: emotionSummary
				// });
			} catch (error) {
				console.error(error);
				Alert.alert('Error', 'There was an error processing your request.');
			}
		} else {
			Alert.alert('Input Required', 'Please enter your feelings to proceed.');
		}
	};

	const goHome = () => {
		navigation.navigate('Home');
	};

	const styles = StyleSheet.create({
		screen: {
			justifyContent: 'center',
			alignItems: 'center',
			// backgroundColor: '#F2F0E4',
			backgroundColor: '#001C30',
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
			color: 'white'
			// color: '#343434',
			// top: 60,
			// left: 41,
		},
		input: {
			width: '80%',
			// borderColor: 'gray',
			borderWidth: 1,
			padding: 10,
			fontFamily: 'Caudex',
		},
		arrowContainer: {
			alignItems: 'flex-end',
			backgroundColor: '#001C30',
			borderTopColor: 'black',
			paddingRight: 30,
			paddingBottom: 30,
			width: 90,
		},
		backContainer: {
			alignItems: 'flex-start',
			backgroundColor: '#001C30',
			paddingLeft: 20,
			paddingTop: 50,
			flexDirection: 'row',
			alignItems: 'center',
			color: 'white',
		},
		image: {
			width: 150,
			height: 150,
			backgroundColor: '#001C30',
			marginTop: -50,
			marginRight: -200,
		},
		earthContainer: {
			backgroundColor: '#001C30',
			alignItems: 'center',
		},
		arrowView: {
			backgroundColor: '#001C30',
			alignItems: 'flex-end',
		},
		date: {
			color: 'white',
			fontFamily: customFont,
			fontSize: 30,
			paddingLeft: 40,
			paddingTop: 10,
		},
		dateButton: {
			color: 'white',
			fontFamily: customFont,
			fontSize: 20,
			paddingLeft: 20,
			paddingTop: 10,
			width: 130,
			zIndex: 0,
			justifyContent: 'center',
			opacity: 0.8,
		},
		datePickerContainer: {
			backgroundColor: '#001C30',
			width: '100%',
			fontFamily: customFont,
			paddingTop: 40,
			paddingBottom: 20,
			paddingLeft: 20,
			alignSelf: 'left',
			zIndex: 0,

		}

	});
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const options = { year: 'numeric', month: 'long', day: 'numeric' };

	return (
		<>
			<View style={styles.backContainer}>
				<TouchableOpacity onPress={goHome}>


					<EvilIcons
						name='chevron-left'
						color='#64CCC5'
						size={55}
					/>
				</TouchableOpacity>

			</View>

			<SafeAreaView style={styles.datePickerContainer}>
				<Text style={styles.date}>{date.toLocaleString('en-US', options)}</Text>
				<Pressable onPress={showDatepicker} title="Date" style={styles.dateButton} >
					<Text style={styles.dateButton}>Select Date</Text>
				</Pressable>

			</SafeAreaView>
			<View style={styles.earthContainer}>
				<TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={Keyboard.dismiss} />
				<Image source={require('../assets/earthmoon.gif')} style={styles.image} />
			</View>

			<View style={styles.screen}>
				<TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={Keyboard.dismiss} />
				<TextBox prompt={prompt} setPrompt={setPrompt} customFont={customFont} />
			</View>
			<SafeAreaView style={styles.datePickerContainer}>
				{show && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode={mode}
						is24Hour={true}
						onChange={onChange}
						display='spinner'
						textColor='white'
					/>
				)}
			</SafeAreaView>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={styles.arrowView}>
					<TouchableOpacity
						style={[styles.arrowContainer, { fontFamily: customFont }]}
						onPress={submitPrompt}
					>
						<EvilIcons
							name='arrow-right'
							color='#64CCC5'
							size={70}
						/>

					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView >

		</>
	);
};



export default NewEntry;