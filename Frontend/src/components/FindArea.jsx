import React, { useState } from 'react';

const FindArea = () => {
    const [location, setLocation] = useState('Enter City, State, or Zip');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div className="find-area">
            <div className="col-12">
                <form action="#">
                    <div className="find-wrap">
                        <div className="location">
                            <i className="flaticon-location"></i>
                            <input
                                type="text"
                                value={location}
                                onChange={handleLocationChange}
                            />
                        </div>
                        <div className="find-category">
                            <ul>
                                <li><a href="shop.html"><i className="flaticon-dog"></i> Find Your Dog</a></li>
                                <li><a href="shop.html"><i className="flaticon-happy"></i> Find Your Cat</a></li>
                                <li><a href="shop.html"><i className="flaticon-dove"></i> Find Your Birds</a></li>
                            </ul>
                        </div>
                        <div className="other-find">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Find Other Pets
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="shop.html">Find Your Dog</a>
                                    <a className="dropdown-item" href="shop.html">Find Your Cat</a>
                                    <a className="dropdown-item" href="shop.html">Find Your Birds</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default FindArea;
