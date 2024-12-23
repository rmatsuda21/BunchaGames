import Cookies from "js-cookie";
import { useEffect } from "react";

import { COOKIES } from "@/enums/constants";

const replaceAndRedirect = () => {
  window.history.replaceState({}, "", "/");
  window.location.href = "/";
};

const RediectPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (!params.has("startggtoken")) {
      replaceAndRedirect();
      return;
    }

    const token = JSON.parse(String(params.get("startggtoken")));

    if (!token.access_token || !token.expiration_date || !token.refresh_token) {
      replaceAndRedirect();
      return;
    }

    const expiration = new Date(token.expiration_date);
    Cookies.set(COOKIES.STARTGG_TOKEN, token.access_token, {
      expires: expiration,
    });
    Cookies.set(COOKIES.STARTGG_REFRESH, token.refresh_token, {
      expires: new Date(expiration.getTime() + 7 * 24 * 60 * 60 * 1000),
    });

    replaceAndRedirect();
  }, []);

  return null;
};

export default RediectPage;
