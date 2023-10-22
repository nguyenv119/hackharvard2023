import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
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
		console.log(percent[emotion]),
        <Text key={emotion} style={[styles.emotionText, { color: emotions[emotion] }]}>
            {emotion}: {(percent[emotion]).toFixed(2)}%
        </Text>
    ));

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
                    label={({ dataEntry }) => dataEntry.label + ' ' + (dataEntry.value).toFixed(0) + '%'}
                />
            </View>
            <ScrollView contentContainerStyle={styles.emotionsContainer}>
                {EmotionList}
            </ScrollView>
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
        flex: 5, // adjust this value as needed
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // removed borderColor and borderWidth for simplicity
    },
    chart: {
		position: 'absolute',
		top: '50%',
		left: '50%',
        width: '100%', // make chart use the full width of its container
        height: '80%', // adjust as needed
    },
    emotionsContainer: {
        flex: 3, // takes up less space than the chart
        padding: 20, // inner spacing
    },
    emotionText: {
        fontSize: 18,
        margin: 5,
    },
});

export default EmotionRating;