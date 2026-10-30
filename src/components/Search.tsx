import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { Colors } from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

export function Search() {
    const [value, setValue] = useState('')

    return (
        <View style={styles.box}>
            <Pressable
                style={[styles.arrow, { backgroundColor: value == "" ? Colors.nav : Colors.buttom }]}
                onPress={() => {
                    setValue('')
                }}
            >
                <FontAwesome name="arrow-left" size={30} color={value == "" ? "#00000040" : "#000"} />
            </Pressable>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder="Procurar..."
                placeholderTextColor={Colors.placeholder}
                maxLength={100}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 15,
        
        borderRadius: 10

    },
    input: {
        backgroundColor: Colors.input,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 54,
        flex: 1,
        paddingHorizontal: 20,
        color: "#fff",
        fontSize: 20,
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderColor: Colors.buttom,
    },

    arrow: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },

})