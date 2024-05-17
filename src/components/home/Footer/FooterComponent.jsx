import React, { useEffect, useState } from 'react';
import FooterService from './FooterService';
import LoadingSpinner from '../../spinner/LoadingSpinner.jsx';

const FooterComponent = () => {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        FooterService()
            .then(data => {
                setFooterData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching footer data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!footerData) {
        return null;
    }

    return (
        <footer id="footer">
            <div className="container">
                <h3>{footerData.name}</h3>
                <p>{footerData.title}</p>
                <div className="social-links">
                    <a href={footerData.linkInstagram} className="instagram" target="_blank" rel="noopener noreferrer"><i className="bx bxl-instagram"></i></a>
                    <a href={footerData.linkLinkedin} className="linkedin" target="_blank" rel="noopener noreferrer"><i className="bx bxl-linkedin"></i></a>
                </div>
                <div className="copyright">
                    &copy; Copyright <strong><span>{footerData.myResume}</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
