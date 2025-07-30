import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>DND Inventory Companion</Text>
      <Button title="Open Inventory" onPress={() => navigation.navigate('Inventory')} />
    </View>
  );
}

function InventoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Your Inventory</Text>
      {/* Later: Replace with list of items */}
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
}

function AddItemScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Select a Category to Add</Text>
      <Button title="Magic Items" onPress={() => navigation.goBack()} />
      <Button title="Potions" onPress={() => navigation.goBack()} />
      <Button title="Scrolls" onPress={() => navigation.goBack()} />
      <Button title="Non-Magical" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
