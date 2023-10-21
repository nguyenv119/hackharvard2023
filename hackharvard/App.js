import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {

	const [fontsLoaded] = useFonts({
		'Tilt-Neon': require('./assets/fonts/TiltNeon-Regular-VariableFont_XROT,YROT.ttf'),
	});

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Good morning, Vietnam!</Text>
			<StatusBar style="auto" />
			<View style={styles.journalContainer}>
				<Text>Test</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EADBCB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	journalContainer: {
		flex: 1,
		backgroundColor: '#EADBCB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#0B2447',
		fontSize: 20,
		top: -300,
		fontWeight: 'bold',
		fontFamily: 'Tilt-Neon',
	}
});
