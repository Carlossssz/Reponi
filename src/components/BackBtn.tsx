import { View, StyleSheet, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {router} from "expo-router";

export function  BackBtn(){
    function goBack(){
        router.back();
    }

    return(
        <Pressable style={styles.btn} onPress={() => goBack()}>
            <FontAwesome name="arrow-circle-left" size={50} color="#000" style={{position: 'absolute'}} />
            <FontAwesome name="arrow-circle-left" size={50} color="#fff" style={styles.shadow}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginRight: 15,
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
    },
    shadow: {
        right: 2,
        bottom: 2
    }
})