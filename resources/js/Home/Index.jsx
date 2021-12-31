import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Layout from "../Layout";

const Index = ({ user }) => {
    return (
        <>
            <p>Hello {user}, welcome to your first Inertia app!</p>
        </>
    );
};

Index.layout = (page) => <Layout children={page} title="Welcome" />;

export default Index;
