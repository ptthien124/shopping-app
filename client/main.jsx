import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import Index from "/imports/ui/Index";

Meteor.startup(() => {
  render(<Index />, document.getElementById("react-target"));
});
