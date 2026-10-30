import { ImagemBlock } from "@/components/ImagemBlock";
import { Colors, Shadows } from "@/constants/theme";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Directory, File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { getAllImagens, Imagem, salvarImagem } from "../../../../database/CRUDs/imagensCRUD";


export default function SelectIcon() {
    const [allImages, setAllImages] = useState<Imagem[]>([])

    async function loadImages() {
        const images = await getAllImagens();
        setAllImages(images);
    }

    useEffect(() => {
        loadImages();
    }, []);

    async function pickImage() {
        try {
            // Abre o seletor nativo e permite múltiplas imagens.
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsMultipleSelection: true,
                selectionLimit: 0,
                quality: 1,
            });

            // Encerra se o usuário cancelar.
            if (result.canceled) return;

            // Prepara o diretório privado.
            const imagesDir = new Directory(Paths.document, "images");
            imagesDir.create({
                idempotent: true,
                intermediates: true,
            });

            //Chama o banco de dados

            // Processa cada imagem selecionada.
            for (const image of result.assets) {
                // Tenta extrair a extensão do nome original.
                const extension =
                    image.fileName?.split(".").pop() || "jpg";

                // Cria um nome de destino.
                const destination = new File(
                    imagesDir,
                    `item-${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
                );

                // Copia o arquivo para o armazenamento privado.
                new File(image.uri).copy(destination);


                // Insere a imagem ao banco dedados passando nome e url
                await salvarImagem(destination.name, destination.uri);
            }


        } catch (error) {
            // Registra o erro para diagnóstico.
            console.error(error);

            // Informa ao usuário que a operação falhou.
            Alert.alert("Erro", "Não foi possível selecionar as imagens.");
        }

        await loadImages();
    }


    return (
        <View style={styles.page}>
            <ScrollView style={styles.scroll} contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", gap: 10, paddingBottom: 200}}>
                <Pressable style={styles.addIcon} onPress={pickImage}>
                    <FontAwesome5 name="plus" size={60} color={Colors.background} />
                </Pressable>

                {allImages.map((img) => (
                    <ImagemBlock key={img.id} id={img.id} imagemNome={img.imagemNome} url={img.url} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingVertical: 20,
        alignItems: "center",
        backgroundColor: Colors.background
    },

    scroll: {
        width: '79%'
    },

    addIcon: {
        width: 150,
        height: 150,
        backgroundColor: Colors.buttom,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: Shadows.blockShadow
    }
})