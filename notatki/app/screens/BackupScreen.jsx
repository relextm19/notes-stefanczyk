import { View, Text, Button, StyleSheet, Alert, Pressable } from "react-native";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";


const BackupScreen = () => {
    const [status, setStatus] = useState("");
    const [statusKind, setStatusKind] = useState("");

    async function getServerAddress() {
        const address = await SecureStore.getItemAsync("dbAddress");
        const port = await SecureStore.getItemAsync("dbPort");

        return `http://${address}:${port}`;
    }

    async function createBackup() {
        try {
            const stored = await SecureStore.getItemAsync("notes");
            const notes = stored ? JSON.parse(stored) : [];
            const url = await getServerAddress();

            if (!url || url.includes("undefined")) {
                setStatusKind("error");
                setStatus("Ustaw adres i port serwera w ustawieniach");
                return;
            }

            const response = await fetch(
                `${url}/api/task`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(notes)
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Nie udało się zapisać kopii zapasowej");
            }

            setStatusKind("success");
            setStatus("Kopia zapasowa zapisana");
        }
        catch (error) {
            setStatusKind("error");
            setStatus(error.message || "Wystąpił błąd");
        }
    }

    async function restoreBackup() {
        try {
            const url = await getServerAddress();
            const response = await fetch(
                `${url}/api/task`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Nie udało się pobrać kopii zapasowej");
            }

            await SecureStore.setItemAsync(
                "notes",
                JSON.stringify(data)
            );
            setStatusKind("success");
            setStatus("Kopia zapasowa pobrana");
        }
        catch (error) {
            setStatusKind("error");
            setStatus(error.message || "Wystąpił błąd");
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.primaryButton} onPress={createBackup}>
                <Text style={styles.primaryButtonText}>Utwórz kopię zapasową</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={restoreBackup}>
                <Text style={styles.secondaryButtonText}>Pobierz kopię zapasową</Text>
            </Pressable>

            {!!status && (
                <View style={[styles.statusBox, statusKind === "error" ? styles.errorBox : styles.successBox]}>
                    <Text style={[styles.statusText, statusKind === "error" ? styles.errorText : styles.successText]}>
                        {status}
                    </Text>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0b1220",
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
    statusBox: {
        marginTop: 16,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
    },
    successBox: {
        backgroundColor: "#052e16",
        borderColor: "#166534",
    },
    errorBox: {
        backgroundColor: "#2a0f14",
        borderColor: "#7f1d1d",
    },
    statusText: {
        fontSize: 15,
        fontWeight: "700",
    },
    successText: {
        color: "#86efac",
    },
    errorText: {
        color: "#fca5a5",
    }
});


export default BackupScreen;