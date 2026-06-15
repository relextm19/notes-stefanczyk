import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import CategoryDropdown from "../components/CategoryDropdown";

const AddNoteScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadCategories() {
            const stored = await SecureStore.getItemAsync("categories");
            const data = stored ? JSON.parse(stored) : [];

            setCategories(data);
            setCategory("");
        }

        if (isFocused) {
            loadCategories();
        }
    }, [isFocused]);

    async function addNote() {
        const stored = await SecureStore.getItemAsync("notes");
        const notes = stored ? JSON.parse(stored) : [];

        notes.push({
            id: Date.now().toString(),
            name,
            content,
            category,
            date: new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "short" })
        });

        await SecureStore.setItemAsync("notes", JSON.stringify(notes));
        navigation.navigate("notatki");
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nazwa notatki"
                placeholderTextColor="#64748b"
            />

            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                placeholder="Treść notatki"
                placeholderTextColor="#64748b"
            />

            <CategoryDropdown
                label="Kategoria"
                value={category}
                onChange={setCategory}
                options={[
                    { label: "Bez kategorii", value: "" },
                    ...categories.map(categoryName => ({ label: categoryName, value: categoryName })),
                ]}
            />

            <Pressable style={styles.primaryButton} onPress={addNote}>
                <Text style={styles.primaryButtonText}>Dodaj Notatkę</Text>
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
    },
    primaryButtonText: {
        color: "#f8fafc",
        fontSize: 16,
        fontWeight: "800",
    },
});

export default AddNoteScreen;