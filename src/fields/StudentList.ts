import { Field, RelationshipField } from "payload/types";
import SelectStudents from "../components/inputs/SelectStudents";
export const validateHexColor = (value: string): boolean | string => {
  return (
    value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/).length === 1 ||
    `${value} is not a valid hex color`
  );
};

const studentList: RelationshipField  = {
  name: "studentList",
  type: 'relationship',
  required: true,
  relationTo: 'students',
  admin: {
    components: {
      Field: SelectStudents,
    },
  },
};

export default studentList;
