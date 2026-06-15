import { View, StyleSheet, Text, TextInput, Button, FlatList, Pressable } from "react-native"
import { useState } from "react";
import * as SecureStore from 'expo-secure-store'

export function Note({ name, content, category, date, onLongPress, onPress }) {
    const displayCategory = category || "Bez kategorii";

    return (
        <Pressable onLongPress={onLongPress} onPress={onPress}>
            <View style={styles.note}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.content}>{content}</Text>
                <View style={styles.categoryPill}>
                    <Text style={styles.category}>{displayCategory}</Text>
                </View>
                <Text style={styles.date}>{date}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    note: {
        padding: 15,
        margin: 10,
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 12,
    },

    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#f8fafc",
        marginBottom: 8,
    },

    content: {
        fontSize: 15,
        color: "#cbd5e1",
        marginBottom: 6,
    },

    categoryPill: {
        alignSelf: "flex-start",
        backgroundColor: "#0f172a",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        marginTop: 2,
        borderWidth: 1,
        borderColor: "#334155",
    },

    category: {
        fontSize: 13,
        color: "#e2e8f0",
        fontWeight: "600",
    },
    date: {
        fontSize: 12,
        color: "#94a3b8",
        marginTop: 8,
    }
});