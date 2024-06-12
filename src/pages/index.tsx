import LinkButton from "@/components/shared/LinkButton";

import styles from "./index.module.scss";

const Homepage = () => {
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
