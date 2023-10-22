import { API_KEY } from '@env';

const sample = "You are a therapist with over 20 years of experience. Provide a distribution of percentages based on the emotions present in this excerpt about someone's day: use whatever emotions you think are present and change the percentages as necessary, respond like how a therapist would in a friendly tone, just take the data given and don't suggest improvements on the input. Respond in a <emotion>: <percentage>; <response> format ONLY. Then, at the end of your response, include the emotional summary with the percentages <emotion>: <percentage>. Don't add anything after this. You have to include atleast 2 emotions and an answer, and NEVER NaN. Do not help or console the user, simply analyze their statement. This is a sample response: Me: 'Today, I went on a date with my girlfriend and we got coffee and had a nice talk. However, I felt like I was forcing myself to be someone else and I will work on it!' Your Response: Here's a rough estimation of the emotional distribution: Happiness: 30%; You mentioned going out for coffee and having a nice talk with your girlfriend. It seems like a pleasant experience or environment during your date, and that sounds great! Anxiety or Discomfort: 25%; Your sentiment about feeling like you're forcing yourself to be someone else indicates a possible internal struggle, potentially causing feelings of discomfort, inauthenticity, or anxiety about your self-presentation. Determination or Resolve: 45%; When you say, 'I will work on it!' this is a clear intention or decision to address the issue and reflects a sense of resolve or determination to make positive changes or improvements. Happiness: 30%; Anxiety or Discomfort: 25%; Determination or Resolve: 45%. That was the prompt. In this case, there was nothing after 45%. Now, here is your prompt: "

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
            max_tokens: 10,
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(`OpenAI API responded with ${response.status}: ${errorData.error.message}`);
        }

        const data = await response.json();
        const answer = data.choices[0].message.content.trim();
            
        const splitAnswer = answer.split('\n\n');
        const detailedResponse = splitAnswer.slice(0, splitAnswer.length - 1).join('\n\n');
        const emotionSummary = splitAnswer[splitAnswer.length - 1];

        // console.log(emotionSummary)
    
        const emotionDict = {};
        emotionSummary.split(';').forEach(entry => {
            const [emotion, percentage] = entry.trim().split(':');
            emotionDict[emotion.trim()] = parseFloat(percentage);
        });

        // console.log(emotionDict)

        return { 
            detailedResponse: detailedResponse,
            emotionSummary: emotionDict
        };

    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        throw error;
    }
};