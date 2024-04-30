import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Animated,
  Image,
  StyleSheet,
} from 'react-native';
import searchIcon from '../assets/search.png';
import closeIcon from '../assets/close.png';

const Header = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const animationValue = useRef(new Animated.Value(0)).current;

  const handleSearch = () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
    } else {
      navigation.navigate('Weather', { city });
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
    Animated.timing(animationValue, {
      toValue: showInput ? 0 : 1,
      duration: 150, // Длительность анимации в миллисекундах
      useNativeDriver: false,
    }).start();
    if (!showInput) {
      // Переводим фокус на TextInput, если showInput становится true
      inputRef.current.focus();
    }
  };

  const inputOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logo}>Home</Text>

      <Animated.View
        style={[
          styles.inputContainer,
          { opacity: inputOpacity },
          showInput, // Меняем ширину в зависимости от видимости
        ]}>
        <TextInput
          ref={inputRef} // Привязываем реф к TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
          onSubmitEditing={handleSearch}
        />
      </Animated.View>
      <TouchableOpacity onPress={toggleInput}>
        {!showInput && (
          <Image
            source={searchIcon}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
        )}
        {showInput && (
          <Image
            source={closeIcon}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#F9F9F9',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
});

export default Header;
