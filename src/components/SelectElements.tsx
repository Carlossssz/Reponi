import { Colors, Shadows, textShadow } from "@/constants/theme";
import { View, StyleSheet, Pressable, ScrollView, Text } from "react-native";
import { ItemSelect } from "./ItemSelect";
import type { Dispatch, SetStateAction } from "react";
import { getAllVolumes, type Volume } from "../../database/CRUDs/volumesCRUD";
import { getAllCategorias, type Categoria } from "../../database/CRUDs/categoriasCRUD";
import { useEffect, useState } from "react";

type Props = {
    typeList: "VL" | "CT",
    state: Dispatch<SetStateAction<boolean>>,
}

export function SelectElements({ typeList, state }: Props) {
    const [volumes, setVolumes] = useState<Volume[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        async function pegarValores() {
            try {
                if (typeList === "VL") {
                    const result = await getAllVolumes();
                    setVolumes(result);
                } else {
                    const result = await getAllCategorias();
                    setCategorias(result);
                }
            } catch (error) {
                console.error("Erro ao carregar opções:", error);
            }
        }

        pegarValores();
    }, [typeList]);

    function confirm() {
        state(false);
    }

    return (
        <View style={styles.areaDeRestricao}>
            <View style={styles.box}>
                <Text style={styles.title}>{typeList === "VL" ? "Volume" : "Categoria"}</Text>
                <ScrollView style={styles.scrollBox} contentContainerStyle={{ alignItems: "flex-start", paddingBottom: 200, paddingHorizontal: 10 }}>
                    {
                        typeList === "VL" ? volumes.map(item => (
                            <ItemSelect key={item.id} id={item.id} value={item.valor} typeList='VL' />
                        ))
                            : categorias.map(item => (
                                <ItemSelect key={item.id} id={item.id} value={item.nome} typeList='CT' />
                            ))

                    }
                </ScrollView>

                <View style={styles.footer}>
                    <Pressable style={styles.confirm} onPress={confirm}>
                        <Text style={{ color: "#fff", fontSize: 24, ...textShadow, fontFamily: 'BlackOpsOne' }}>Confirmar</Text>
                    </Pressable>
                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    areaDeRestricao: {
        position: 'absolute',
        backgroundColor: "#1e1929b9",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },

    box: {
        width: "80%",
        height: "75%",
        backgroundColor: Colors.body,
        paddingTop: 20,
        borderRadius: 10,
        overflow: 'hidden',

    },

    title: {
        ...textShadow,
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        fontFamily: 'BlackOpsOne',
        marginBottom: 20,
    },

    scrollBox: {
        width: "100%",
        height: "100%",
        paddingVertical: 40,

    },

    footer: {
        position: "absolute",
        backgroundColor: Colors.body,
        bottom: 0,
        width: "100%",
        height: 150,
        paddingTop: 40,
        alignItems: "center",
    }
    ,
    confirm: {
        width: 200,
        height: 60,
        backgroundColor: Colors.buttom,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: Shadows.blockShadow,
        borderRadius: 5
    }
})