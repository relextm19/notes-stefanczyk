import { View, StyleSheet, Text, TextInput, Button, Pressable } from "react-native"
import { useState } from "react";
import * as SecureStore from 'expo-secure-store'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';

const AddCategoryScreen = ({ navigation }) => {
    const [category, onChangeCategory] = useState('');

    async function addCategory() {
        const stored = await SecureStore.getItemAsync('categories');
        if (stored) {
            const categories = JSON.parse(stored)

            categories.push(category)

            await SecureStore.setItemAsync('categories', JSON.stringify(categories));
            navigation.navigate('dodaj notatkę')
        }
        else {
            const data = [category]

            await SecureStore.setItemAsync('categories', JSON.stringify(data));
            navigation.navigate('dodaj notatkę')
        }
    }

    async function resetCategory() {
        const result = await SecureStore.getItemAsync('categories');
        if (result) {
            await SecureStore.deleteItemAsync('categories')
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.secondaryButton} onPress={resetCategory}>
                <Text style={styles.secondaryButtonText}>Resetuj kategorie</Text>
            </Pressable>

            <TextInput
                style={styles.input}
                onChangeText={onChangeCategory}
                placeholder="Nazwa kategorii"
                placeholderTextColor="#64748b"
            />

            <Pressable style={styles.primaryButton} onPress={addCategory}>
                <Text style={styles.primaryButtonText}>Dodaj kategorie</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0b1220",
    },

    input: {
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16,
        color: "#e5e7eb",
    },

    primaryButton: {
        backgroundColor: "#0ea5e9",
        borderRadius: 12,
        overflow: "hidden",
        alignItems: "center",
        paddingVertical: 14,
        marginBottom: 12,
    },

    primaryButtonText: {
        color: "#f8fafc",
        fontSize: 16,
        fontWeight: "800",
    },

    secondaryButton: {
        backgroundColor: "#1e293b",
        borderRadius: 12,
        overflow: "hidden",
        alignItems: "center",
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#334155",
    },

    secondaryButtonText: {
        color: "#e2e8f0",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default AddCategoryScreen