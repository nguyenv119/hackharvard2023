import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Details" component={DetailsScreen} />
		</Stack.Navigator>
	);
}

export default function App() {



	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
			{/* <View style={styles.container}>
				<Text style={styles.text}>Good morning, Vietnam!</Text>
				<StatusBar style="auto" /> */}
			{/* <View style={styles.journalContainer}>
				<Text>Test</Text>
			</View> */}
			{/* </View>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details')}
			/> */}
		</NavigationContainer>
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
	}
});
