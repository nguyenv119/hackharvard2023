import axios from 'axios';
import { API_KEY } from '@env';

const sample = "You are a therapist with over 20 years of experience. Provide a distribution of percentages based on the emotions present in this excerpt about someone's day: use whatever emotions you think are present and change the percentages as necessary, respond like how a therapist would in a friendly tone, just take the data given and don't suggest improvements on the input. This is a sample response: Me: 'Today, I went on a date with my girlfriend and we got coffee and had a nice talk. However, I felt like I was forcing myself to be someone else and I will work on it!' Your Response: Here's a rough estimation of the emotional distribution: Happiness: 30%, You mentioned going out for coffee and having a nice talk with your girlfriend. It seems like a pleasant experience or environment during your date, and that sounds great! Anxiety or discomfort: 25%, Your sentiment about feeling like you're forcing yourself to be someone else indicates a possible internal struggle, potentially causing feelings of discomfort, inauthenticity, or anxiety about your self-presentation. Determination or resolve: 25% When you say, 'I will work on it!' this is a clear intention or decision to address the issue and reflects a sense of resolve or determination to make positive changes or improvements. Self-awareness or introspection: 20%. Use whatever emotions Here is your prompt: "

export const extractEmotions = async (prompt) => {
    try {
        const payload = {
            model: "gpt-3.5-turbo", 
            messages: [
                { "role": "system", "content": sample + " " + prompt },
                { "role": "user", "content": prompt },
            ],
        };

        const apiEndpoint = "https://api.openai.com/v1/chat/completions";
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            max_tokens: 20,
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorData = await response.json();  // Get detailed error message from OpenAI
            throw new Error(`OpenAI API responded with ${response.status}: ${errorData.error.message}`);
        }

        const data = await response.json();

        const answer = data.choices[0].message.content.trim();
        const emotions = answer.split(', ').reduce((obj, item) => {
        const [emotion, rating] = item.split(': ');
        obj[emotion] = parseFloat(rating);
        return obj;
        }, {});

        console.log(emotions);
        return emotions; 

    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        throw error;
    }
};