import Cookies from "js-cookie";
import { useEffect } from "react";

const RediectPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = JSON.parse(String(params.get("startggtoken")));

    const value = {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };

    const expiration = new Date(token.expiration_date);

    Cookies.set("start-gg-auth", JSON.stringify(value), {
      expires: expiration,
    });

    window.history.replaceState({}, document.title, "/");
    window.location.href = "/";
  }, []);

  return null;
};

export default RediectPage;
