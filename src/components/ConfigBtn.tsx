import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View, Pressable } from "react-native";
import {router} from "expo-router"

export function ConfigBtn() {
    function goConfig(){
        router.push("/config")
    }

    return (
        <Pressable style={styles.box} onPress={() => goConfig()}>
            <FontAwesome name="gear" size={50} color="white" style={styles.gear}/>
            <FontAwesome name="gear" size={50} color="black" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        marginRight: 15,

    },

    gear: {
        position: "absolute",
        zIndex: 1,
        right: 3,
        bottom: 3
    }
})