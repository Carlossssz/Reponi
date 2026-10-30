import { Tabs } from "expo-router";
import { ConfigBtn } from "@/components/ConfigBtn";
import { Colors, Shadows, textShadow } from "@/constants/theme";
import { useFonts } from "expo-font";
import Entypo from '@expo/vector-icons/Entypo';

export default function Layout() {
    const [fontsLoaded] = useFonts({
        BlackOpsOne: require('../../../assets/fonts/BlackOpsOne-Regular.ttf')
    })

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <Tabs
                screenOptions={{
                    headerTitleStyle: {
                        color: "#fff",
                        fontSize: 40,
                        paddingLeft: 30,
                        fontFamily: 'BlackOpsOne',
                        ...textShadow
                    },
                    headerStyle: {
                        backgroundColor: Colors.nav,
                        boxShadow: Shadows.blockShadow,
                    },

                    sceneStyle: {
                        backgroundColor: Colors.background,
                    },
                    tabBarStyle: {
                        backgroundColor: Colors.nav,
                        borderTopWidth: 0,
                        height: 120,
                        boxShadow: Shadows.blockShadow,
                       
                    },
                    tabBarShowLabel: false,
                    tabBarIconStyle: {
                        width: 40,
                        height: 40,
                        marginTop: 25
                    },

                    headerRight: () => <ConfigBtn />

                }}
            >
                <Tabs.Screen

                    name="index"
                    options={{
                        title: 'Reposição',
                        tabBarIcon: ({ focused }) => (
                            <Entypo
                                name="drink"
                                size={40}
                                color={focused ? Colors.tabColor : "#fff"} />
                        ),
                    }} />

                <Tabs.Screen
                    name="compras"
                    options={{
                        title: 'Compras',
                        tabBarIcon: ({ focused }) => (
                            <Entypo
                                name="shop"
                                size={40}
                                color={focused ? Colors.tabColor : "#fff"}
                            />
                        ),
                    }} />
            </Tabs>

        </>

    )

}