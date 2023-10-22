import { Image, SafeAreaView, Pressable, View, Keyboard, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above

export default function Home() {
	const navigation = useNavigation();
	const goEntry = () => {
		navigation.navigate('NewEntry');
	}

	return (
		<>
			<View style={styles.screen}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Welcome to Soular!</Text>
					<Text style={styles.subtitle}>Your personal AI mood tracker</Text>
				</View>
				<Image source={require('../assets/mainpage.gif')} style={styles.image} />
				<Pressable onPress={goEntry}>
					{/* <AntDesign
						name='plus'
						color='white'
						size={70}
					/> */}
					<Text style={styles.subtitle}>Get Started</Text>
				</Pressable>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	screen: {
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#F2F0E4',
		backgroundColor: '#001C30',
		height: '100%',
	},
	titleContainer: {
		width: '100%',
		justifyContent: 'center',
		alignContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontFamily: 'Caudex',
		fontSize: 30,
		color: 'white',
	},
	subtitle: {
		textAlign: 'center',
		fontFamily: 'Caudex',
		fontSize: 20,
		color: 'white',
	},
	image: {
		width: 400,
		height: 400,
	},
})