import {
    StyleSheet
} from "react-native";

import colors from "./colors.js";


const styles = StyleSheet.create({

    container: {

        flex: 1,

        padding: 20,

        backgroundColor:
            colors.background

    },


    screenPadding: {

        paddingHorizontal: 20,

        paddingVertical: 20

    },


    title: {

        fontSize: 28,

        fontWeight: "700",

        marginBottom: 20,

        color:
            colors.text

    },


    subtitle: {

        fontSize: 15,

        color:
            colors.muted,

        lineHeight: 22

    },


    card: {

        backgroundColor:
            colors.surface,

        borderRadius: 14,

        padding: 20,

        marginBottom: 15,

        elevation: 3

    },


    dashboardCard: {

        backgroundColor:
            colors.surface,

        borderRadius: 14,

        padding: 20,

        marginBottom: 15,

        elevation: 3

    },


    cardTitle: {

        fontSize: 16,

        fontWeight: "700",

        color:
            colors.text,

        marginBottom: 10

    },


    cardNumber: {

        fontSize: 32,

        fontWeight: "800",

        color:
            colors.green

    },


    cardText: {

        fontSize: 16,

        color:
            colors.text,

        marginBottom: 20

    },


    button: {

        backgroundColor:
            colors.green,

        paddingVertical: 14,

        borderRadius: 8,

        alignItems: "center",

        justifyContent: "center",

        marginTop: 10

    },


    buttonText: {

        color:
            colors.white,

        fontSize: 16,

        fontWeight: "700"

    },


    input: {

        backgroundColor:
            colors.surface,

        borderWidth: 1,

        borderColor:
            colors.border,

        borderRadius: 8,

        paddingHorizontal: 14,

        paddingVertical: 13,

        fontSize: 15,

        color:
            colors.text,

        marginBottom: 15

    },


    label: {

        fontSize: 14,

        fontWeight: "600",

        color:
            colors.text,

        marginBottom: 8

    },


    mutedText: {

        color:
            colors.muted,

        fontSize: 14

    },


    logoutButton: {

        marginTop: 25,

        marginBottom: 20,

        paddingVertical: 16,

        borderWidth: 1,

        borderColor:
            colors.green,

        borderRadius: 10,

        alignItems: "center",

        justifyContent: "center",

        backgroundColor:
            colors.surface

    },


    safeScreen: {

        flex: 1,

        backgroundColor:
            colors.background

    },


    loginContainer: {

        flex: 1,

        justifyContent: "center",

        paddingHorizontal: 25

    },


    logoText: {

        fontSize: 30,

        fontWeight: "800",

        textAlign: "center",

        marginBottom: 10

    },


    eyebrow: {

        textAlign: "center",

        fontSize: 13,

        fontWeight: "700",

        color:
            colors.muted,

        marginBottom: 25

    },


    loginTitle: {

        fontSize: 24,

        fontWeight: "700",

        color:
            colors.text,

        marginBottom: 10

    },


    language: {

        marginTop: 25,

        textAlign: "center",

        color:
            colors.green,

        fontWeight: "600"

    },


    // DASHBOARD

    dashboardContainer: {

        padding: 20,

        paddingBottom: 130

    },


    dashboardGreeting: {

        fontSize: 28,

        fontWeight: "800",

        color:
            colors.text,

        marginBottom: 5

    },


    dashboardRole: {

        fontSize: 15,

        color:
            colors.greenDark,

        marginBottom: 25

    },


    section: {

        backgroundColor:
            colors.surface,

        borderRadius: 12,

        padding: 18,

        marginBottom: 18,

        elevation: 2,

        borderLeftWidth: 4,

        borderLeftColor:
            colors.green

    },


    sectionTitle: {

        fontSize: 17,

        fontWeight: "700",

        color:
            colors.greenDark,

        marginBottom: 12

    },


    sectionText: {

        fontSize: 15,

        color:
            colors.text,

        lineHeight: 23,

        marginBottom: 5

    },


    operationItem: {

        fontSize: 15,

        color:
            colors.text,

        marginBottom: 10,

        lineHeight: 22

    },


    listItem: {

        paddingVertical: 12,

        borderBottomWidth: 1,

        borderBottomColor:
            colors.border

    },


    listTitle: {

        fontSize: 16,

        fontWeight: "700",

        color:
            colors.text

    },


    listSubtitle: {

        marginTop: 3,

        fontSize: 14,

        color:
            colors.muted

    },


    menuButton: {

        backgroundColor:
            colors.green,

        paddingVertical: 15,

        borderRadius: 10,

        marginBottom: 12,

        alignItems: "center",

        justifyContent: "center"

    },


    menuButtonText: {

        color:
            colors.white,

        fontWeight: "700",

        fontSize: 15

    },


    // BOTTOM NAVIGATION

    bottomNavigation: {

        flexDirection: "row",

        justifyContent: "space-around",

        alignItems: "center",

        backgroundColor:
            colors.surface,

        borderTopWidth: 1,

        borderTopColor:
            colors.border,

        paddingTop: 8,

        paddingBottom: 10,

        minHeight: 88,

        height: 92

    },


    bottomNavigationItem: {

        alignItems: "center",

        justifyContent: "center",

        flex: 1,

        minWidth: 0,

        paddingHorizontal: 2,

        height: 72

    },


    bottomNavigationIcon: {

        fontSize: 22,

        marginBottom: 3,

        fontWeight: "700"

    },


    bottomNavigationText: {

        fontSize: 11,

        fontWeight: "600",

        marginTop: 3,

        lineHeight: 14,

        textAlign: "center",

        includeFontPadding: false

    },


    // PROFILE

    profileContainer: {

        paddingBottom: 150

    },


    profileAvatar: {

        alignItems: "center",

        marginBottom: 25

    },


    profileName: {

        fontSize: 22,

        fontWeight: "700",

        color:
            colors.text,

        marginTop: 10

    },


    permissionItem: {

        flexDirection: "row",

        alignItems: "center",

        marginBottom: 10

    },


    permissionText: {

        marginLeft: 8,

        color:
            colors.text,

        fontSize: 14

    },


    // MAP

    mapContainer: {

        flex: 1

    },


    mapInfo: {

        padding: 20

    },


    map: {

        flex: 1

    }

});


export default styles;