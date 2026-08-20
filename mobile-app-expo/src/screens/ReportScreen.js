import {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    getReports
} from "../services/reportService.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";


export default function ReportScreen({
    navigation
}) {

    const {
        t
    } = useLanguage();


    const [
        reports,
        setReports
    ] = useState([]);


    useEffect(() => {

        loadReports();

    }, []);


    const loadReports =
        async () => {

            try {

                const data =
                    await getReports();


                setReports(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }

            catch (error) {

                console.log(
                    "Reports error:",
                    error.message
                );


                setReports([]);

            }

        };


    const completedCount =
        reports.filter(
            report =>
                report.status ===
                    "Completed"
        ).length;


    const pendingCount =
        reports.filter(
            report =>
                report.status ===
                    "Pending"
        ).length;


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
                        {t.inspectionReports}
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {t.reportsSubtitle}
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
                            {t.reportSummary}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.totalReports}:{" "}
                            {reports.length}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.completed}:{" "}
                            {completedCount}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.pending}:{" "}
                            {pendingCount}
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
                            {t.exportReports}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.generateReports}
                        </Text>


                        <TouchableOpacity
                            style={
                                styles.menuButton
                            }
                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.exportPDF}
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={
                                styles.menuButton
                            }
                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.exportExcel}
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={
                                styles.menuButton
                            }
                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.exportCSV}
                            </Text>

                        </TouchableOpacity>

                    </View>


                    {
                        reports.length === 0

                            ?

                            <View
                                style={
                                    styles.section
                                }
                            >

                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    {t.noReportsAvailable}
                                </Text>

                            </View>

                            :

                            reports.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <View
                                        key={
                                            item._id
                                            ||
                                            item.id
                                            ||
                                            index
                                        }
                                        style={
                                            styles.section
                                        }
                                    >

                                        <Text
                                            style={
                                                styles.sectionTitle
                                            }
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
                                            {t.officer}:{" "}
                                            {
                                                item.officer
                                                ||
                                                t.notAvailable
                                            }
                                        </Text>


                                        <Text
                                            style={
                                                styles.sectionText
                                            }
                                        >
                                            {t.inspectionResult}:{" "}
                                            {
                                                item.result
                                                ||
                                                t.notAvailable
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
                                                t.unknown
                                            }
                                        </Text>


                                        <Text
                                            style={
                                                styles.sectionText
                                            }
                                        >
                                            {t.aiRisk}:{" "}
                                            {
                                                item.aiAnalysis
                                                ||
                                                t.notAnalysed
                                            }
                                        </Text>


                                        <Text
                                            style={
                                                styles.sectionText
                                            }
                                        >
                                            {t.comments}:{" "}
                                            {
                                                item.comments
                                                ||
                                                t.noComments
                                            }
                                        </Text>


                                        <Text
                                            style={
                                                styles.sectionText
                                            }
                                        >
                                            {t.attachedPhotos}:{" "}
                                            {
                                                Array.isArray(
                                                    item.photos
                                                )
                                                    ? item.photos.length
                                                    : 0
                                            }
                                        </Text>

                                    </View>

                                )
                            )
                    }

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