import {
    useEffect,
    useState
} from "react";


const API_URL =
    "https://douanenav-backend.onrender.com/api";


const UsersPage = () => {

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

        name:"",
        email:"",
        phone:"",
        temporaryPassword:""

    });


    const token =
        localStorage.getItem(
            "douanenav.token"
        );


    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = async () => {

        try {

            setLoading(true);

            const response =
                await fetch(
                    `${API_URL}/users`,
                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        }
                    }
                );


            const data =
                await response.json();


            if(!response.ok){

                throw new Error(
                    data.error ||
                    "Failed to load users."
                );

            }


            setUsers(data);

        }

        catch(error){

            console.error(
                error.message
            );

            setError(
                error.message
            );

        }

        finally{

            setLoading(false);

        }

    };


    const handleChange = (
        event
    ) => {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value

        });

    };


    const createOfficer = async (
        event
    ) => {

        event.preventDefault();

        setMessage("");
        setError("");


        try {

            setCreating(true);


            const response =
                await fetch(
                    `${API_URL}/users/officers`,
                    {
                        method:"POST",

                        headers:{
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


            if(!response.ok){

                throw new Error(
                    data.error ||
                    "Failed to create officer."
                );

            }


            setMessage(
                `Officer account created successfully. Temporary password: ${form.temporaryPassword}`
            );


            setForm({

                name:"",
                email:"",
                phone:"",
                temporaryPassword:""

            });


            await loadUsers();

        }

        catch(error){

            setError(
                error.message
            );

        }

        finally{

            setCreating(false);

        }

    };


    if(loading){

        return (
            <div className="card">

                <p>
                    Loading users...
                </p>

            </div>
        );

    }


    return (

        <div>

            <div className="card">

                <h2>
                    User Management
                </h2>

                <p className="muted">
                    Create and manage authorized CustomsTrack AI users.
                </p>

            </div>


            <div className="card">

                <h3>
                    Add Customs Officer
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
                            placeholder="Officer name"
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
                            placeholder="Officer email"
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
                            placeholder="Phone"
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
                            placeholder="Temporary password"
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
                                ? "Creating..."
                                : "Create Officer"
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

                <table className="inspection-table">

                    <thead>

                        <tr>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            users.map(
                                (user,index) => (

                                    <tr
                                        key={
                                            user.id ||
                                            user._id ||
                                            index
                                        }
                                    >

                                        <td>
                                            {
                                                user.name
                                            }
                                        </td>


                                        <td>
                                            {
                                                user.email
                                            }
                                        </td>


                                        <td>
                                            {
                                                user.role
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
                                                    "Active"
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