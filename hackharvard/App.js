import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewEntry from './screens/NewEntry';
import Insights from './screens/Insights';
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();


export default function App() {
	const [fontsLoaded] = useFonts({
		'Tilt-Neon': require('./assets/fonts/TiltNeon-Regular-VariableFont.ttf'),
		
	});

	const customFont = fontsLoaded ? 'Tilt-Neon' : 'Arial';

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='NewEntry'>
				{/* <Stack.Screen name="Home" component={HomeScreen} /> */}
				<Stack.Screen name="NewEntry" component={NewEntry} options={{headerTitleStyle: { fontFamily: customFont,},}}/>
				<Stack.Screen name="Insights" component={Insights} />
			</Stack.Navigator>

		</NavigationContainer>

	);
}

const styles = StyleSheet.create({


});
