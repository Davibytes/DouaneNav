import logo from "../assets/logo.png";


const AppHeader = ({
  title,
  description
}) => {


  return (

    <header className="dashboard-header">


      <div>


        <p className="eyebrow">
          CAMEROON CUSTOMS
        </p>


        <h1>
          {title}
        </h1>


        <p className="muted">
          {description}
        </p>


      </div>



      <div className="header-brand">


        <img

          src={logo}

          alt="CustomsTrack AI"

          className="brand-logo"

        />


        <div>

          <strong>
            DouaneNav
          </strong>


          <p className="muted">
            Customs Verification System
          </p>


        </div>


      </div>


    </header>

  );

};


export default AppHeader;