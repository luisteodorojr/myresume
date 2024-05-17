import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import AboutService from './AboutService.jsx'; 
import LoadingSpinner from '../../spinner/LoadingSpinner.jsx'

const AboutComponent = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        AboutService()
            .then(data => {
                setAboutData(data);
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
            });
    }, []);

    if (!aboutData) {
        return <LoadingSpinner />;
    }

    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>{aboutData.about}</h2>
                    {aboutData.aboutTitle}
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Image src={aboutData.imageLink} className="img-fluid" alt="" style={{ width: '80%' }} rounded />
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <h3>{aboutData.professionalExperienceTitle}</h3>
                        <p className="fst-italic">{aboutData.professionalExperienceSubTitle}</p>
                        <div className="row">
                            <div className="col-lg-6">
                                <ul>
                                    <li><strong>{aboutData.birthdayTitle}:</strong> <span>{aboutData.birthday}</span></li>
                                    <li><strong>{aboutData.cityTitle}:</strong> <span>{aboutData.city}</span></li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul>
                                    <li><strong>{aboutData.phoneTitle}:</strong> <span>{aboutData.phone}</span></li>
                                    <li><strong>{aboutData.emailTitle}:</strong> <span>{aboutData.email}</span></li>
                                </ul>
                            </div>
                        </div>
                        <p>{aboutData.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutComponent;
