import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import CategoryDropdown from "../components/CategoryDropdown";

const EditNoteScreen = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const isFocused = useIsFocused();

    const noteId = route.params.noteId;

    useEffect(() => {
        async function loadNote() {
            const storedCategories = await SecureStore.getItemAsync("categories");

            const cats = storedCategories ? JSON.parse(storedCategories) : [];

            setCategories(cats);
            setCategory("");


            const storedNotes = await SecureStore.getItemAsync("notes");

            const notes = storedNotes ? JSON.parse(storedNotes) : []



            const foundNote = notes.find(
                note => note.id === noteId
            );


            if (foundNote) {
                setName(foundNote.name);
                setContent(foundNote.content);
                setCategory(foundNote.category || "");
            }
        }


        loadNote();

    }, [isFocused, noteId]);


    async function editNote() {

        const stored = await SecureStore.getItemAsync("notes");

        const notes = JSON.parse(stored)

        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    name,
                    content,
                    category: category || ""
                };
            }
            return note;
        });


        await SecureStore.setItemAsync(
            "notes",
            JSON.stringify(updatedNotes)
        );


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

            <Pressable style={styles.primaryButton} onPress={editNote}>
                <Text style={styles.primaryButtonText}>Zapisz zmiany</Text>
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

export default EditNoteScreen;