import { gql } from '@apollo/client';
import { getClient } from '@faustwp/experimental-app-router';
import Link from 'next/link';
import '@/faust.config.js';
import { FaustProvider } from '@faustwp/experimental-app-router/ssr';
export default async function RootLayout({ children }) {
  const client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetLayout {
        generalSettings {
          title
          description
        }
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            label
            uri
          }
        }
        footerMenuItems: menuItems(where: { location: FOOTER }) {
          nodes {
            id
            label
            uri
          }
        }
      }
    `,
  });

  return (
    <html lang="en">
      <body>
        <FaustProvider>
          <header>
            <div>
              <h1>
                <Link href="https://github.com/wpengine/faustjs/pull/1994">
                  {"Testing Linked Repor for issue #1919"}
                </Link>
              </h1>

              <h5>{data.generalSettings.description}</h5>
            </div>

            <ul>
              {/* Login */}
              <li>
                <Link href="/login">Login</Link>
              </li>
              {/* My Account */}
              <li>
                <Link href="/account">My Account</Link>
              </li>
            </ul>
          </header>
          {children}
        </FaustProvider>
      </body>
    </html>
  );
}
