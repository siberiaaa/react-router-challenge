import {Outlet} from "react-router";
  

  export default function Root() {
    return (
      <>
      <header className="m-20"/>
        <main>
          <Outlet />
        </main>
        </>
    );
  }