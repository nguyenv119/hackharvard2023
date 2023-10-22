import axios from 'axios';
import { API_KEY } from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { PieChart } from 'react-native-svg-charts';

const EmotionRating = ({ route, navigation }) => {
    const { detailedResponse, emotions } = route.params;
	console.log(emotions)
	const chartData = Object.keys(emotions).map((emotion) => {
		const color = emotions[emotion]; // Get the color from the emotions object
		return {
			value: parseFloat(emotions[emotion].slice(1), 16), // Convert color to a number
			svg: { fill: color }, // Set the color
			key: `pie-${emotion}`,
			arc: { outerRadius: '100%', cornerRadius: 5 },
			label: emotion,
		};
	});
	

	

	// console.log(chartData);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Emotion Ratings:</Text>
			<View style={styles.chartContainer}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<PieChart style={styles.chart} data={chartData} />
				</View>
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
        borderColor: 'green',
        borderWidth: 2           // Changed from '2px' to 2 because React Native does not recognize 'px' units
    },
    title: {
        fontSize: 24,
        marginBottom: 20, // spacing after the title
        position: 'absolute',  // positioned absolutely at the top
        top: 10                // little margin from the top
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
		position: 'absolute',
		top: '10%',
		left: '10%',
		width: '80%',
		height: '80%',
		margin: 'auto',
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
				{ "role": "system", "content": "Given the following emotion distribution summary, provide a suitable color distribution using the available colors in this dictionary. Respond in the dictionary format of <emotion>: <color>. For example, 'Anger': '#F94144'; 'Calmness': '#2A9D8F'. Here is the dictionary of colors: " + colorsDictionary },
				{ "role": "user", "content": Object.entries(emotionSummary).map(([emotion, percentage]) => `${emotion}: ${percentage}`).join('; ') },
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
