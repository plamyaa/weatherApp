import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { fetchWeatherDataByCity } from '../api';
import humidityIcon from '../assets/humidity.png';
import temperatureIcon from '../assets/temperature.png';
import windIcon from '../assets/wind.png';

const WeatherScreen = ({ route }) => {
  const { city } = route.params;
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIconName, setWeatherIconName] = useState(null);

  const getWeatherData = async () => {
    try {
      const weather = await fetchWeatherDataByCity(city);
      const icon_name = weather.weather[0].icon;
      setWeatherData(weather);
      setWeatherIconName(icon_name);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных о погоде:', error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
    <View style={styles.container}>
      
      {loading ? (
        <View>
          <Text style={styles.greeting}>Lodaing weather for {city}</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTemperature}>
            {weatherData && ~~weatherData.main.temp}°
          </Text>
          <Text style={styles.weatherCity}>
            {weatherData && weatherData.name.toLowerCase()}
          </Text>
          <Text style={styles.weatherDescription}>
            {weatherData && weatherData.weather[0].description}
          </Text>
          {weatherIconName && (
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherIconName}@2x.png`,
              }}
              style={styles.weatherIcon}
            />
          )}
          <Text style={styles.weatherHighLow}>
            H:{weatherData && ~~weatherData.main.temp_max}° L:
            {weatherData && ~~weatherData.main.temp_min}°
          </Text>
          <View style={styles.detailsContainer}>
            <View style={styles.column}>
              <View style={styles.textImage}>
                <Image
                  source={temperatureIcon}
                  style={styles.weatherDetailedIcon}
                />
                <Text style={styles.weatherDetails}>
                  {weatherData && weatherData.main.feels_like}°C
                </Text>
              </View>
              <View style={styles.textImage}>
                <Image
                  source={humidityIcon}
                  style={styles.weatherDetailedIcon}
                />
                <Text style={styles.weatherDetails}>
                  {weatherData && weatherData.main.humidity}%
                </Text>
              </View>
              <View style={styles.column}>
                <View style={styles.textImage}>
                  <Image source={windIcon} style={styles.weatherDetailedIcon} />
                  <Text style={styles.weatherDetails}>
                    {weatherData && weatherData.wind.speed} m/s
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  weatherTemperature: {
    fontSize: 48,
    marginBottom: 0,
  },
  weatherCity: {
    fontSize: 16,
    marginBottom: 0,
    color: 'grey',
    textTransform: 'capitalize',
  },
  weatherDescription: {
    color: 'grey',
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  textImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  weatherDetailedIcon: {
    width: 20,
    height: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  column: {
    flex: 1,
  },
  weatherDetails: {
    fontSize: 16,
    color: 'grey',
  },
});

export default WeatherScreen;
