import React from "react";
import {PageReportProps} from "./_app";

export default (p: PageReportProps) => {
    p.report({showSearch: false});
    return <></>;
};
