import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const EmotionRating = ({ route, navigation }) => {
    const { detailedResponse, emotions, percent } = route.params;

    // Prepare data for the pie chart
	// console.log(emotions)
    const chartData = Object.keys(emotions).map((emotion) => {
        // Get the color for this emotion
        const color = emotions[emotion];
        // console.log(color)
        // Get the percentage for this emotion
        const value = percent[emotion];

        // Create a data point for this emotion
        return {
            value,  // value is the percentage of this emotion
            svg: { fill: color }, // fill color for the slice
            key: `pie-${emotion}`, // unique key for React list items
            arc: { outerRadius: '100%', cornerRadius: 5 },
            label: emotion, // the label for this slice
        };
    });

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Emotion Ratings:</Text>
            <View style={styles.chartContainer}>
                <PieChart 
                    style={styles.chart} 
                    data={chartData} 
                    innerRadius={'45%'} 
                    outerRadius={'80%'} 
                    labelRadius={'90%'}
                    // If you want to display labels on the chart, you can add a 'label' prop to your PieChart component
                    // and define a function to render labels based on your data.
                    // Uncomment the line below to enable chart labels.
                    // label={({ dataEntry }) => dataEntry.label + ' ' + (dataEntry.value * 100).toFixed(0) + '%'}
                />
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

export default EmotionRating;