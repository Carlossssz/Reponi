import { Colors } from "@/constants/theme";
import { StyleSheet, Pressable } from "react-native";
import type { Dispatch, SetStateAction } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
    state: Dispatch<SetStateAction<boolean>>

}

export function OpenListsBtn({ state }: Props) {
    function openList() {
        state(true);
    }

    return (
        <Pressable style={styles.box} onPress={openList}>
            <MaterialCommunityIcons name="playlist-plus" size={40} color={Colors.background} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.buttom,
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 40,
        minHeight: 40,
        maxHeight: 55,
        maxWidth: 55
    },

})