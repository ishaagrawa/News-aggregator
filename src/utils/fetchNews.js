export const fetchNews = async () => {
    try {
      const response = await fetch('https://content.guardianapis.com/search?api-key=9d131a03-59ea-4a9d-97a9-362d7229038b');
      const data = await response.json();
      console.log('API Response:', data); // Log the data from the API here
      return data;
    } catch (err) {
      console.error('Error in fetchNews:', err);
      throw err;
    }
  };
  