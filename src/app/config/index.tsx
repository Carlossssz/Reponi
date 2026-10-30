import { Search } from "@/components/Search";
import { Colors, Shadows, textShadow } from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Config() {
    function pressAddItemBtn() {
        router.push("/config/addItem");
    }

    return (
        <View style={styles.page}>

            <View style={styles.boxBotoes}>
                <Pressable style={styles.addItemBtn} onPress={pressAddItemBtn}>
                    <FontAwesome name="plus" size={24} color="#fff" />
                    <Text style={{ textAlign: "center", fontSize: 20, color: '#fff', fontWeight: "bold", ...textShadow }}>Adicionar {'\n'} Item</Text>
                </Pressable>
                <View style={styles.moreBtn}>

                </View>
            </View>

            <View style={styles.searchBox}>
                <Search />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        alignItems: "center",
        padding: 15
    },

    boxBotoes: {
        width: "95%",
        height: 120,
        // boxShadow: '2px 2px 5px #00000077',
        borderRadius: 15,
        marginBottom: 10,
        flexDirection: "row",
        gap: 5
    },

    searchBox: {
        width: '95%'
    },

    addItemBtn: {
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: Shadows.blockShadow,
        borderRadius: 15,
        backgroundColor: Colors.buttom
    },
    moreBtn: {
        backgroundColor: Colors.nav,
        height: "100%",
        flex: 1,
        borderRadius: 15
    }
})