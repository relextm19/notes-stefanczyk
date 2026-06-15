import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import Dialog from "react-native-dialog";


const SettingsScreen = () => {

    const [address, setAddress] = useState("");
    const [port, setPort] = useState("");

    const [tempAddress, setTempAddress] = useState("");
    const [tempPort, setTempPort] = useState("");

    const [visible, setVisible] = useState(false);

    const isFocused = useIsFocused();


    useEffect(() => {

        async function loadSettings() {
            const savedAddress = await SecureStore.getItemAsync("dbAddress");
            const savedPort = await SecureStore.getItemAsync("dbPort");

            setAddress(savedAddress || "");
            setPort(savedPort || "");

            setTempAddress(savedAddress || "");
            setTempPort(savedPort || "");

            setVisible(true);
        }

        if (isFocused) {
            loadSettings();
        }
    }, [isFocused]);


    async function saveSettings() {
        await SecureStore.setItemAsync(
            "dbAddress",
            tempAddress
        );
        await SecureStore.setItemAsync(
            "dbPort",
            tempPort
        );

        setAddress(tempAddress);
        setPort(tempPort);
        setVisible(false);
    }

    return (
        <View style={styles.container}>

            <View style={styles.hero}>
                <Text style={styles.heading}>Ustawienia bazy</Text>
                <Text style={styles.subheading}>Zmień adres i port serwera, z którego korzysta backup.</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.text}>Adres bazy: {address}</Text>
                <Text style={styles.text}>Port: {port}</Text>
            </View>

            <Dialog.Container visible={visible}>

                <Dialog.Title>
                    Ustawienia bazy danych
                </Dialog.Title>

                <Dialog.Input
                    value={tempAddress}
                    onChangeText={setTempAddress}
                    placeholder="Adres IP"
                />

                <Dialog.Input
                    value={tempPort}
                    onChangeText={setTempPort}
                    placeholder="Port"
                    keyboardType="numeric"
                />

                <Dialog.Button
                    label="Anuluj"
                    onPress={() => setVisible(false)}
                />

                <Dialog.Button
                    label="Zapisz"
                    onPress={saveSettings}
                />

            </Dialog.Container>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0b1220",
    },

    hero: {
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },

    heading: {
        color: "#f8fafc",
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 4,
    },

    subheading: {
        color: "#94a3b8",
        fontSize: 14,
        lineHeight: 20,
    },

    info: {
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 12,
        padding: 15,
    },

    text: {
        fontSize: 16,
        color: "#e5e7eb",
        marginBottom: 8,
        fontWeight: "bold",
    },
});


export default SettingsScreen;