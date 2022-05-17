import React from 'react';
import Context from '../components/context';
import ItemsTable from '../components/items-table';
import Layout from '../components/layout';

import Login from '../components/login';

const Config = () => {
    const { tokenCtx } = React.useContext(Context);
    const { token } = tokenCtx;

    if (!token) {
        return <Login />;
    } else {
        return (
            <Layout>
                <ItemsTable />
            </Layout>
        );
    }
};

export default Config;
