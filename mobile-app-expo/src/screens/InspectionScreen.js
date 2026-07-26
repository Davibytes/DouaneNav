import {
    useEffect,
    useState
} from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput
} from "react-native";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import {
    getInspections,
    createInspection
} from "../services/inspectionService.js";

import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function InspectionScreen({
    route,
    navigation
}) {


    const declaration =
        route?.params?.declaration || {};



    const [
        inspections,
        setInspections
    ] = useState([]);



    const [
        comment,
        setComment
    ] = useState("");



    const [
        status,
        setStatus
    ] = useState("Pending");





    useEffect(()=>{

        loadInspections();

    },[]);





    const loadInspections = async()=>{

        try{

            const data =
                await getInspections();


            setInspections(

                Array.isArray(data)
                ?
                data
                :
                []

            );


        }

        catch(error){

            console.log(
                "Inspection error:",
                error.message
            );


            setInspections([]);

        }

    };







    const saveInspection = async()=>{


        if(
            !declaration.declarationNumber
        ){

            console.log(
                "No declaration selected"
            );

            return;

        }



        const inspection = {

            declarationNumber:
                declaration.declarationNumber,


            status,


            comments:
                comment,


            location:

                declaration.destination?.address

                ||

                declaration.destination?.city

                ||

                "Unknown location"

        };



        try{


            await createInspection(
                inspection
            );



            setComment("");

            setStatus(
                "Pending"
            );



            await loadInspections();



        }


        catch(error){


            console.log(
                "Save inspection error:",
                error.message
            );


        }


    };







    return (

        <SafeScreen>


            <View
                style={{
                    flex:1
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
                        Inspection Module
                    </Text>



                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        Create and manage cargo inspections
                    </Text>





                    {
                        declaration.declarationNumber && (

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
                                    Selected Declaration
                                </Text>


                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    Declaration:
                                    {" "}
                                    {
                                        declaration.declarationNumber
                                    }
                                </Text>


                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    Destination:
                                    {" "}
                                    {
                                        declaration.destination?.address
                                        ||
                                        declaration.destination?.city
                                        ||
                                        "N/A"
                                    }
                                </Text>


                            </View>

                        )
                    }







                    {
                        declaration.declarationNumber && (

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
                                    New Inspection
                                </Text>



                                <TouchableOpacity

                                    style={
                                        styles.menuButton
                                    }


                                    onPress={()=>{

                                        setStatus(
                                            "Completed"
                                        );

                                    }}

                                >

                                    <Text
                                        style={
                                            styles.menuButtonText
                                        }
                                    >
                                        Mark Completed
                                    </Text>


                                </TouchableOpacity>




                                <TextInput

                                    style={[
                                        styles.input,
                                        {
                                            height:120,
                                            textAlignVertical:"top"
                                        }
                                    ]}


                                    placeholder=
                                    "Add inspection comments"


                                    placeholderTextColor={
                                        colors.muted
                                    }


                                    multiline


                                    value={
                                        comment
                                    }


                                    onChangeText={
                                        setComment
                                    }


                                />





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
                                        Save Inspection
                                    </Text>


                                </TouchableOpacity>



                            </View>

                        )
                    }







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
                            Inspection History
                        </Text>




                        {
                            inspections.length === 0 && (

                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    No inspections found.
                                </Text>

                            )
                        }





                        {
                            inspections.map(
                                (item,index)=>(

                                    <View

                                        key={
                                            item._id ||
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
                                                "Unknown"
                                            }
                                        </Text>



                                        <Text
                                            style={
                                                styles.listSubtitle
                                            }
                                        >
                                            Status:
                                            {" "}
                                            {
                                                item.status
                                                ||
                                                "Pending"
                                            }
                                        </Text>



                                        <Text
                                            style={
                                                styles.listSubtitle
                                            }
                                        >
                                            Location:
                                            {" "}
                                            {
                                                item.location
                                                ||
                                                "N/A"
                                            }
                                        </Text>



                                        <Text
                                            style={
                                                styles.listSubtitle
                                            }
                                        >
                                            Comments:
                                            {" "}
                                            {
                                                item.comments
                                                ||
                                                "None"
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