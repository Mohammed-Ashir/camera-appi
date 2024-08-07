// src/components/SearchScreen.js
import React, {useState} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import useStore from '../state/useStore';

// Sample user data
const users = [
  {id: '1', name: 'Aastha', username: 'aastha'},
  {id: '2', name: 'Jane', username: 'jane'},
  // Add more users
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const {setSearchResults} = useStore();

  const handleSearch = () => {
    const results = users.filter(
      user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
  };

  return (
    <View>
      <TextInput
        placeholder="Search users"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={useStore(state => state.searchResults)}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
