import {Outlet} from "react-router";
  

  export default function Root() {
    return (
      <>
      <header className="m-10"/>
        <main>
          <Outlet />
        </main>
        </>
    );
  }