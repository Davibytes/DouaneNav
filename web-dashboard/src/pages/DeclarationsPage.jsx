import { useEffect, useState } from "react";
import { getDeclarations, searchDeclarations } from "../api/declarationApi";


const DeclarationsPage = () => {


  const [declarations, setDeclarations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const loadDeclarations = async () => {

    try {

      const data =
        await getDeclarations();


      setDeclarations(data);

    }

    catch(error) {

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

  const handleSearch = async () => {

    if (!search.trim()) {

      loadDeclarations();

      return;

    }

    try {

      const data =
        await searchDeclarations(search);

      setDeclarations(data);

    }

    catch(error) {

      console.error(
        error.message
      );

    }


  };

  return (

    <div>

      <div className="card">

        <div className="search-bar">

          <input

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }

            placeholder="
              Search declaration, importer, destination...
            "

          />

          <button

            onClick={handleSearch}

          >

            Search

          </button>


        </div>


      </div>


      <div className="card">


        {
          loading ?

          <p>
            Loading declarations...
          </p>

          :

          <table className="inspection-table">


            <thead>

              <tr>

                <th>
                  Declaration
                </th>


                <th>
                  Importer
                </th>


                <th>
                  Destination
                </th>


                <th>
                  Status
                </th>


                <th>
                  Truck
                </th>


              </tr>


            </thead>

            <tbody>


            {
              declarations.map(
                (declaration)=>(


                  <tr key={declaration._id}>


                    <td>
                      {declaration.declarationNumber}
                    </td>


                    <td>
                      {declaration.importer.name}
                    </td>


                    <td>
                      {
                        declaration.destination.city
                      }
                    </td>


                    <td>

                      <span className="status pending">

                        {
                          declaration.status
                        }

                      </span>

                    </td>


                    <td>

                      {
                        declaration.transport.truckPlate
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