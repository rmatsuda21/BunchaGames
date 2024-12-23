import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const StartGGPage = () => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const cookie = JSON.parse(
      Cookies.get("start-gg-auth") || "{}"
    )?.access_token;

    setClient(
      new ApolloClient({
        uri: "https://api.start.gg/gql/alpha",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            cookie || import.meta.env.VITE_START_GG_TOKEN
          }`,
        },
        cache: new InMemoryCache(),
      })
    );
  }, []);

  useEffect(() => {
    const getData = async () => {
      const query = gql`
        query GetEventId($slug: String) {
          event(slug: $slug) {
            id
            name
          }
        }
      `;

      const result = await client?.query({
        query,
        variables: {
          slug: "tournament/genesis-9-1/event/ultimate-singles",
        },
      });

      console.log(result?.data);
    };

    getData();
  }, [client]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Start.gg</h1>
        <p>Start.gg is a platform for competitive gaming.</p>
      </div>
    </ApolloProvider>
  );
};

export default StartGGPage;
