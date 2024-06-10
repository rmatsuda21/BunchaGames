// import { gql, useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import Cookies from "js-cookie";

import LinkButton from "@/components/shared/LinkButton";

import styles from "./index.module.scss";

const Homepage = () => {
  // const client = useApolloClient();

  useEffect(() => {
    // const getData = async () => {
    //   const query = gql`
    //     query GetEventId($slug: String) {
    //       event(slug: $slug) {
    //         id
    //         name
    //       }
    //     }
    //   `;

    //   const result = await client.query({
    //     query,
    //     variables: {
    //       slug: "tournament/genesis-9-1/event/ultimate-singles",
    //     },
    //   });

    //   console.log(result.data);
    // };

    // getData();
    console.log(Cookies.get());
  }, []);

  const url = new URL("https://start.gg/oauth/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", "155");

  url.searchParams.set("scope", encodeURIComponent("user.identity"));
  url.searchParams.set(
    "redirect_uri",
    "https://buncha-games.vercel.app/api/auth"
  );

  return (
    <div className={styles.wrapper}>
      <h1>Welcome to Buncha Games!</h1>
      <h3>
        This a place where I create many classic games as part of practice and
        for fun, enjoy :D
      </h3>
      <a href={url.toString()}>CLICK ME</a>

      <LinkButton to="/games" classNames={styles.button}>
        Go to Games
      </LinkButton>
    </div>
  );
};

export default Homepage;
