import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './components/AppNavigator';

SplashScreen.preventAutoHideAsync();


export default function App() {

	const [fontsLoaded, fontError] = useFonts({
		'Tilt-Neon': require('./assets/fonts/TiltNeon-Regular-VariableFont_XROT,YROT.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <StatusBar style="auto" /> */}
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
		fontFamily: 'Tilt-Neon',
	}
});
