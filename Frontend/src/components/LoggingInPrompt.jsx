import React from 'react';
import './styles/LoggingInPrompt.css';
import { ThreeDots } from 'react-loader-spinner';

const LoggingInPrompt = () => {

    return (
        <div className="signingout-prompt-overlay">
            <div className="signingout-prompt">
                <div className="reactloader">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#F04336"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
                <div className="signingout-text">Logging You In ...</div>
            </div>
        </div>
    );
};

export default LoggingInPrompt;
