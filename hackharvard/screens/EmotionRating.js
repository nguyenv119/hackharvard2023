import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const EmotionRating = ({ route, navigation }) => {
	const { emotions, percent } = route.params;


    console.log(emotions);
    console.log(percent);

	const chartData = Object.keys(emotions).map((emotion) => ({
		value: percent[emotion],
		svg: { fill: emotions[emotion] },
		key: `pie-${emotion}`,
		label: emotion,
	}));

    const EmotionList = Object.keys(emotions).map((emotion) => (
        <Text key={emotion} style={[styles.emotionText, { color: emotions[emotion] }]}>
            {emotion}: {(percent[emotion]).toFixed(2)}%
        </Text>
    ));

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Insights</Text>
			<View style={styles.chartContainer}>
				<PieChart
					style={styles.chart}
					data={chartData}
					innerRadius={'45%'}
					outerRadius={'80%'}
					labelRadius={'90%'}
					label={({ dataEntry }) => dataEntry.label + ' ' + (dataEntry.value).toFixed(0) + '%'}
				/>
			</View>
			<ScrollView contentContainerStyle={styles.emotionsContainer}>
				{EmotionList}
			</ScrollView>
			<Pressable onPress={() => navigation.navigate('Home')} >
				<Text style={styles.subTitle}>Return</Text>
			</Pressable>
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
        top: 10                // little margin from the top
    },
	chartContainer: {
		flex: 5, // adjust this value as needed
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		// removed borderColor and borderWidth for simplicity
	},
	chart: {
		position: 'absolute',
		top: '100%',
		left: '50%',
		width: '100%', // make chart use the full width of its container
		height: '60%', // adjust as needed
	},
	emotionsContainer: {
		flex: 3, // takes up less space than the chart
		padding: 20, // inner spacing
		marginTop: 140, // spacing from the chart

	},
	emotionText: {
		fontSize: 20,
		margin: 5,
		fontFamily: 'Caudex',
	},
	subTitle: {
		fontSize: 30,
		marginBottom: 20,
		fontFamily: 'Caudex',
		marginBottom: 50,
	},
});

export default EmotionRating;