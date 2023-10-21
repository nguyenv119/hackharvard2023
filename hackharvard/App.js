import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function App() {
	const [fontsLoaded] = useFonts({
		'Tilt-Neon': require('./assets/fonts/TiltNeon-Regular-VariableFont.ttf'),
	  });

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='NewEntry'>
				{/* <Stack.Screen name="Home" component={HomeScreen} /> */}
				<Stack.Screen name="NewEntry" component={NewEntry} />
				<Stack.Screen name="Insights" component={Insights} />
			</Stack.Navigator>

		</NavigationContainer>

	);
}

const styles = StyleSheet.create({


});
