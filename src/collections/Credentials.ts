import { CollectionConfig } from 'payload/types';

const Credentials: CollectionConfig = {
    slug: 'credentials',
    fields: [
      {
        name: 'issue_vc_to', // required
        type: 'text', // required
        required: true,
      }
    ]
  };
  
  export default Credentials;