import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { deleteItem, fetchItems, initDatabase, insertItem } from './database';

interface ShoppingItem
{
  id: number
  product: string
  amount: string
}

export default function App() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() =>
  {
      initDatabase()
      refreshList()
  },
  []
  )
  const refreshList = () => {
    fetchItems(setItems);
  };

  const handleAddItem = () =>
  {
    if (product && amount)
    {
      insertItem(product,amount)
      setProduct('')
      setAmount('')
      refreshList()
    }
  }

  const handleDeleteItem = (id: number) => {
    deleteItem(id); 
    refreshList();
};



  return (
      <View style={styles.container}>
        <TextInput
        placeholder="Product"
        style={styles.input}
        onChangeText={setProduct}
        value={product}

        />
        <TextInput
        placeholder="Amount"
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        />
      <Button
        title="Save" onPress={handleAddItem}
      />
      <Text style={styles.heading}>SHOPPING LIST &lt;3</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{`${item.product}, ${item.amount}`}</Text>
            <Button title="Bought" onPress={() => handleDeleteItem(item.id)} />
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 5,
  },heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue',
    width: '80%',
    margin: 30,
    alignContent: 'center'
  }
});
