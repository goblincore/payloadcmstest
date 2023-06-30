import { buildConfig } from 'payload/config';
import path from 'path';
 import Examples from './collections/Examples';
 import Credentials from './collections/Credentials';
 import Media from './collections/Media';
 import Students from './collections/Students';
 import CredentialsTemplatesCollection from './collections/CredentialTemplates';
import Users from './collections/Users';
import AfterNavLinks from './components/AfterNavLinks';

import CustomDefaultRoute from './components/CustomComponent';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    components: {
      afterNavLinks: [
        AfterNavLinks,
      ],
      routes: [
        {
          path: '/issue-credentials',
          Component: CustomDefaultRoute,
        },
        {
          path: '/test',
          Component: CustomDefaultRoute,
        },
      ],
    },
  },
  collections: [
    Users,
    // Add Collections here
    Media,
    Students,
    Credentials,
    CredentialsTemplatesCollection,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
