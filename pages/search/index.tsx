import React from "react";
import {PageReportProps} from "../_app";

export default (p: PageReportProps) => {
    p.report({showSearch: true});
    return <></>;
};
