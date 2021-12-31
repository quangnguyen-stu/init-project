import Layout from "../Layout";
import React from "react";

const about = ({}) => {
    return <div>about</div>;
};

about.layout = (page) => <Layout children={page} title="Welcome" />;

export default about;
