import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { DefaultTemplate } from "payload/components/templates";
import { Button, Eyebrow } from "payload/components/elements";
import { AdminView } from "payload/config";
import { useStepNav } from "payload/components/hooks";
import { useConfig, Meta } from "payload/components/utilities";
import SelectStudents from "./inputs/SelectStudents";
import SelectTemplate from "./inputs/SelectTemplate";
const CustomDefaultRoute: AdminView = (props) => {
  const { user, canAccessAdmin } = props;
  const {
    routes: { admin: adminRoute },
  } = useConfig();
  const { setStepNav } = useStepNav();

  console.log("///props", props);

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  useEffect(() => {
    setStepNav([
      {
        label: "Custom Route with Default Template",
      },
    ]);
  }, [setStepNav]);

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  return (
    <DefaultTemplate>
      <Meta
        title="Custom Route with Default Template"
        description="Building custom routes into Payload is easy."
        keywords="Custom React Components, Payload, CMS"
      />
      <Eyebrow />

      <section>
        <h1>Issue Credential</h1>
        <p>Select a credential and issue it to a student or students.</p>
        <section>
          <h3>Select Credential Template</h3>
          <SelectTemplate />
        </section>

        <section>
          <h3>Select Students</h3>
          <SelectStudents />
        </section>
      </section>
      {/* <Button
        el="link"
        to={`${adminRoute}`}
        buttonStyle="secondary"
      >
        Go to Dashboard
      </Button> */}
    </DefaultTemplate>
  );
};

export default CustomDefaultRoute;
