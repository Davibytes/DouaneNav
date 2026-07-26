import {
    useEffect,
    useState
} from "react";

import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import {
    getDeclarations,
    searchDeclarations
} from "../services/declarationService.js";

import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function DeclarationsScreen({
    navigation
}) {


    const [
        declarations,
        setDeclarations
    ] = useState([]);


    const [
        search,
        setSearch
    ] = useState("");



    useEffect(()=>{

        loadDeclarations();

    },[]);



    const loadDeclarations = async()=>{

        try{

            const data =
                await getDeclarations();


            setDeclarations(
                Array.isArray(data)
                ?
                data
                :
                []
            );


        }

        catch(error){

            console.log(
                "Declarations error:",
                error.message
            );


            setDeclarations([]);

        }

    };




    const handleSearch = async(value)=>{


        setSearch(value);



        if(value.length < 2){

            loadDeclarations();

            return;

        }



        try{

            const result =
                await searchDeclarations(
                    value
                );


            setDeclarations(
                Array.isArray(result)
                ?
                result
                :
                []
            );


        }


        catch(error){


            const text =
                value.toLowerCase();



            const filtered =
                declarations.filter(
                    item=>{


                        return (

                            item.declarationNumber
                            ?.toLowerCase()
                            .includes(text)


                            ||

                            item.transport?.truckPlate
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

                            item.destination?.area
                            ?.toLowerCase()
                            .includes(text)

                        );

                    }
                );


            setDeclarations(
                filtered
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
                        Declaration Management
                    </Text>



                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        Search and verify cargo declarations
                    </Text>




                    <TextInput

                        style={
                            styles.input
                        }

                        placeholder=
                        "Search declaration, truck, importer..."

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
                        declarations.length === 0 && (

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
                                    No declarations available
                                </Text>

                            </View>

                        )
                    }





                    {
                        declarations.map(
                            (item,index)=>(

                                <TouchableOpacity

                                    key={
                                        item._id || index
                                    }

                                    style={
                                        styles.section
                                    }


                                    onPress={()=>{

                                        navigation.navigate(
                                            "DeclarationDetails",
                                            {
                                                declaration:item
                                            }
                                        );

                                    }}

                                >


                                    <Text
                                        style={
                                            styles.sectionTitle
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
                                            styles.sectionText
                                        }
                                    >

                                        Importer:
                                        {" "}
                                        {
                                            item.importer?.name
                                            ||
                                            "N/A"
                                        }

                                    </Text>



                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        Truck:
                                        {" "}
                                        {
                                            item.transport?.truckPlate
                                            ||
                                            "N/A"
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
                                            item.destination?.area
                                            ||
                                            ""
                                        }
                                        ,
                                        {" "}
                                        {
                                            item.destination?.city
                                            ||
                                            "N/A"
                                        }

                                    </Text>



                                    <Text
                                        style={
                                            styles.sectionText
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