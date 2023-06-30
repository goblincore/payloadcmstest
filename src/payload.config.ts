import { buildConfig } from 'payload/config';
import path from 'path';
 import Examples from './collections/Examples';
 import Credentials from './collections/Credentials';
 import Students from './collections/Students';
 import CredentialsTemplatesCollection from './collections/CredentialTemplates';
import Users from './collections/Users';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    // Add Collections here
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
