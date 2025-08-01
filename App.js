import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Inventory Companion</Text>
      <Button title="Open Inventory" onPress={() => navigation.navigate('Inventory')} />
    </View>
  );
}

function InventoryScreen({ navigation, inventory }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Your Inventory</Text>
      {inventory.map((item, index) => (
        <Text key={index}>
          {item.category}: {item.name}
        </Text>
      ))}
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
}

function AddItemScreen({ navigation }) {
  const categories = ['Magic Items', 'Potions', 'Scrolls', 'Non-Magical'];

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Select a Category</Text>
      {categories.map((cat) => (
        <Button
          key={cat}
          title={cat}
          onPress={() => navigation.navigate('AddItemDetails', { category: cat })}
        />
      ))}
    </View>
  );
}

function AddItemDetailsScreen({ route, navigation, addItem }) {
  const { category } = route.params;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = () => {
    addItem({ category, name, desc });
    navigation.navigate('Inventory');
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Add {category}</Text>
      <TextInput
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />
      <Button title="Save" onPress={handleAdd} />
    </View>
  );
}

export default function App() {
  const [inventory, setInventory] = useState([]);

  const addItem = (item) => {
    setInventory((prev) => [...prev, item]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Inventory">
          {(props) => <InventoryScreen {...props} inventory={inventory} />}
        </Stack.Screen>
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="AddItemDetails">
          {(props) => <AddItemDetailsScreen {...props} addItem={addItem} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});
