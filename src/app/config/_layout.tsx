import { Stack } from "expo-router";
import { Colors } from "@/constants/theme";
import { BackBtn } from "@/components/BackBtn";

export default function Layout() {
    return (
        <Stack
            screenOptions={{

                headerStyle: {
                    backgroundColor: Colors.nav,
                },
                headerTitle: '',
                headerLeft: () => <BackBtn />,
                contentStyle: {
                    backgroundColor: Colors.background,
                }

            }}
        >

            <Stack.Screen name="index" />
            <Stack.Screen name="addItem" options={{
                animation: "fade"
            }}/>
           
        </Stack>
    )
}

