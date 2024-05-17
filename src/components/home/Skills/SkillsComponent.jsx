import React, { useEffect, useRef, useState } from 'react';
import SkillsService from './SkillsService';
import LoadingSpinner from '../../spinner/LoadingSpinner.jsx';

const SkillsComponent = () => {
    const skillsContentRef = useRef(null);
    const [skillsData, setSkillsData] = useState({
        skillsTitle: '',
        skillsListFirst: [],
        skillsListLast: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateProgress = () => {
            const progressBars = document.querySelectorAll('.progress .progress-bar');
            progressBars.forEach((progressBar, index) => {
                let skill;
                if (index < skillsData.skillsListFirst.length) {
                    skill = skillsData.skillsListFirst[index];
                } else if (index - skillsData.skillsListFirst.length < skillsData.skillsListLast.length) {
                    skill = skillsData.skillsListLast[index - skillsData.skillsListFirst.length];
                }
                if (skill && skill.ariaValue) {
                    const value = parseInt(skill.ariaValue);
                    progressBar.style.width = `${value}%`;
                }
            });
        };

        const handleScroll = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateProgress();
                }
            });
        };

        if (skillsContentRef.current) {
            const observer = new IntersectionObserver(handleScroll, {
                threshold: 0.8,
            });
            observer.observe(skillsContentRef.current);
    
            return () => {
                observer.unobserve(skillsContentRef.current);
            };
        }
    }, [skillsContentRef, skillsData]);

    useEffect(() => {
        SkillsService()
            .then(data => {
                setSkillsData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching skills data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section id="skills" className="skills section-bg">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>{skillsData.skills}</h2>
                    <p>{skillsData.skillsTitle}</p>
                </div>

                <div className="row skills-content" ref={skillsContentRef}>
                    <div className="col-lg-6">
                        {skillsData.skillsListFirst.map((skill, index) => (
                            <div className="progress" key={index}>
                                <span className="skill">{skill.title} <i className="val">{skill.percentage}</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" role="progressbar" aria-valuenow={skill.ariaValue} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-6">
                        {skillsData.skillsListLast.map((skill, index) => (
                            <div className="progress" key={index}>
                                <span className="skill">{skill.title} <i className="val">{skill.percentage}</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" role="progressbar" aria-valuenow={skill.ariaValue} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsComponent;
