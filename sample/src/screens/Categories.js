import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }
        const json = await response.json();
        setCategories([...json, 'WangWen Chen']); // 添加你的名字到类别列表的末尾
      } catch (error) {
        console.error('Fetching error:', error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []);

const capitalizeFirstLetter = (string) => {
  return string.split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

const renderItem = ({ item }) => {
  if (item === 'WangWen Chen') {
    return (
      <View style={[styles.item, styles.developerNameItem]}>
        <Text style={[styles.title, styles.developerNameText]}>{item}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('CategoryProducts', { category: item });
      }}
    >
      <Text style={styles.title}>{capitalizeFirstLetter(item)}</Text>
    </TouchableOpacity>
  );
};

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Categories</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={categories}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 1, 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  developerNameItem: {
    backgroundColor: '#e0ffe0', // 淡绿色背景
  },
  developerNameText: {
    color: '#008000', // 绿色文本
    fontWeight: 'bold'
  }
});

export default Categories;
