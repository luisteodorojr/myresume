import React, { useEffect, useState } from 'react';
import ResumeService from './ResumeService';
import LoadingSpinner from '../../spinner/LoadingSpinner.jsx'

const ResumeComponent = () => {
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await ResumeService();
                setResumeData(data);
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        };


        fetchData();
    }, []);

    if (!resumeData) {
        return <LoadingSpinner />;
    }

    return (
        <section id="resume" className="resume">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>{resumeData.resume}</h2>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="resume-title">{resumeData.academicEducationTitle}</h3>
                        {resumeData.academicEducationList.map((item, index) => (
                            <div key={index} className="resume-item">
                                <h4>{item.title}</h4>
                                <h5>{item.date}</h5>
                                <p><em>{item.qualification}</em></p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="resume-title">{resumeData.professionalExperienceTitle}</h3>
                        {resumeData.professionalExperienceList.map((item, index) => (
                            <div key={index} className="resume-item">
                                <h4>{item.title}</h4>
                                <h5>{item.date}</h5>
                                <p><em>{item.company}</em></p>
                                <ul>{item.description}</ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="resume-title">{resumeData.certificatesTitle}</h3>
                        {resumeData.certificatesList.map((item, index) => (
                            <div key={index} className="resume-item">
                                <h4>{item.title}</h4>
                                <h5>{item.date}</h5>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ResumeComponent;