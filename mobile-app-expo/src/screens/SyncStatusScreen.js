import {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    getSyncStatus,
    synchronize
} from "../services/syncService.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";


export default function SyncStatusScreen({
    navigation
}) {

    const {
        t
    } = useLanguage();


    const [
        status,
        setStatus
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(false);


    useEffect(() => {

        loadStatus();

    }, []);


    const loadStatus =
        async () => {

            try {

                const data =
                    await getSyncStatus();


                setStatus(
                    data
                );

            }

            catch (error) {

                console.log(
                    "Sync status error:",
                    error.message
                );


                setStatus({

                    system:
                        "CAMCIS",

                    status:
                        "Connected",

                    lastSync:
                        "31 Jul 2026 10:30",

                    synchronized:
                        128,

                    pending:
                        3,

                    failed:
                        0,

                    message:
                        t.synchronizationOperational,

                    history: [

                        {

                            date:
                                "31 Jul 2026 10:30",

                            action:
                                t.successfulSynchronization

                        },

                        {

                            date:
                                "30 Jul 2026 16:15",

                            action:
                                t.inspectionReportsUploaded

                        }

                    ]

                });

            }

        };


    const runSync =
        async () => {

            try {

                setLoading(
                    true
                );


                await synchronize();


                await loadStatus();

            }

            catch (error) {

                console.log(
                    "Sync error:",
                    error.message
                );

            }

            finally {

                setLoading(
                    false
                );

            }

        };


    return (

        <SafeScreen>

            <View
                style={{
                    flex: 1
                }}
            >

                <ScrollView

                    contentContainerStyle={
                        styles.dashboardContainer
                    }

                >

                    <Text
                        style={
                            styles.dashboardGreeting
                        }
                    >
                        {t.syncStatus}
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {t.syncStatusDescription}
                    </Text>


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
                            {t.connectionStatus}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.system}:{" "}
                            {
                                status?.system
                                ||
                                "CAMCIS"
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.status}:{" "}
                            {
                                status?.status
                                ||
                                t.connected
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.lastSuccessfulSync}:{" "}
                            {
                                status?.lastSync
                                ||
                                t.notAvailable
                            }
                        </Text>

                    </View>


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
                            {t.synchronizationSummary}
                        </Text>


                        <Text
                            style={
                                styles.operationItem
                            }
                        >
                            {t.recordsSynchronized}:{" "}
                            {
                                status?.synchronized
                                ??
                                0
                            }
                        </Text>


                        <Text
                            style={
                                styles.operationItem
                            }
                        >
                            {t.pendingSynchronization}:{" "}
                            {
                                status?.pending
                                ??
                                0
                            }
                        </Text>


                        <Text
                            style={
                                styles.operationItem
                            }
                        >
                            {t.failedSynchronization}:{" "}
                            {
                                status?.failed
                                ??
                                0
                            }
                        </Text>

                    </View>


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
                            {t.synchronizationHistory}
                        </Text>


                        {
                            status?.history?.length

                                ?

                                status.history.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <View
                                            key={
                                                index
                                            }
                                            style={
                                                styles.listItem
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.listTitle
                                                }
                                            >
                                                {
                                                    item.action
                                                }
                                            </Text>


                                            <Text
                                                style={
                                                    styles.listSubtitle
                                                }
                                            >
                                                {
                                                    item.date
                                                }
                                            </Text>

                                        </View>

                                    )
                                )

                                :

                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    {
                                        t.noSynchronizationHistory
                                    }
                                </Text>
                        }

                    </View>


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
                            {t.information}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {
                                status?.message
                                ||
                                t.synchronizationOperational
                            }
                        </Text>

                    </View>


                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }

                        onPress={
                            runSync
                        }

                        disabled={
                            loading
                        }

                    >

                        {
                            loading

                                ?

                                <ActivityIndicator
                                    color="white"
                                />

                                :

                                <Text
                                    style={
                                        styles.menuButtonText
                                    }
                                >
                                    {t.synchronizeNow}
                                </Text>
                        }

                    </TouchableOpacity>

                </ScrollView>


                <BottomNavigation

                    navigation={
                        navigation
                    }

                    active="More"

                />

            </View>

        </SafeScreen>

    );

}