import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchWeatherDataByCity } from '../api';

const SearchScreen = () => {
  const [city, setCity] = useState(''); // Состояние для хранения введенного города
  const [weatherData, setWeatherData] = useState(null); // Состояние для хранения данных о погоде

  // Функция для выполнения поиска погоды по введенному городу
  const searchWeather = async () => {
    try {
      const data = await fetchWeatherDataByCity(city); // Вызываем функцию из api.js для получения данных о погоде по городу
      setWeatherData(data); // Сохраняем полученные данные о погоде в состояние
    } catch (error) {
      console.error('Ошибка при поиске погоды:', error);
      // Обработка ошибки, например, отображение сообщения пользователю
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Поиск погоды</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Введите город"
      />
      <Button title="Найти погоду" onPress={searchWeather} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Температура: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Погодные условия: {weatherData.weather[0].description}</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SearchScreen;
