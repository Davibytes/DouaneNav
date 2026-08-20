import {
    useEffect,
    useState
} from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import {
    getInspections,
    createInspection
} from "../services/inspectionService.js";

import {
    createReport
} from "../services/reportService.js";

import {
    useLanguage
} from "../context/LanguageContext.js";

import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function InspectionScreen({
    navigation,
    route
}) {

    const {
        t
    } = useLanguage();


    const declaration =
        route?.params?.declaration || {};


    const [
        inspections,
        setInspections
    ] = useState([]);


    const [
        declarationNumber,
        setDeclarationNumber
    ] = useState(
        declaration?.declarationNumber || ""
    );


    const [
        truckPlate,
        setTruckPlate
    ] = useState(
        declaration?.transport?.truckPlate || ""
    );


    const [
        comment,
        setComment
    ] = useState("");


    const [
        status,
        setStatus
    ] = useState("Pending");


    const [
        photos,
        setPhotos
    ] = useState([]);


    useEffect(() => {

        loadInspections();

    }, []);


    const loadInspections = async () => {

        try {

            const data =
                await getInspections();


            setInspections(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.log(
                "Inspection loading error:",
                error.message
            );

            setInspections([]);

        }

    };


    const addPhoto = async (type) => {

        let result;


        if (type === "camera") {

            const permission =
                await ImagePicker
                    .requestCameraPermissionsAsync();


            if (!permission.granted) {

                Alert.alert(
                    t.permissionRequired,
                    t.cameraPermissionRequired
                );

                return;

            }


            result =
                await ImagePicker.launchCameraAsync({

                    quality: 0.7,

                    base64: true

                });

        }
        else {

            result =
                await ImagePicker.launchImageLibraryAsync({

                    quality: 0.7,

                    base64: true

                });

        }


        if (!result.canceled) {

            const asset =
                result.assets[0];


            const photo =
                asset.base64
                    ? `data:image/jpeg;base64,${asset.base64}`
                    : asset.uri;


            setPhotos(
                currentPhotos => [
                    ...currentPhotos,
                    photo
                ]
            );

        }

    };


    const saveInspection = async () => {

        if (!declarationNumber) {

            Alert.alert(
                t.missingInformation,
                t.declarationNumberRequired
            );

            return;

        }


        const inspection = {

            declarationNumber,

            truckPlate,

            comments:
                comment,

            status,

            photos,

            location:
                declaration?.destination?.address
                ||
                t.customsInspectionPoint

        };


        try {

            const savedInspection =
                await createInspection(
                    inspection
                );


            if (
                status === "Completed"
            ) {

                await createReport({

                    inspectionId:
                        savedInspection?.id
                        ||
                        savedInspection?._id
                        ||
                        null,

                    declarationNumber,

                    truckPlate,

                    officer:
                        savedInspection?.officer
                        ||
                        t.unknown,

                    result:
                        t.completed,

                    status:
                        "Completed",

                    comments:
                        comment,

                    photos,

                    location:
                        declaration
                            ?.destination
                            ?.address
                        ||
                        t.customsInspectionPoint,

                    declaration

                });

            }


            Alert.alert(

                t.success,

                status === "Completed"
                    ? t.inspectionReportSubmitted
                    : t.inspectionSaved

            );


            setDeclarationNumber(
                declaration?.declarationNumber
                ||
                ""
            );


            setTruckPlate(
                declaration?.transport?.truckPlate
                ||
                ""
            );


            setComment("");

            setPhotos([]);

            setStatus(
                "Pending"
            );


            await loadInspections();

        }

        catch (error) {

            console.log(
                "Inspection submission error:",
                error.message
            );


            Alert.alert(
                t.error,
                t.inspectionSubmissionFailed
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
                        {t.inspectionModule}
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {t.inspectionSubtitle}
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
                            {t.inspectionDetails}
                        </Text>


                        <TextInput

                            style={
                                styles.input
                            }

                            placeholder={
                                t.declarationNumberPlaceholder
                            }

                            placeholderTextColor={
                                colors.muted
                            }

                            value={
                                declarationNumber
                            }

                            onChangeText={
                                setDeclarationNumber
                            }

                        />


                        <TextInput

                            style={
                                styles.input
                            }

                            placeholder={
                                t.truckPlatePlaceholder
                            }

                            placeholderTextColor={
                                colors.muted
                            }

                            value={
                                truckPlate
                            }

                            onChangeText={
                                setTruckPlate
                            }

                        />

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
                            {t.inspectionStatus}
                        </Text>


                        {
                            [
                                "Pending",
                                "In Progress",
                                "Completed"
                            ].map(
                                item => (

                                    <TouchableOpacity

                                        key={
                                            item
                                        }

                                        style={[
                                            styles.menuButton,

                                            {
                                                backgroundColor:
                                                    status === item
                                                        ? colors.greenDark
                                                        : colors.green
                                            }

                                        ]}

                                        onPress={() =>
                                            setStatus(
                                                item
                                            )
                                        }

                                    >

                                        <Text
                                            style={
                                                styles.menuButtonText
                                            }
                                        >

                                            {
                                                item === "Pending"
                                                    ? t.pending
                                                    : item === "In Progress"
                                                        ? t.inProgress
                                                        : t.completed
                                            }

                                        </Text>

                                    </TouchableOpacity>

                                )
                            )
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
                            {t.officerNotes}
                        </Text>


                        <TextInput

                            style={[
                                styles.input,
                                {
                                    height: 120,
                                    textAlignVertical:
                                        "top"
                                }
                            ]}

                            multiline

                            placeholder={
                                t.inspectionComments
                            }

                            placeholderTextColor={
                                colors.muted
                            }

                            value={
                                comment
                            }

                            onChangeText={
                                setComment
                            }

                        />

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
                            {t.attachments}
                        </Text>


                        <TouchableOpacity
                            style={
                                styles.menuButton
                            }
                            onPress={() =>
                                addPhoto(
                                    "camera"
                                )
                            }
                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.captureEvidencePhoto}
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={
                                styles.menuButton
                            }
                            onPress={() =>
                                addPhoto(
                                    "gallery"
                                )
                            }
                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.selectPhoto}
                            </Text>

                        </TouchableOpacity>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.attachedPhotos}:{" "}
                            {photos.length}
                        </Text>

                    </View>


                    <TouchableOpacity
                        style={
                            styles.menuButton
                        }
                        onPress={
                            saveInspection
                        }
                    >

                        <Text
                            style={
                                styles.menuButtonText
                            }
                        >
                            {t.submitInspectionReport}
                        </Text>

                    </TouchableOpacity>


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
                            {t.inspectionHistory}
                        </Text>


                        {

                            inspections.length === 0

                                ?

                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    {t.noInspectionsAvailable}
                                </Text>

                                :

                                inspections.map(
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
                                                styles.listItem
                                            }

                                        >

                                            <Text
                                                style={
                                                    styles.listTitle
                                                }
                                            >
                                                {
                                                    item.declarationNumber
                                                    ||
                                                    t.unknown
                                                }
                                            </Text>


                                            <Text
                                                style={
                                                    styles.listSubtitle
                                                }
                                            >
                                                {t.status}:{" "}
                                                {
                                                    item.status
                                                    ||
                                                    t.unknown
                                                }
                                            </Text>

                                        </View>

                                    )
                                )

                        }

                    </View>

                </ScrollView>


                <BottomNavigation

                    navigation={
                        navigation
                    }

                    active="Inspection"

                />

            </View>

        </SafeScreen>

    );

}