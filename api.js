const apiKey = "891b04a3b1d3ccb920e49ef16de97378";

export const fetchWeatherData = async (latitude, longitude) => {
  const urlString = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(urlString);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных о погоде');
    }
    
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
};

export const fetchHourlyWeather = async (latitude, longitude) => {
  const urlString = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(urlString);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных о погоде');
    }
    
    const hourlyWeatherData = await response.json();
    return hourlyWeatherData;
  } catch (error) {
    throw error;
  }
};

export const fetchWeatherDataByCity = async (cityName) => {
  const encodedCityName = encodeURIComponent(cityName);
  const urlString = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(urlString);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных о погоде');
    }
    
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
};
