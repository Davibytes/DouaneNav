import {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    getDeclarations
} from "../services/declarationService.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import {
    translations
} from "../i18n/index.js";


import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function DeclarationsScreen({
    navigation
}) {

    const {
        language
    } = useLanguage();


    const t =
        translations[language];


    const [
        declarations,
        setDeclarations
    ] = useState([]);


    const [
        filteredDeclarations,
        setFilteredDeclarations
    ] = useState([]);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadDeclarations();

    }, []);


    const loadDeclarations =
        async () => {

            try {

                setLoading(true);


                const data =
                    await getDeclarations();


                const list =
                    Array.isArray(data)
                        ? data
                        : data?.declarations || [];


                setDeclarations(
                    list
                );

                setFilteredDeclarations(
                    list
                );

            }

            catch (error) {

                console.log(
                    "Declaration error:",
                    error.message
                );


                setDeclarations([]);

                setFilteredDeclarations([]);

            }

            finally {

                setLoading(false);

            }

        };


    const handleSearch =
        (value) => {

            setSearch(
                value
            );


            const text =
                value
                    .toLowerCase()
                    .trim();


            if (!text) {

                setFilteredDeclarations(
                    declarations
                );

                return;

            }


            const results =
                declarations.filter(
                    item => {

                        return (

                            item.declarationNumber
                                ?.toLowerCase()
                                .includes(text)

                            ||

                            item.importer?.name
                                ?.toLowerCase()
                                .includes(text)

                            ||

                            item.destination?.city
                                ?.toLowerCase()
                                .includes(text)

                            ||

                            item.transport?.truckPlate
                                ?.toLowerCase()
                                .includes(text)

                            ||

                            item.status
                                ?.toLowerCase()
                                .includes(text)

                        );

                    }
                );


            setFilteredDeclarations(
                results
            );

        };


    return (

        <SafeScreen>

            <View
                style={{
                    flex: 1
                }}
            >

                <ScrollView

                    contentContainerStyle={{
                        ...styles.dashboardContainer,
                        paddingBottom: 130
                    }}

                    showsVerticalScrollIndicator={
                        false
                    }

                >

                    <Text
                        style={
                            styles.dashboardGreeting
                        }
                    >
                        {t.declarations}
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {
                            t.customsDeclarationRecords
                        }
                    </Text>


                    <TextInput

                        style={
                            styles.input
                        }

                        placeholder={
                            t.searchDeclarations ||
                            t.declarations
                        }

                        placeholderTextColor={
                            colors.muted
                        }

                        value={
                            search
                        }

                        onChangeText={
                            handleSearch
                        }

                    />


                    {
                        loading &&

                        <ActivityIndicator
                            size="large"
                            color={
                                colors.green
                            }
                        />

                    }


                    {
                        !loading &&
                        filteredDeclarations.length === 0 &&

                        <View
                            style={
                                styles.section
                            }
                        >

                            <Text
                                style={
                                    styles.sectionTitle
                                }
                            >
                                {t.noRecords}
                            </Text>


                            <Text
                                style={
                                    styles.sectionText
                                }
                            >
                                {t.noDeclarationsAvailable}
                            </Text>

                        </View>

                    }


                    {
                        filteredDeclarations.map(
                            (
                                item,
                                index
                            ) => (

                                <TouchableOpacity

                                    key={
                                        item._id ||
                                        index
                                    }

                                    activeOpacity={
                                        0.85
                                    }

                                    style={{
                                        backgroundColor:
                                            colors.surface,

                                        borderRadius:
                                            14,

                                        padding:
                                            18,

                                        marginBottom:
                                            15,

                                        elevation:
                                            3

                                    }}

                                    onPress={() => {

                                        navigation.navigate(
                                            "DeclarationDetails",
                                            {
                                                declaration:
                                                    item
                                            }
                                        );

                                    }}

                                >

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "800",
                                            color:
                                                colors.greenDark,
                                            marginBottom: 12
                                        }}
                                    >
                                        {
                                            item.declarationNumber
                                            ||
                                            t.declaration
                                        }
                                    </Text>


                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        {t.importer}:{" "}
                                        {
                                            item.importer?.name
                                            ||
                                            t.notAvailable
                                        }
                                    </Text>


                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        {t.truckPlate}:{" "}
                                        {
                                            item.transport?.truckPlate
                                            ||
                                            t.notAvailable
                                        }
                                    </Text>


                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        {t.destination}:{" "}
                                        {
                                            item.destination?.city
                                            ||
                                            t.unknown
                                        }
                                    </Text>


                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        {t.status}:{" "}
                                        {
                                            item.status
                                            ||
                                            t.pending
                                        }
                                    </Text>


                                    <View
                                        style={{
                                            marginTop: 12,

                                            backgroundColor:
                                                colors.green,

                                            paddingHorizontal:
                                                14,

                                            paddingVertical:
                                                6,

                                            borderRadius:
                                                20,

                                            alignSelf:
                                                "flex-start"

                                        }}
                                    >

                                        <Text
                                            style={{
                                                color:
                                                    colors.white,

                                                fontWeight:
                                                    "700",

                                                fontSize:
                                                    12

                                            }}
                                        >
                                            {t.viewDetails}
                                        </Text>

                                    </View>

                                </TouchableOpacity>

                            )
                        )

                    }

                </ScrollView>


                <BottomNavigation

                    navigation={
                        navigation
                    }

                    active="Declarations"

                />

            </View>

        </SafeScreen>

    );

}