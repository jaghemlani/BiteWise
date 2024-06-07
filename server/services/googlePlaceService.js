const axios = require('axios');

const getGooglePlacesData = async (restaurantName, location) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `${restaurantName} in ${location}`,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = { getGooglePlacesData };
