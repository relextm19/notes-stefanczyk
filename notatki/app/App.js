import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from "@expo/vector-icons";

import NoteScreen from "./screens/NoteScreen"
import AddNoteScreen from "./screens/AddNoteScreen"
import AddCategoryScreen from "./screens/AddCategoryScreen"
import InfoScreen from "./screens/InfoScreen"
import EditNoteScreen from "./screens/EditNoteScreen"
import SettingsScreen from "./screens/SettingsScreen";
import BackupScreen from "./screens/BackupScreen";

const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({

          drawerIcon: ({ color, size }) => {

            let iconName;

            if (route.name === "notatki") {
              iconName = "document-text";
            }
            else if (route.name === "dodaj notatkę") {
              iconName = "add-circle";
            }
            else if (route.name === "dodaj kategorię") {
              iconName = "folder";
            }
            else if (route.name === "ustawienia") {
              iconName = "settings";
            }
            else if (route.name === "kopia zapasowa") {
              iconName = "cloud";
            }
            else if (route.name === "info") {
              iconName = "information-circle";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },

          drawerActiveTintColor: "#8a6500",
          drawerInactiveTintColor: "#cbd5e1",
          drawerStyle: {
            backgroundColor: "#0b1220",
          },
          drawerLabelStyle: {
            color: "#e5e7eb",
          },
          headerStyle: {
            backgroundColor: "#111827"
          },
          headerTintColor: "#f8fafc"
        })}
      >
        <Drawer.Screen name="notatki" component={NoteScreen} />
        <Drawer.Screen name="dodaj notatkę" component={AddNoteScreen} />
        <Drawer.Screen name="dodaj kategorię" component={AddCategoryScreen} />
        <Drawer.Screen name="ustawienia" component={SettingsScreen} />
        <Drawer.Screen name="kopia zapasowa" component={BackupScreen} />
        <Drawer.Screen name="info" component={InfoScreen} options={{ drawerLabel: "info", }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              Alert.alert(
                "Alert",
                "NotesApp, v.2.0.0"
              );
            },
          }}
        />
        <Drawer.Screen name="edytuj notatkę" component={EditNoteScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
