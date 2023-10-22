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
	const { emotions } = route.params;
	const [emotionColors, setEmotionColors] = useState({});
	const [adjustedEmotions, setAdjustedEmotions] = useState(emotions);

	console.log(emotions)

	useEffect(() => {
		getEmotionColors(emotions).then(mapping => {
			setEmotionColors(mapping);
		}).catch(error => {
			console.error("Error setting emotion colors:", error.message);
		});
	}, [emotions]);

	const adjustEmotionValues = (changedEmotion, newValue) => {
		const delta = newValue - adjustedEmotions[changedEmotion];
		const otherEmotions = Object.keys(adjustedEmotions).filter(emotion => emotion !== changedEmotion);

		const adjustmentPerEmotion = delta / otherEmotions.length;

		const updatedEmotions = {};
		for (let emotion in adjustedEmotions) {
			if (emotion === changedEmotion) {
				updatedEmotions[emotion] = newValue;
			} else {
				updatedEmotions[emotion] = Math.round(adjustedEmotions[emotion] - adjustmentPerEmotion);  // Use Math.round to ensure integer values
			}
		}
		setAdjustedEmotions(updatedEmotions);
	};

	const handleSliderChange = (emotion, newValue) => {
		adjustEmotionValues(emotion, newValue);
	};

	const chartData = Object.entries(adjustedEmotions).map(([emotion, percentage]) => ({
		key: emotion,
		value: percentage,
		svg: { fill: emotionColors[emotion] || '#000' }, // default to black if no color mapping
		arc: { outerRadius: percentage + '%', padAngle: 0 }, // Adjust this line for the pie chart
		label: emotion,
	}));

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Adjust your emotion ratings:</Text>
			<PieChart
				style={styles.chart}
				data={chartData}
			/>
			{Object.keys(adjustedEmotions).map((emotion) => (
				<View key={emotion} style={styles.sliderContainer}>
					<Text style={styles.emotionText}>{emotion}</Text>
					{/* <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={10}
                        step={2}  
                        value={adjustedEmotions[emotion]}
                        onValueChange={(newValue) => handleSliderChange(emotion, newValue)}
                    /> */}
					<Text>{Math.round(adjustedEmotions[emotion])}</Text>
				</View>
			))}
			<Button title="Confirm" onPress={() => navigation.goBack()} />
		</View>
	);
};


const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		justifyContent: 'space-between',
	},
	title: {
		alignSelf: 'center',
		marginBottom: 10,
	},
	chart: {
		height: 350,
		alignSelf: 'center',
	},
	sliderContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	emotionText: {
		marginBottom: 5,
	},
	slider: {
		width: '100%',
		marginVertical: 10,
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
