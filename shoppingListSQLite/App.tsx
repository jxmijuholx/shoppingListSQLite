import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Icon, Input, ListItem, Text } from 'react-native-elements';
import { deleteItem, fetchItems, initDatabase, insertItem } from './database';

interface ShoppingItem {
  id: number;
  product: string;
  amount: string;
}

export default function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    initDatabase();
    refreshList();
  }, []);

  const refreshList = () => {
    fetchItems(setItems);
  };

  const handleAddItem = () => {
    if (product && amount) {
      insertItem(product, amount);
      setProduct('');
      setAmount('');
      refreshList();
    }
  };

  const handleDeleteItem = (id: number) => {
    deleteItem(id);
    refreshList();
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Product"
        onChangeText={setProduct}
        value={product}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Amount"
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Button
        title="Save"
        onPress={handleAddItem}
        buttonStyle={styles.button}
      />
      <Text h4 style={styles.heading}>SHOPPING LIST </Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{`${item.product}, ${item.amount}`}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name="check"
              type="feather"
              onPress={() => handleDeleteItem(item.id)}
            />
          </ListItem>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  input: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    textAlign: 'center',
    marginVertical: 20,
  }
});
