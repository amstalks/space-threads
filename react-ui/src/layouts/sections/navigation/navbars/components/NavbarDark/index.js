/* eslint-disable no-param-reassign */
/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";
import { useAuth } from "auth-context/auth.context";

function NavbarDark() {
  const { user } = useAuth();
  return (
    <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
      {user && user.token ? (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/sign-out/",
            label: "logout",
            color: "info",
          }}
          transparent
          relative
          light
          center
        />
      ) : (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "/sign-in/",
            label: "login",
            color: "info",
          }}
          transparent
          relative
          light
          center
        />
      )}
    </MKBox>
  );
}

export default NavbarDark;
