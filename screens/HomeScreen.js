import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'; // Изменил импорт для использования компонента Image из react-native
import * as Location from 'expo-location';
import { fetchWeatherData } from '../api';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIconName, setWeatherIconName] = useState(null);
  const [greeting, setGreeting] = useState('');

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Разрешение на доступ к геолокации не получено');
      }

      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation.coords);
    } catch (error) {
      console.error('Ошибка получения геолокации:', error);
    }
  };

  const getWeatherData = async () => {
    if (!location) return;

    try {
      const weather = await fetchWeatherData(location.latitude, location.longitude);
      const icon_name = weather.weather[0].icon;
      setWeatherData(weather);
      setWeatherIconName(icon_name);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных о погоде:', error);
    }
  };

  const getGreeting = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting('Доброе утро!');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Добрый день!');
    } else if (hours >= 18 && hours < 24) {
      setGreeting('Добрый вечер!');
    } else {
      setGreeting('Доброй ночи!');
    }
  };

  useEffect(() => {
    getLocation();
    getGreeting();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTemperature}>{weatherData && weatherData.main.temp}°C</Text>
          <Text style={styles.weatherCity}>{weatherData && weatherData.name.toLowerCase()}</Text>
          {weatherIconName && (
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${weatherIconName}@2x.png` }}
              style={styles.weatherIcon}
            />
          )}
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
    fontSize: 24,
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
    marginBottom: 10,
    color: "grey",
    textTransform: 'capitalize',
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
});

export default HomeScreen;
