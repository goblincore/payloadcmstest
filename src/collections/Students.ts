import { CollectionConfig } from 'payload/types';

const Students: CollectionConfig = {
  slug: 'students',
  fields: [
    {
        name: 'studentName',
        label: 'Student Name',
        type: 'text',
        required: true,
      },
      {
        name: 'studentEmail', // required
        type: 'email', // required
        label: 'Contact Email Address',
      }
    // Email added by default
    // Add more fields as needed
  ],
};

export default Students;