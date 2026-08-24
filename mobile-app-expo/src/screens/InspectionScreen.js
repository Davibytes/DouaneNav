import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator
} from "react-native";

import {
    useFocusEffect
} from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import {
    getInspections,
    createInspection
} from "../services/inspectionService.js";

import {
    useLanguage
} from "../context/LanguageContext.js";

import {
    useDeclarationWorkflow
} from "../context/DeclarationWorkflowContext.js";

import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function InspectionScreen({
    navigation,
    route
}) {

    const {
        t
    } = useLanguage();

    const {
        declaration:workflowDeclaration,
        clearDeclaration
    } = useDeclarationWorkflow();


    const declaration =
        route?.params?.declaration || workflowDeclaration || {};

    const isReinspection =
        Boolean(route?.params?.isReinspection);


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


    const [
        isSubmitting,
        setIsSubmitting
    ] = useState(false);


    useEffect(() => {

        setDeclarationNumber(
            declaration?.declarationNumber || ""
        );

        setTruckPlate(
            declaration?.transport?.truckPlate || ""
        );

    }, [
        declaration?.declarationNumber,
        declaration?.transport?.truckPlate
    ]);


    useFocusEffect(

        useCallback(() => {

            loadInspections();

        }, [])

    );


    const loadInspections = async () => {

        try {

            const data =
                await getInspections();


            setInspections(
                Array.isArray(data)
                    ? data
                    : data?.inspections || []
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

                    quality: 0.5,

                    base64: true

                });

        }
        else {

            result =
                await ImagePicker.launchImageLibraryAsync({

                    quality: 0.5,

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
                t.customsInspectionPoint,

            declaration,

            isReinspection

        };


        try {

            setIsSubmitting(true);

            const savedInspection =
                await createInspection(
                    inspection
                );


            setInspections(
                currentInspections => [
                    savedInspection,
                    ...currentInspections
                ]
            );


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

            clearDeclaration();


            await loadInspections();

        }

        catch (error) {

            const message =
                error.response?.data?.error ||
                error.message ||
                t.inspectionSubmissionFailed;

            console.log("Inspection submission error:", message);


            Alert.alert(
                t.error,
                message
            );

        }

        finally {

            setIsSubmitting(false);

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
                        style={[
                            styles.menuButton,
                            {
                                opacity:
                                    isSubmitting
                                        ? 0.65
                                        : 1
                            }
                        ]}
                        onPress={
                            saveInspection
                        }

                        disabled={
                            isSubmitting
                        }
                    >

                        {
                            isSubmitting

                            ?

                            <ActivityIndicator
                                color={
                                    colors.white
                                }
                            />

                            :

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.submitInspectionReport}
                            </Text>
                        }

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
