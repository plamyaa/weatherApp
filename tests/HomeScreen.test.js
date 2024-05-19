import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { fetchWeatherData } from '../api';
import * as Location from 'expo-location';

// Мокирование модулей
jest.mock('expo-location');
jest.mock('../api');

describe('HomeScreen', () => {
  test('renders greeting based on time of day', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValue({ coords: { latitude: 0, longitude: 0 } });
    fetchWeatherData.mockResolvedValue({
      main: { temp: 25, temp_max: 30, temp_min: 20, feels_like: 25, humidity: 50 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      wind: { speed: 5 },
      name: 'Test City',
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => expect(getByText(/Good/)).toBeTruthy());
  });
});
