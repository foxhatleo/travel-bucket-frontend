import React, {useEffect} from "react";
import {PageReportProps} from "../_app";

export default (p: PageReportProps) => {
    useEffect(() => {
        p.report({showSearch: true});
    });
    return <></>;
};
