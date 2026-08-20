import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';


export default function LoginPage() {

  const navigate = useNavigate();

  const { login, user } = useAuth();

 if (user) {
  return <Navigate to="/dashboard" />;
}

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);



  const handleSubmit = async (event) => {

    event.preventDefault();

    setError('');

    setLoading(true);



    try {

      await login(email, password);


      navigate('/dashboard');


    } catch (error) {

      setError(
        error.message || 'Unable to login.'
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <main className="page-shell">

        <div className="login-language">

            <button>FR</button>

            <button>EN</button>

        </div>
      <section className="brand-panel">


        <img

          src="/src/assets/logo.png"

          alt="CustomsTrack AI logo"

          className="logo"

        />


        <p className="eyebrow">
          CAMEROON CUSTOMS
        </p>


        <h1>
          DouaneNav
        </h1>


        <p className="intro">

          Decision support platform
          complementing CAMCIS for
          customs declaration verification
          and inspection workflows.

        </p>


      </section>


      <section className="login-panel">


        <div>


          <p className="eyebrow green">
            SECURE ACCESS
          </p>

          <h2>
            Welcome back
          </h2>


          <p className="muted">

            Sign in with your authorized
            DouaneNav account.

          </p>


          <form onSubmit={handleSubmit}>


            <label>

              Email


              <input

                type="email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="Enter your email"

                required

              />


            </label>


            <label>

              Password


              <input

                type="password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                placeholder="Enter your password"

                required

              />


            </label>

            {
              error &&

              <p className="error">

                {error}

              </p>

            }


            <button
            
            className="login-button"

              type="submit"

              disabled={loading}

            >

              {
                loading
                ? 'Signing in...'
                : 'Sign in securely'
              }


            </button>



          </form>

        </div>

      </section>

    </main>

  );

}