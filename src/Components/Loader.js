import React from 'react';

import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="loader" data-testid="loader">
            <Oval
                height={80}
                width={80}
                color="#2477bf"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#135fa2"
                strokeWidth={2}
                strokeWidthSecondary={2}

                />
        </div>
    );
}

export default Loader;