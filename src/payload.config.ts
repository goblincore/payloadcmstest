import { buildConfig } from 'payload/config';
import path from 'path';
 import Examples from './collections/Examples';
 import Students from './collections/Students';
 import CredentialsTemplatesCollection from './collections/Credentials';
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
    CredentialsTemplatesCollection,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
