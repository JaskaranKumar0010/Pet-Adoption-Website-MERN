import React from 'react';
import './styles/SigningOutPrompt.css';
import { TailSpin } from 'react-loader-spinner';

const SigningOutPrompt = () => {

    return (
        <div className="signingout-prompt-overlay">
            <div className="signingout-prompt">
                <div className="reactloader">
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#F04336"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
                <div className="signingout-text">Signing Out...</div>
            </div>
        </div>
    );
};

export default SigningOutPrompt;
