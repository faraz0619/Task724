import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Items = () => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const getItem = async () => {
    setLoading(true);
    const url = 'https://jsonplaceholder.typicode.com/posts';
    let response = await fetch(url);
    response = await response.json();
    setItems(response);
    setLoading(false);
  };

  useEffect(() => {
    getItem();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footerView}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.footerText}>Footer</Text>
        )}
      </View>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  title: {
    color:"black",
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
  footerView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62b1e3',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
