import { Stack } from "expo-router";
import { ItemCreationProvider } from "../../../../contexts/ItemCreationContext";

export default function AddItemLayout(){

    return(
        <ItemCreationProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="selectIcon"/>
            </Stack>
        </ItemCreationProvider>
    )
}