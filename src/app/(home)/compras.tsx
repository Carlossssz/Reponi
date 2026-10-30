import { View, Text, StyleSheet} from "react-native"
import { Search } from "@/components/Search"

export default function Compras(){
  return(
    <View style={styles.page}>
        <Search />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 15
  }
})