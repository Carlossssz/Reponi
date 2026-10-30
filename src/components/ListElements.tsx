import { Colors } from "@/constants/theme";
import {View, Text, StyleSheet} from "react-native";

type Props = {
    text: string
}

export function ListElements({text} : Props){

    return(
        <View style={styles.box}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        minWidth: 100,
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.nav,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        color: "#fff",
        fontSize: 20
    }
})