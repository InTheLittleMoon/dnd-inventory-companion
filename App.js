import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  SectionList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Inventory Companion</Text>
      <Button
        title="Open Inventory"
        onPress={() => navigation.navigate("Inventory")}
      />
    </View>
  );
}

function groupByCategory(items) {
  const categories = ["Magic Items", "Potions", "Scrolls", "Non-Magical"];

  return categories.map((cat) => ({
    title: cat,
    data: items.filter((item) => item.category === cat),
  }));
}

function InventoryScreen({ navigation, inventory }) {
  const sections = groupByCategory(inventory);

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            {item.desc ? (
              <Text style={{ color: "#666" }}>{item.desc}</Text>
            ) : null}
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              backgroundColor: "#eee",
              padding: 6,
            }}
          >
            {section.title}
          </Text>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No items yet
          </Text>
        }
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={{ padding: 10 }}>
        <Button
          title="Add Item"
          onPress={() => navigation.navigate("AddItem")}
        />
      </View>
    </View>
  );
}

function AddItemScreen({ navigation }) {
  const categories = ["Magic Items", "Potions", "Scrolls", "Non-Magical"];

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Select a Category</Text>
      {categories.map((cat) => (
        <Button
          key={cat}
          title={cat}
          onPress={() =>
            navigation.navigate("AddItemDetails", { category: cat })
          }
        />
      ))}
    </View>
  );
}

function AddItemDetailsScreen({ route, navigation, addItem }) {
  const { category } = route.params;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    addItem({ category, name, desc });
    navigation.navigate("Inventory");
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 20, marginBottom: 20 },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});
