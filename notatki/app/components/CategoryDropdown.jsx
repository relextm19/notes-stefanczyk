import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CategoryDropdown = ({ label, value, options, onChange }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(options);

    useEffect(() => {
        setItems(options);
    }, [options]);

    return (
        <View style={styles.card}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={onChange}
                setItems={setItems}
                placeholder={label}
                style={styles.trigger}
                textStyle={styles.triggerText}
                dropDownContainerStyle={styles.menu}
                listItemLabelStyle={styles.optionText}
                tickIconStyle={styles.tick}
                arrowIconStyle={styles.arrow}
                placeholderStyle={styles.placeholder}
                itemSeparator={true}
                listItemContainerStyle={styles.option}
                listMode="SCROLLVIEW"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
        zIndex: 1000,
    },
    trigger: {
        backgroundColor: "#0f172a",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#334155",
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    triggerText: {
        color: "#f8fafc",
        fontSize: 16,
        fontWeight: "600",
    },
    placeholder: {
        color: "#94a3b8",
        fontSize: 16,
        fontWeight: "600",
    },
    arrow: {
        color: "#cbd5e1",
    },
    menu: {
        backgroundColor: "#0f172a",
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 14,
        overflow: "hidden",
        marginTop: 8,
    },
    option: {
        backgroundColor: "#0f172a",
        borderBottomWidth: 1,
        borderBottomColor: "#1e293b",
    },
    optionText: {
        color: "#e2e8f0",
        fontSize: 15,
        fontWeight: "600",
    },
    optionTextSelected: {
        color: "#38bdf8",
    },
    tick: {
        tintColor: "#38bdf8",
    },
});

export default CategoryDropdown;