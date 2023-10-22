import { API_KEY } from '@env';

const sample = "You are a therapist with over 20 years of experience. Provide a distribution of percentages based on the emotions present in this excerpt about someone's day: use whatever emotions you think are present and change the percentages as necessary, respond like how a therapist would in a friendly tone, just take the data given and don't suggest improvements on the input. Respond in a <emotion>: <percentage>; <response> format ONLY. Then, at the end of your response, include the emotional summary with the percentages <emotion>: <percentage>. Don't add anything after this. You have to include atleast 2 emotions and an answer, and NEVER NaN. Do not help or console the user, simply analyze their statement. This is a sample response: Me: 'Today, I went on a date with my girlfriend and we got coffee and had a nice talk. However, I felt like I was forcing myself to be someone else and I will work on it!' Your Response: Here's a rough estimation of the emotional distribution: Happiness: 30%; You mentioned going out for coffee and having a nice talk with your girlfriend. It seems like a pleasant experience or environment during your date, and that sounds great! Anxiety or Discomfort: 25%; Your sentiment about feeling like you're forcing yourself to be someone else indicates a possible internal struggle, potentially causing feelings of discomfort, inauthenticity, or anxiety about your self-presentation. Determination or Resolve: 45%; When you say, 'I will work on it!' this is a clear intention or decision to address the issue and reflects a sense of resolve or determination to make positive changes or improvements. Happiness: 30%; Anxiety or Discomfort: 25%; Determination or Resolve: 45%. That was the prompt. In this case, there was nothing after 45%. Now, here is your prompt: "

const colorsList = ['#F94144','#F3722C','#F8961E','#F9C74F','#90BE6D','#43AA8B','#577590','#6A0572','#240046', '#F0A500', '#00B4D8', '#3A86FF', '#8338EC', '#3D5A80', '#98C1D9', '#2A9D8F', '#E9C46A', '#F4A261', '#FF6B6B', '#172A3A']

export const extractEmotions = async (prompt) => {
    try {
        let payload = {
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": sample + " " + prompt },
                { "role": "user", "content": prompt },
            ],
        };

        const apiEndpoint = "https://api.openai.com/v1/chat/completions";
        let response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            max_tokens: 10,
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(`OpenAI API responded with ${response.status}: ${errorData.error.message}`);
        }

        let data = await response.json();
        let answer = data.choices[0].message.content.trim();

        let splitAnswer = answer.split('\n\n');
        let detailedResponse = splitAnswer.slice(0, splitAnswer.length - 1).join('\n\n');
        let emotionSummary = splitAnswer[splitAnswer.length - 1];

        // Parsing the summary to create the emotion-to-percentage dictionary
        let percentDict = {};
        let emotionsWithPercents = emotionSummary.split('; '); // Assumption is that the summary is '; ' separated.

        emotionsWithPercents.forEach(item => {
            let [emotion, percentValue] = item.split(': ');
            if (emotion && percentValue) {
                // Assuming the percentValue is a string like "30%", we remove the '%' and convert to a float
                let percent = parseFloat(percentValue.replace('%', ''));
                percentDict[emotion] = percent;
            }
        });

        // console.log(emotionSummary)

		payload = {
			model: "gpt-3.5-turbo",
			messages: [
				{ "role": "system", "content": "Given the following emotion distribution summary, provide a suitable color distribution using the available colors in this dictionary. Respond in the dictionary format of <emotion>: <color>. For example, 'Anger': '#F94144'; 'Calmness': '#2A9D8F'. Here is the list of colors: " + colorsList },
				{ "role": "user", "content": emotionSummary },
			],
		};
		response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
                // Processing the second response to extract colors
                answer = await response.json();
                data = answer.choices[0].message.content.trim();
        
                // Creating a dictionary for emotion-color pairs
                let emotionColorDict = {};
                let lines = data.split(';'); // Split by semicolons to separate each item, assuming items end with a semicolon
        
                lines.forEach(line => {
                    line = line.trim(); // Trimming whitespace
                    // Splitting at the newline character to separate different emotion-color pairs
                    let pairs = line.split('\n'); 
                    pairs.forEach(pair => {
                        let parts = pair.split(':'); // Split by colon to get emotion and color separately
                        if (parts.length === 2) { // Confirming there's an emotion part and a color part
                            let emotion = parts[0].trim();
                            let color = parts[1].trim();
                            if (color && color.startsWith('#') && color.length === 7) { // Basic validation for hex color code
                                emotionColorDict[emotion] = color; // Add to dictionary
                            } else {
                                console.error(`Invalid color format for emotion "${emotion}": "${color}"`);
                            }
                        } else {
                            console.error(`Invalid line format detected: "${pair}"`);
                        }
                    });
                });
        
                return { 
                    detailedResponse: detailedResponse,
                    emotionColor: emotionColorDict,
                    emotionPercent: percentDict // Returning the dictionary with emotions as keys and percentages as values
                };
        
            } catch (error) {
                console.error('Error calling OpenAI API:', error.message);
                throw error;
            }
};