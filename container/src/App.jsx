import React, { Suspense } from "react";

const RemoteApp = React.lazy(() => import("app1/App"));

const App = () => {
    console.log(process.env.APP1_UR, 'container')
    return (
        <div>
            <h1>Container app </h1>
            <Suspense fallback={<div>Loading...</div>}>
                <RemoteApp />
            </Suspense>
        </div>
    )
};

export default App;
