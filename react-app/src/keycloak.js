import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8080/",
  realm: "ReactNodeProject",
  // clientId: "nodeClient",
  clientId: "react-client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
