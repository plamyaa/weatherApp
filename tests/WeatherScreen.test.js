import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import WeatherScreen from '../screens/WeatherScreen';
import { fetchWeatherDataByCity } from '../api';

// Мокирование модуля
jest.mock('../api');

describe('WeatherScreen', () => {
  const route = { params: { city: 'Test City' } };

  test('renders weather data correctly', async () => {
    fetchWeatherDataByCity.mockResolvedValue({
      main: {
        temp: 25,
        temp_max: 30,
        temp_min: 20,
        feels_like: 25,
        humidity: 50,
      },
      weather: [{ description: 'clear sky', icon: '01d' }],
      wind: { speed: 5 },
      name: 'Test City',
    });

    const { getByText } = render(<WeatherScreen route={route} />);

    await waitFor(() => expect(getByText('25°')).toBeTruthy());
  });
});
