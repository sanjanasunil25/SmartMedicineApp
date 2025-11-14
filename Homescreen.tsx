import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

export default function HomeScreen() {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [dose, setDose] = useState("");
  const [list, setList] = useState<{ name: string; time: string; dose: string }[]>([]);

  const addMedicine = async () => {
    if (medicine && time) {
      const newItem = { name: medicine, time, dose: dose || "1" };
      setList([...list, newItem]);

      // Schedule notification after 5 sec (demo) 👉 You can change to real time later
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Time to take Medicine!",
          body: `${medicine} - ${dose || "1"} at ${time}`,
        },
        trigger: { seconds: 5 }, // for demo only
      });

      setMedicine("");
      setTime("");
      setDose("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 Smart Medicine Box</Text>
      <Text style={styles.subtitle}>Medicine Reminders Made Simple</Text>

      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={medicine}
        onChangeText={setMedicine}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g. 9:00 AM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Dose (e.g. 1 Tablet)"
        value={dose}
        onChangeText={setDose}
      />

      <TouchableOpacity style={styles.button} onPress={addMedicine}>
        <Text style={styles.buttonText}>➕ Add & Set Reminder</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>📝 Medicine List:</Text>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              {item.name} - {item.dose} at {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: "#f9f9f9" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#2a6f97" },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 20, color: "#444" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  button: { backgroundColor: "#0077b6", padding: 15, borderRadius: 10, alignItems: "center", marginVertical: 10 },
  buttonText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  listTitle: { fontSize: 22, fontWeight: "bold", marginTop: 20, marginBottom: 10, color: "#333" },
  listItem: { backgroundColor: "#caf0f8", padding: 15, borderRadius: 10, marginVertical: 5 },
  listText: { fontSize: 20, color: "#03045e" },
});

