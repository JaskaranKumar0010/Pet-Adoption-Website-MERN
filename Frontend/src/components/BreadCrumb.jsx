import React from 'react';
import breadcrumb_bg from '../components/img/bg/breadcrumb_bg.jpg'


const BreadCrumb = () => {
    return (

        <>
            {/* breadcrumb-area */}
            <section
                className="breadcrumb-area breadcrumb-bg"
                style={{ backgroundImage: `url(${breadcrumb_bg})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2 className="title">Pet List</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Pets
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* breadcrumb-area-end */}


        </>
    )
}

export default BreadCrumb