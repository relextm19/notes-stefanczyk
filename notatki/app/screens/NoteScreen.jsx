import { View, StyleSheet, TextInput, Button, FlatList, Text, Pressable } from "react-native"
import { useState } from "react";
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Note } from '../components/Note'

const NoteScreen = ({ navigation }) => {

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadNotes() {
            const stored = await SecureStore.getItemAsync('notes');
            const data = stored ? JSON.parse(stored) : [];
            setNotes(data);
        }

        if (isFocused) {
            loadNotes();
        }
    }, [isFocused]);

    async function deleteNote(id) {
        const updatedNotes = notes.filter(
            note => note.id !== id
        );

        setNotes(updatedNotes);

        await SecureStore.setItemAsync(
            'notes',
            JSON.stringify(updatedNotes)
        );
    }

    function editNote(id) {
        navigation.navigate("edytuj notatkę", { noteId: id });
    }

    async function resetNote() {
        let result = await SecureStore.getItemAsync('notes');
        if (result) {
            await SecureStore.deleteItemAsync('notes');
        }
        setNotes([])
    }

    const filteredNotes = notes.filter(note => {
        const text = search.toLowerCase();
        const categoryText = note.category ? note.category.toLowerCase() : "";

        return (
            note.name.toLowerCase().includes(text) ||
            note.content.toLowerCase().includes(text) ||
            categoryText.includes(text)
        );
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder="Wyszukiwanie..."
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#64748b"
            />

            <Pressable style={styles.dangerButton} onPress={resetNote}>
                <Text style={styles.dangerButtonText}>Usuń wszystkie notatki</Text>
            </Pressable>

            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Note
                        name={item.name}
                        content={item.content}
                        category={item.category}
                        date={item.date}
                        onLongPress={() => deleteNote(item.id)}
                        onPress={() => editNote(item.id)}
                    />
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0b1220",
    },

    search: {
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        color: "#e5e7eb",
    },

    dangerButton: {
        backgroundColor: "#1e293b",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#334155",
        alignItems: "center",
        paddingVertical: 12,
    },

    dangerButtonText: {
        color: "#e2e8f0",
        fontWeight: "700",
        fontSize: 15,
    },
});

export default NoteScreen;