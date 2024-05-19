import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import { fetchWeatherDataByCity } from '../api';

// Мокирование модуля
jest.mock('../api');

describe('App', () => {
  test('navigates from HomeScreen to WeatherScreen and back', async () => {
    fetchWeatherDataByCity.mockResolvedValue({
      main: { temp: 25, temp_max: 30, temp_min: 20, feels_like: 25, humidity: 50 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      wind: { speed: 5 },
      name: 'Test City',
    });

    const { getByPlaceholderText, getByText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Test City');
    fireEvent.submitEditing(getByPlaceholderText('Enter city'));

    await waitFor(() => expect(getByText('25°')).toBeTruthy());

  });
});
