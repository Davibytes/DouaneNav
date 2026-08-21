import {
    useEffect,
    useState
} from "react";


import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const API_URL =
    "https://douanenav-backend.onrender.com/api";


const UsersPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        users,
        setUsers
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        creating,
        setCreating
    ] = useState(false);


    const [
        message,
        setMessage
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


    const [
        form,
        setForm
    ] = useState({

        name: "",
        email: "",
        phone: "",
        temporaryPassword: ""

    });


    const token =
        localStorage.getItem(
            "douanenav.token"
        );


    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers =
        async () => {

            try {

                setLoading(true);


                const response =
                    await fetch(
                        `${API_URL}/users`,
                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json"

                            }
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.error ||
                        t.usersUnavailable
                    );

                }


                setUsers(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }

            catch (error) {

                console.error(
                    error.message
                );


                setError(
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    const handleChange =
        (event) => {

            setForm({

                ...form,

                [event.target.name]:
                    event.target.value

            });

        };


    const createOfficer =
        async (event) => {

            event.preventDefault();


            setMessage("");
            setError("");


            try {

                setCreating(true);


                const response =
                    await fetch(
                        `${API_URL}/users/officers`,
                        {
                            method: "POST",

                            headers: {

                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    form
                                )

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.error ||
                        t.officerCreationFailed
                    );

                }


                setMessage(
                    `${t.officerCreated} ${t.temporaryPassword}: ${form.temporaryPassword}`
                );


                setForm({

                    name: "",
                    email: "",
                    phone: "",
                    temporaryPassword: ""

                });


                await loadUsers();

            }

            catch (error) {

                setError(
                    error.message
                );

            }

            finally {

                setCreating(false);

            }

        };


    if (loading) {

        return (

            <div className="card">

                <p>
                    {t.loading}
                </p>

            </div>

        );

    }


    return (

        <div>

            <div className="card">

                <h2>
                    {t.userManagement}
                </h2>


                <p className="muted">
                    {t.authorizedUsers}
                </p>

            </div>


            <div className="card">

                <h3>
                    {t.addOfficer}
                </h3>


                <form
                    onSubmit={
                        createOfficer
                    }
                >

                    <div className="search-bar">

                        <input
                            name="name"
                            value={
                                form.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder={
                                t.officerName
                            }
                            required
                        />


                        <input
                            name="email"
                            type="email"
                            value={
                                form.email
                            }
                            onChange={
                                handleChange
                            }
                            placeholder={
                                t.officerEmail
                            }
                            required
                        />

                    </div>


                    <div className="search-bar">

                        <input
                            name="phone"
                            value={
                                form.phone
                            }
                            onChange={
                                handleChange
                            }
                            placeholder={
                                t.phone
                            }
                        />


                        <input
                            name="temporaryPassword"
                            type="password"
                            value={
                                form.temporaryPassword
                            }
                            onChange={
                                handleChange
                            }
                            placeholder={
                                t.temporaryPassword
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={
                            creating
                        }
                    >

                        {
                            creating
                                ? t.creating
                                : t.createOfficer
                        }

                    </button>

                </form>


                {
                    message && (

                        <p>
                            {message}
                        </p>

                    )
                }


                {
                    error && (

                        <p className="muted">
                            {error}
                        </p>

                    )
                }

            </div>


            <div className="card">

                <table
                    className="inspection-table"
                >

                    <thead>

                        <tr>

                            <th>
                                {t.officerName}
                            </th>

                            <th>
                                {t.email}
                            </th>

                            <th>
                                {t.users}
                            </th>

                            <th>
                                {t.status}
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            users.map(
                                (
                                    user,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            user.id ||
                                            user._id ||
                                            index
                                        }
                                    >

                                        <td>
                                            {
                                                user.name ||
                                                t.notAvailable
                                            }
                                        </td>


                                        <td>
                                            {
                                                user.email ||
                                                t.notAvailable
                                            }
                                        </td>


                                        <td>
                                            {
                                                user.role ||
                                                t.unknown
                                            }
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    user.status === "active"
                                                        ? "status success"
                                                        : "status pending"
                                                }
                                            >
                                                {
                                                    user.status ||
                                                    t.active
                                                }
                                            </span>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default UsersPage;
