import { Colors, Shadows } from "@/constants/theme";
import { Image, Pressable, StyleSheet } from "react-native";
import { Imagem } from "../../database/CRUDs/imagensCRUD";
import { useItemCreation } from "../../contexts/ItemCreationContext";
import {router} from 'expo-router';

export function ImagemBlock({ id, imagemNome, url }: Imagem) {
    const {item, setItem} = useItemCreation();

    function selecionarImagem(){
        setItem(objetoAnterior => ({
            ...objetoAnterior,
            icone: url,
        }));

        router.back();
    }

    return (
        <Pressable style={styles.block} onPress={selecionarImagem}>
            <Image
                source={{ uri: url }}
                style={styles.imagem}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    block: {
        width: 150,
        height: 150,
        backgroundColor: Colors.nav,
        boxShadow: Shadows.blockShadow,
        borderRadius: 15,
    },

    imagem: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
        boxShadow: Shadows.blockShadow
    }
})