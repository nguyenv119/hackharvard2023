import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above
import { extractEmotions } from '../services/ML'; // Adjust the import statement to your file structure
import { useFonts } from 'expo-font';
import TextBox from '../components/TextBox';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Mood = () => {
	const [prompt, setPrompt] = useState('');

	const [fontsLoaded] = useFonts({
		'Caudex': require('../assets/fonts/Caudex-Regular.ttf'),

	});

	const customFont = fontsLoaded ? 'Caudex' : 'Arial';

	// const isExactlyOneGifVisible = [extraHappyVisible, happyVisible, mildVisible, sadnessVisible].filter(Boolean).length === 1;
	// const isAnyGifVisible = [extraHappyVisible, happyVisible, mildVisible, sadnessVisible].some(visible => visible);

	const navigation = useNavigation(); // This hook is for navigation
	const navigateToNextPage = () => {
		const selectedEmotions = [
			extraHappyVisible,
			happyVisible,
			mildVisible,
			sadnessVisible,
		];
		const selectedCount = selectedEmotions.filter(emotion => emotion).length;
		if (selectedCount === 1) {
			navigation.navigate('NewEntry');
		} else {
			Alert.alert('Error', 'Please select exactly one emotion.');
		}
	};

	const [extraHappyVisible, setExtraHappyVisible] = useState(false);
	const [happyVisible, setHappyVisible] = useState(false);
	const [mildVisible, setMildVisible] = useState(false);
	const [sadnessVisible, setSadnessVisible] = useState(false);

	const toggleExtraHappyVisibility = () => {
		setExtraHappyVisible(!extraHappyVisible);
	};

	const toggleHappyVisibility = () => {
		setHappyVisible(!happyVisible);
	};

	const toggleMildVisibility = () => {
		setMildVisible(!mildVisible);
	};

	const toggleSadnessVisibility = () => {
		setSadnessVisible(!sadnessVisible);
	};


	return (
		<View style={styles.screen}>
			<View style={styles.arrowView}>
				<TouchableOpacity
					style={[styles.arrowContainer, { fontFamily: customFont }]}
					onPress={navigateToNextPage}
				>
					<EvilIcons
						name='arrow-right'
						color='#64CCC5'
						size={70}
					/>

				</TouchableOpacity>
				<View style={styles.backContainer}>
					<EvilIcons
						name='chevron-left'
						color='#64CCC5'
						size={55}
					/>

				</View>
				<View style={styles.container}>
					<Text style={[styles.description, { fontFamily: customFont }]}>
						How are you feeling today?
					</Text>
					<View style={styles.imageContainer}>
						<TouchableOpacity onPress={toggleExtraHappyVisibility}>
							{extraHappyVisible ? (
								<Image
									source={require('../assets/extrahappy.gif')}
									style={styles.image} />
							) : (
								<Image
									source={require('../assets/extrahappy.png')}
									style={styles.image}
								/>
							)}
						</TouchableOpacity>

						<TouchableOpacity onPress={toggleHappyVisibility}>
							{happyVisible ? (
								<Image
									source={require('../assets/happy.gif')}
									style={styles.image} />
							) : (
								<Image
									source={require('../assets/happy.png')}
									style={styles.image}
								/>
							)}
						</TouchableOpacity>

						<TouchableOpacity onPress={toggleMildVisibility}>
							{mildVisible ? (
								<Image
									source={require('../assets/mild.gif')}
									style={styles.image} />
							) : (
								<Image
									source={require('../assets/mild.png')}
									style={styles.image}
								/>
							)}
						</TouchableOpacity>

						<TouchableOpacity onPress={toggleSadnessVisibility}>
							{sadnessVisible ? (
								<Image
									source={require('../assets/sadness.gif')}
									style={{ width: 122, height: 122, margin: -10, marginLeft: -25 }} />
							) : (
								<Image
									source={require('../assets/sadness.png')}
									style={{ width: 122, height: 122, margin: -10, marginLeft: -25 }}
								/>
							)}
						</TouchableOpacity>

					</View>
				</View>
			</View>
			<TouchableOpacity onPress={navigateToNextPage}>
			</TouchableOpacity>
		</View>


	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#001C30',
		alignItems: 'center',
	},
	imageContainer: {
		// flexDirection: 'row',
		alignItems: 'center',
	},
	column: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	row: {
		flexDirection: 'row',
		alignItems: "center",
	},
	description: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
	arrowContainer: {
		alignItems: 'flex-end',
		backgroundColor: '#001C30',
		borderTopColor: 'black',
		paddingRight: 30,
		paddingBottom: 30,
		width: 90,
	},
	arrowView: {
		backgroundColor: '#001C30',
		alignItems: 'flex-end',
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
		width: 100,
		height: 100,
		margin: 5,
	},
});

export default Mood;