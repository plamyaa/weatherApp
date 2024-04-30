import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as Location from 'expo-location';
import { fetchWeatherData } from '../api';
import humidityIcon from '../assets/humidity.png';
import temperatureIcon from '../assets/temperature.png';
import windIcon from '../assets/wind.png';

const HomeScreen = () => {
  const [location, setLocation] = useState(null); // Состояние для хранения текущей геолокации
  const [loading, setLoading] = useState(true); // Состояние для отображения индикатора загрузки
  const [weatherData, setWeatherData] = useState(null); // Состояние для хранения данных о погоде
  const [weatherIconName, setWeatherIconName] = useState(null); // Состояние для хранения имени иконки погоды
  const [greeting, setGreeting] = useState(''); // Состояние для приветствия

  // Функция для получения текущей геолокации пользователя
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync(); // Запрос разрешения на доступ к геолокации
      if (status !== 'granted') {
        throw new Error('Разрешение на доступ к геолокации не получено');
      }

      const userLocation = await Location.getCurrentPositionAsync(); // Получение текущей геолокации
      setLocation(userLocation.coords);
    } catch (error) {
      console.error('Ошибка получения геолокации:', error);
    }
  };

  // Функция для загрузки данных о погоде по текущей геолокации
  const getWeatherData = async () => {
    if (!location) return; // Если геолокация не определена, завершаем функцию

    try {
      const weather = await fetchWeatherData(
        location.latitude,
        location.longitude
      ); // Получение данных о погоде
      const icon_name = weather.weather[0].icon;
      setWeatherData(weather);
      setWeatherIconName(icon_name);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных о погоде:', error);
    }
  };

  // Функция для определения времени суток и приветствия
  const getGreeting = () => {
    const date = new Date(); // Получение текущей даты и времени
    const hours = date.getHours(); // Получение текущего часа

    if (hours >= 5 && hours < 12) {
      setGreeting('Good morning!');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good afternoon!');
    } else if (hours >= 18 && hours < 24) {
      setGreeting('Good evening!');
    } else {
      setGreeting('Good night!');
    }
  };

  // Эффект для загрузки текущей геолокации и приветствия при монтировании компонента
  useEffect(() => {
    getLocation();
    getGreeting();
  }, []);

  // Эффект для загрузки данных о погоде при изменении геолокации
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
          {/* Дополнительная информация о погоде */}
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
      )}
    </View>
  );
};

// Стили для компонентов
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
});

export default HomeScreen;
