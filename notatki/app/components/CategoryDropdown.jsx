import { useEffect, useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CategoryDropdown = ({ label, value, options, onChange }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(options);

    useEffect(() => {
        setItems(options);
    }, [options]);

    return (
        <View style={{ zIndex: 1000, marginBottom: 12 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={onChange}
                setItems={setItems}
                placeholder={label}
                theme="DARK"
                listMode="SCROLLVIEW"
            />
        </View>
    );
};

export default CategoryDropdown;