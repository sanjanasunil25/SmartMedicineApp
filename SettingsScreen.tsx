import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Slider } from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [bigText, setBigText] = useState(false);

  return (
    <View style={[styles.container, darkMode ? { backgroundColor: "#222" } : {}]}>
      <Text style={[styles.title, darkMode ? { color: "#fff" } : {}]}>⚙️ Settings</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.label, darkMode ? { color: "#fff" } : {}]}>🌙 Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.label, darkMode ? { color: "#fff" } : {}]}>🔎 Bigger Text</Text>
        <Switch value={bigText} onValueChange={setBigText} />
      </View>

      <Text style={[styles.note, darkMode ? { color: "#bbb" } : {}]}>
        Settings will make the app easier for elders.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  settingItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 15 },
  label: { fontSize: 20 },
  note: { fontSize: 16, marginTop: 20 },
});
