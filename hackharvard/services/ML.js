export const extractEmotions = async (prompt) => {
    try {
      // Replace with your actual API endpoint and key
      const response = await fetch('https://yourapi.com/extract_emotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
      return data.emotions; // assuming the response contains an 'emotions' object
    } catch (error) {
      console.error("Error during emotion extraction:", error);
      throw error;
    }
  };