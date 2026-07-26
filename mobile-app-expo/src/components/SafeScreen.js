import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/styles.js";


export default function SafeScreen({ children }) {

    return (

        <SafeAreaView
            style={styles.safeScreen}
        >

            {children}

        </SafeAreaView>

    );

}