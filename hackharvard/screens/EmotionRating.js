import axios from 'axios';
import { API_KEY } from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { PieChart } from 'react-native-svg-charts';

const colorsDictionary = {
	color1: '#F94144',
	color2: '#F3722C',
	color3: '#F8961E',
	color4: '#F9C74F',
	color5: '#90BE6D',
	color6: '#43AA8B',
	color7: '#577590',
	color8: '#6A0572',
	color9: '#240046',
	color10: '#F0A500',
	color11: '#00B4D8',
	color12: '#3A86FF',
	color13: '#8338EC',
	color14: '#3D5A80',
	color15: '#98C1D9',
	color16: '#2A9D8F',
	color17: '#E9C46A',
	color18: '#F4A261',
	color19: '#FF6B6B',
	color20: '#172A3A',
};

const EmotionRating = ({ route, navigation }) => {
    const {emotions}  = route.params;
    const [emotionColors, setEmotionColors] = useState({});

    useEffect(() => {
        getEmotionColors(emotions).then(mapping => {
            console.log('Color Mapping:', mapping);
            setEmotionColors(mapping);
			console.log()
        }).catch(error => {
            console.error("Error setting emotion colors:", error.message);
        });
    }, [emotions]);

    const chartData = Object.keys(emotions).map((emotion) => {
        const color = emotionColors[emotion] || '#000'; 
		console.log(color)
        return {
            value: emotions[emotion],  // this should be a number (percentage)
            svg: { fill: color },
            key: `pie-${emotion}`,  // unique string value for react list
            arc: { outerRadius: '100%', cornerRadius: 5 },  // updated as per library's requirement
            label: emotion,
        };
    });

	console.log(chartData);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Emotion Ratings:</Text>
			<View style={styles.chartContainer}>
    				{/* <View style={styles.chartContainer}> */}
						<PieChart style={styles.chart} data={chartData} />
					{/* </View> */}
				</View>
            <Button title="Confirm" onPress={() => navigation.goBack()} />
        </View>
    );
	
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center', // center vertically
        alignItems: 'center',     // center horizontally
        backgroundColor: 'white',
        borderWidth: 2           // Changed from '2px' to 2 because React Native does not recognize 'px' units
    },
    title: {
        fontSize: 24,
        marginBottom: 20, // spacing after the title
        position: 'absolute',  // positioned absolutely at the top
        top: 10,              // little margin from the top
		color: 'black',
    },
    chartContainer: {
        flex: 1,             // take up remaining space
        justifyContent: 'center', // center vertically
        alignItems: 'center',     // center horizontally
        width: '100%',       // full width
        borderColor: 'blue',
        borderWidth: 2,      // Changed from '2px' to 2
    },
	chart: {
		width: 300,
        height: 300,
	},	
    emotionText: {
        marginBottom: 5,
    },
});


const getEmotionColors = async (emotionSummary) => {
	// console.log(emotionSummary)

	try {
		const payload = {
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", "content": "Given the following emotion distribution summary, provide a suitable color distribution using the available colors in this dictionary. Respond in the dictionary format of <emotion>: <color>. For example, 'Anger': '#F94144'; 'Calmness': '#2A9D8F'. Here is the dictionary of colors: " + colorsDictionary },
				{ role: "user", "content": Object.entries(emotionSummary).map(([emotion, percentage]) => `${emotion}: ${percentage}`).join('; ') },
			],
		};
		const apiEndpoint = "https://api.openai.com/v1/chat/completions";
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'Content-Type': 'application/json'
			},
			max_tokens: 10,
			body: JSON.stringify(payload)
		});

		const answer = await response.json();
		const data = answer.choices[0].message.content.trim();

		const dataArray = data.split(';'); // Splitting by semicolon instead of newline

		const emotionColorDict = {};

		dataArray.forEach(item => {
			const [emotion, color] = item.split(': ').map(s => s.trim());
			emotionColorDict[emotion] = color;
		});
		console.log(emotionColorDict);
		return emotionColorDict;

	} catch (error) {
		console.error('Error calling OpenAI API:', error.message);
		throw error;
	}
};


export default EmotionRating;
