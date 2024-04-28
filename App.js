import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

// Компонент для кнопки поиска
const SearchButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
      <Text style={{ marginRight: 10 }}>Поиск</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => <SearchButton navigation={navigation} />,
          })}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
