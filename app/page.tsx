import { getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';

export default async function Home() {
  let client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            uri
            slug
          }
        }
      }
    `,
  });

  return (
    <main>
      <h2>Posts</h2>
    </main>
  );
}
