import axios from 'axios';

const sample = "You are a therapist with over 20 years of experience. Give me, <name>>, a distribution of percentages based on the emotions present in this excerpy about my day: for instance, happiness 50%, hopefulness 30%, sadness 20%. Use whatever emotions you think are present and change the percentages as necessary but use 1 emotion at a time in which you think best describes the prompt. This is a sample response: Me: 'Today, I went on a date with my girlfriend and we got coffee and had a nice talk. However, I felt like I was forcing myself to be someone else and I will work on it!' Your Response: Certainly, <name>. Based on the content and tone of your excerpt, here's a rough estimation of the emotional distribution: Happiness: 30%, This is present in the portion where you mention going out for coffee and having a nice talk with your girlfriend. It implies a pleasant experience or environment during your date. Anxiety or discomfort: 25%, The sentiment about feeling like you're forcing yourself to be someone else indicates an internal struggle, potentially causing feelings of discomfort, inauthenticity, or anxiety about your self-presentation. Determination or resolve: 25% When you say, 'I will work on it!' it shows a clear intention or decision to address the issue. This reflects a sense of resolve or determination to make positive changes or improvements. Self-awareness or introspection: 20%"

export const extractEmotions = async (prompt) => {
  try {
    const message = {
      model: "gpt-3.5-turbo", 
      messages: [
        { 
          "role": "system", 
          "content": sample
        },
        { "role": "user", "content": prompt },
    ],
    temperature: 0.7
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', message, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const answer = response.data.choices[0].message.content.trim();

    const emotions = answer.split(', ').reduce((obj, item) => {
      const [emotion, rating] = item.split(': ');
      obj[emotion] = parseFloat(rating);
      return obj;
    }, {});

    return emotions; 
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response ? error.response.data : error);
    throw error;
  }
};
