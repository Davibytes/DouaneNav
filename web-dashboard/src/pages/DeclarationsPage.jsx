import {
    useEffect,
    useState
} from "react";


import {
    getDeclarations,
    searchDeclarations
} from "../api/declarationApi";


import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const DeclarationsPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        declarations,
        setDeclarations
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        search,
        setSearch
    ] = useState("");


    const loadDeclarations =
        async () => {

            try {

                setLoading(true);


                const data =
                    await getDeclarations();


                setDeclarations(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }

            catch (error) {

                console.error(
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        loadDeclarations();

    }, []);


    const handleSearch =
        async () => {

            if (!search.trim()) {

                loadDeclarations();

                return;

            }


            try {

                setLoading(true);


                const data =
                    await searchDeclarations(
                        search
                    );


                setDeclarations(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }

            catch (error) {

                console.error(
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    return (

        <div>

            <div className="card">

                <div className="search-bar">

                    <input

                        value={
                            search
                        }

                        onChange={
                            event =>
                                setSearch(
                                    event.target.value
                                )
                        }

                        onKeyDown={
                            event => {

                                if (
                                    event.key === "Enter"
                                ) {

                                    handleSearch();

                                }

                            }
                        }

                        placeholder={
                            t.searchDeclarations
                        }

                    />


                    <button
                        onClick={
                            handleSearch
                        }
                    >

                        {t.searchButton}

                    </button>

                </div>

            </div>


            <div className="card">

                {
                    loading

                    ?

                    <p>
                        {t.loadingDeclarations}
                    </p>

                    :

                    declarations.length === 0

                    ?

                    <p className="muted">
                        {t.noData}
                    </p>

                    :

                    <table
                        className="inspection-table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    {t.declaration}
                                </th>

                                <th>
                                    {t.importer}
                                </th>

                                <th>
                                    {t.destination}
                                </th>

                                <th>
                                    {t.status}
                                </th>

                                <th>
                                    {t.truck}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                declarations.map(
                                    declaration => (

                                        <tr
                                            key={
                                                declaration._id
                                            }
                                        >

                                            <td>
                                                {
                                                    declaration.declarationNumber
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>
                                                {
                                                    declaration.importer?.name
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>
                                                {
                                                    declaration.destination?.city
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        declaration.status === "Completed"
                                                            ? "status success"
                                                            : "status pending"
                                                    }
                                                >
                                                    {
                                                        declaration.status
                                                        ||
                                                        t.unknown
                                                    }
                                                </span>

                                            </td>


                                            <td>
                                                {
                                                    declaration.transport?.truckPlate
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                }

            </div>

        </div>

    );

};


export default DeclarationsPage;