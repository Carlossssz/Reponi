import { Colors, useResponsiveFontSize, Shadows, textShadow } from "@/constants/theme";
import { View, StyleSheet, Text, TextInput, Pressable, ScrollView, Image, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from "react";
import { OpenListsBtn } from "@/components/OpenListsBtn";
import { SelectElements } from "@/components/SelectElements";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useItemCreation } from "../../../../contexts/ItemCreationContext";
import { toUpperCaseFirstLetter } from '../../../../scripts/toUpperCaseFirstLetter';
import { ListElements } from "@/components/ListElements";
import { getVolumesPerList, type Volume } from '../../../../database/CRUDs/volumesCRUD';
import { getCategoriasPerList, type Categoria } from "../../../../database/CRUDs/categoriasCRUD";

export default function AddItem() {
    const { item, setItem, resetItem } = useItemCreation(); //Importa o itemContext de itemCreationContext.tsx
    const [volumesList, setVolumesList] = useState<Volume[] | []>([]); //Apenas para visual
    const [categoriasList, setCategoriasList] = useState<Categoria[] | []>([]); //Apenas para visual
    const [selectVolume, setSelectVolume] = useState(false);
    const [selectCategoria, setSelectCategoria] = useState(false);
    const responsiveFontSize = useResponsiveFontSize()

    function selectIcon() {
        router.push('/config/addItem/selectIcon');
    }

    useEffect(() => {
        async function getElements() { //Pegar os elementos do database, que foram seleciodos na list de volume e categoria
            const volumes = await getVolumesPerList(item.volumes);
            const categorias = await getCategoriasPerList(item.categorias);

            setVolumesList(volumes);
            setCategoriasList(categorias);
        }

        getElements();
    }, [item.categorias, item.volumes]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.page}>
                <ScrollView style={styles.scrollBody}>
                    {/* PARTE QUE TEM O ICONE E O NOME */}
                    <View style={styles.top}>
                        <Pressable onPress={selectIcon}>
                            {item.icone ?
                                <View style={styles.icon}>
                                    <Image
                                        source={{ uri: item.icone }}
                                        style={{ width: "100%", height: "100%" }}
                                        resizeMode='contain'
                                    />
                                </View>
                                :
                                <View style={styles.icon}>
                                    <MaterialCommunityIcons name="image-plus" size={100} color="#fff" />
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Adicionar Icone</Text>
                                </View>
                            }
                        </Pressable>

                        <View style={styles.AreaName}>
                            <Text style={styles.nameLabel}>Nome do Item</Text>
                            <TextInput
                                value={item.nome}
                                onChangeText={(texto) => {
                                    setItem(objetoAnterior => ({
                                        ...objetoAnterior,
                                        nome: texto,
                                    }))
                                }}
                                onEndEditing={() => {
                                    setItem(objetoAnterior => ({
                                        ...objetoAnterior,
                                        nome: toUpperCaseFirstLetter(objetoAnterior.nome),
                                    }))
                                }}
                                maxLength={30}
                                autoCapitalize="none"
                                style={styles.nameInput}
                                placeholder="Ex.: Coca Cola"
                                placeholderTextColor={Colors.placeholder}
                            />
                        </View>
                    </View>

                    <View style={styles.center}>

                        {/* VOLUMES */}
                        <View style={styles.listBox}>
                            <View style={styles.listHeader}>
                                <Entypo name="drink" size={40} color={Colors.buttom} style={styles.tag} />
                                <Text style={[styles.title, { fontSize: responsiveFontSize }]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">Volume</Text>
                                <View style={styles.plusBox}>
                                    <OpenListsBtn state={setSelectVolume} />
                                </View>
                            </View>
                            <Text style={styles.legend}>Selecione o(os) volume(s) do item.</Text>

                            <View style={styles.listElementsBox}>
                                {volumesList.map(item => (
                                    <ListElements
                                        key={item.id}
                                        text={item.valor} />
                                ))}
                            </View>
                        </View>

                        {/* CATEGORIAS */}
                        <View style={styles.listBox}>
                            <View style={styles.listHeader}>
                                <AntDesign name="tags" size={40} color={Colors.buttom} style={styles.tag} />
                                <Text style={[styles.title, { fontSize: responsiveFontSize }]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">Categoria</Text>

                                <View style={styles.plusBox}>
                                    <OpenListsBtn state={setSelectCategoria} />
                                </View>

                            </View>
                            <Text style={styles.legend}>Selecione a(s) categoria(s) do item.</Text>

                            <View style={styles.listElementsBox}>
                                {categoriasList.map(item => (
                                    <ListElements
                                        key={item.id}
                                        text={item.nome} />
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>


                {/* AREA DE BOTOES CANCELAR E SALVAR ITEM */}
                <View style={styles.footer}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{
                            width: "35%",
                            maxHeight: 80,
                            height: '80%',
                            borderWidth: 1,
                            borderColor: Colors.buttom,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>
                        <Text style={{ color: Colors.buttom, fontSize: responsiveFontSize, fontWeight: 'bold' }}>Cancelar</Text>
                    </Pressable>

                    <Pressable style={{
                        width: "35%",
                        height: '80%',
                        maxHeight: 80,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: "center",
                        flexDirection: 'row',
                        gap: 5,
                        backgroundColor: Colors.buttom
                    }}>
                        <FontAwesome name="save" size={30} color="#fff" />
                        <Text style={{ color: "#fff", fontSize: responsiveFontSize, fontWeight: 'bold' }}>Salvar Item</Text>
                    </Pressable>
                </View>
            </View>
            
            {selectVolume && <SelectElements typeList="VL" state={setSelectVolume} />}
            {selectCategoria && <SelectElements typeList="CT" state={setSelectCategoria} />}
        </View>

    )
}

const formatBlock = {
    borderRadius: 5,
    boxShadow: Shadows.blockShadow
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 15
    },

    top: {
        backgroundColor: Colors.body,
        width: "100%",
        height: 200,
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20
    },

    scrollBody: {
        width: '100%',
        flex: 1,
    },

    icon: {
        backgroundColor: Colors.nav,
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 25,
        overflow: 'hidden'
    },

    AreaName: {
        height: 150,
        flex: 1,
        justifyContent: "center"
    },
    nameInput: {
        ...textShadow,
        width: "100%",
        height: 60,
        paddingHorizontal: 20,
        fontSize: 20,
        backgroundColor: Colors.input,
        color: "white",
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.buttom,
        marginTop: 10
    },
    nameLabel: {
        ...textShadow,
        fontSize: 25,
        color: "#fff",
        fontFamily: 'BlackOpsOne'
    },

    center: {
        width: '100%',
        minHeight: 300,
        flexDirection: "row",
        justifyContent: "center",
        gap: 5
    },

    //////////////////////////List Elements///////////////////


    listBox: {
        backgroundColor: Colors.body,
        borderRadius: 10,
        padding: 10,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"

    },

    listElementsBox: {
        flexDirection: "row",
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: "flex-start",
        padding: 5

    },

    listHeader: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center"
    },

    tag: {
        marginRight: 10,
    },

    title: { //titulo "Volume" e "Categoria"
        color: "#fff",
        marginRight: 10,

    },

    plusBox: { //Caixa que contém o icone para abrir a lista de volumes e categorias.
        marginLeft: 'auto',
        // backgroundColor: 'orange',
    },

    legend: { //texto pequeno abaixo 'Selecione a(s)...'
        color: Colors.placeholder,
        width: "100%"
    },

    footer: {
        width: "100%",
        height: "15%",
        borderTopWidth: 1,
        borderColor: Colors.nav,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: 150,

    },


})