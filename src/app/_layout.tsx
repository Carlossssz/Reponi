import { Stack } from "expo-router";

export default function RootLayout(){
    return(
        <Stack 
            screenOptions={{headerShown: false}}
            initialRouteName="(home)"
        >


            <Stack.Screen name="(home)" />
            <Stack.Screen name="config" options={{
                animation: "fade_from_bottom"
            }}/>
        </Stack>
    )
}