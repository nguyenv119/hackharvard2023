import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this if you're using React Navigation 5.x or above
import { extractEmotions } from '../services/ML'; // Adjust the import statement to your file structure
import { useFonts } from 'expo-font';
import TextBox from './TextBox';

const Mood = () => {
	const [prompt, setPrompt] = useState('');

	const [fontsLoaded] = useFonts({
		'Varela': require('../assets/fonts/VarelaRound-Regular.ttf'),

	});

	const customFont = fontsLoaded ? 'Varela' : 'Arial';

	const navigation = useNavigation(); // This hook is for navigation
    const navigateToNextPage = () => {
        if (isGifVisible) {
          navigation.navigate('NewEntry'); // Navigate to the next page when the GIF is visible
        }
      };

    // const [gifVisible, setGifVisible] = useState(false);
    // const toggleVisibility = () => {
    //     setGifVisible(!gifVisible);
    // }

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
        <View style={styles.container}>
          <TouchableOpacity onPress={toggleExtraHappyVisibility}>
            {extraHappyVisible ? (
              <Image
                source={require('../assets/extrahappy.gif')}
                style={styles.image}/>
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
                style={styles.image}/>
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
                style={styles.image}/>
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
                style={{width: 122, height: 122, margin: -15}}/>
            ) : (
              <Image
                source={require('../assets/sadness.png')}
                style={{width: 122, height: 122, margin: -15}}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToNextPage}>
          </TouchableOpacity>
        </View>
        
        
      );
    };

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
	input: {
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
		fontFamily: 'Varela',
	},
    column:{
        flexDirection: 'column', 
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row', 
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
      },
});

export default Mood;