import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import NewEntry from './screens/NewEntry';
import Insights from './screens/Insights';
import Loading from './screens/Loading';
import EmotionRating from './screens/EmotionRating';
import Mood from './screens/Mood';
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
				<Stack.Screen
					name="NewEntry"
					component={NewEntry}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name="Insights" component={Insights} />
				<Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
				<Stack.Screen name="Mood" component={Mood} />
				<Stack.Screen name="EmotionRating" component={EmotionRating} options={{ headerShown: false }} />
			</Stack.Navigator>

		</NavigationContainer>

	);
}

const styles = StyleSheet.create({


});