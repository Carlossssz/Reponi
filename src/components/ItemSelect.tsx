import { Colors, Shadows, textShadow } from "@/constants/theme";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useItemCreation } from "../../contexts/ItemCreationContext";

type Props = {
    typeList: 'VL' | 'CT',
    id: number,
    value: string
}

export function ItemSelect({ id, value, typeList }: Props) {
    const { item, setItem, resetItem } = useItemCreation(); //Importa o itemContext de itemCreationContext.tsx

    // Define qual propriedade do item será atualizada.
    // Se typeList for "VL", atualiza "volumes".
    // Caso contrário, atualiza "categorias".
    const propriedade = typeList === "VL" ? "volumes" : "categorias";

    // Verifica se o ID está selecionado no Context.
    const estado = item[propriedade].includes(id);

    function select() {
    setItem(itemAnterior => ({
        // Preserva as outras propriedades do item.
        ...itemAnterior,

        // Se o ID já estiver na lista, remove.
        // Caso contrário, adiciona.
        [propriedade]: itemAnterior[propriedade].includes(id) //[propriedade] é usado assim para passar o valor da variável "propriedade" que pode ser 'volumes' ou 'categorias', invés de criar um novo atributo para o objeto, chamado 'propriedade', por isso usa o colchetes.
            ? itemAnterior[propriedade].filter(idItem => idItem !== id) //aqui filtra os elementos, excluindo o id.
            : [...itemAnterior[propriedade], id], //aqui adiciona o id, caso n exista na lista.
    }));
}

    return (
        <View style={styles.box}>
            <Pressable style={[styles.check, estado ? { backgroundColor: "#5b84c8", boxShadow: Shadows.blockShadow } : { backgroundColor: "#ffffff62" }]} onPress={select}>
                {estado && <Feather name="check" size={44} color="white" />}
            </Pressable>
            <View style={styles.boxValue}>
                <Text style={{ color: "#fff", fontSize: 25, ...textShadow }}> • {value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 70,
        backgroundColor: Colors.nav,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        minWidth: "50%",
        alignItems: "center",
        boxShadow: '1px 1px 4px #0000007c'
    },

    check: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginRight: 20
    },

    boxValue: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})