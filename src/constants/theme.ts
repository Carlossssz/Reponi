import { useWindowDimensions } from "react-native";

export const Colors = {
  background: '#1b1b2a',
  body: '#29293f',
  nav: '#3b3b57',
  buttom: "#8577d4",
  tabColor: '#ee83ff',
  input: "#27273b",
  placeholder: "#6f6898"
}

export const Shadows = {
  blockShadow: '0px 0px 15px #00000040'
}


export const textShadow = {
  textShadowColor: "#000",
  textShadowRadius: 4,
  textShadowOffset: { width: 2, height: 2 }
}


export function useResponsiveFontSize() {
  const { width } = useWindowDimensions();
  return Math.max(14, Math.min(width * 0.04, 40))
}