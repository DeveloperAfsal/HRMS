import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Medium': require('../assets/Fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('../assets/Fonts/Inter-SemiBold.ttf'),
        'Inter-Bold': require('../assets/Fonts/Inter-Bold.ttf'),
    });

    return fontsLoaded;
};
