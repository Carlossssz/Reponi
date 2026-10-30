import { View, StyleSheet } from "react-native";
import { Search } from "@/components/Search";
import { useEffect } from "react";
import { initializeAppDatabase } from "../../../database/init";

export default function HomeScreen() {

  useEffect(() => {
    initializeAppDatabase();
  }, []);

  return (
    <View style={styles.page}>
      <Search />
    </View>

  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 15,
  },

  background: {
    ...StyleSheet.absoluteFill,
    width: undefined,
    height: undefined,
    opacity: 0.1,
  }
})