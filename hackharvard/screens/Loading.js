import { Image, View, Text, StyleSheet } from 'react-native';

export default function Loading() {
	return (
		<>
			<View style={styles.container}>
				<Image source={require('../assets/planet.gif')} style={styles.image} />
				<View>
					<Text style={styles.text}>Orbiting....</Text>
				</View>
			</View>

		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F2F0E4',
		// backgroundColor: '#343434',
	},
	text: {
		fontSize: 30,
		// color: '#F2F0E4',
		color: '#343434',
		fontFamily: 'Caudex',
	},
	image: {
		width: 200,
		height: 200,
	},
});