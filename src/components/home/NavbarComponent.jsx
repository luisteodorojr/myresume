import React, { useState, useEffect } from "react";
import 'boxicons/css/boxicons.min.css';
import '../assets/css/style.css';

const NavbarComponent = () => {

    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [activeItem, setActiveItem] = useState('hero');
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 992);

    const scrollto = (el) => {
        let elementPos = document.querySelector(el).offsetTop;
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        });
    };

    const handleItemClick = (event, targetId) => {
        event.preventDefault();
        scrollto(targetId);
        setActiveItem(targetId.replace('#', ''));
        setMobileNavActive(false);
        handleMobileNavToggle()
    };

    const toggleMobileNav = () => {
        if (window.innerWidth <= 992) {
            setMobileNavActive(!mobileNavActive);
        }
    };

    const handleMobileNavToggle = () => {
        if (window.innerWidth <= 992) {
            const body = document.querySelector('body');
            body.classList.toggle('mobile-nav-active');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentSection = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 50;
                const sectionBottom = sectionTop + section.clientHeight;

                if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionBottom) {
                    currentSection = section.id;
                }
            });

            setActiveItem(currentSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle) {
            mobileNavToggle.classList.toggle('bi-list', !mobileNavActive);
            mobileNavToggle.classList.toggle('bi-x', mobileNavActive);
            mobileNavToggle.addEventListener('click', handleMobileNavToggle);
        }

        return () => {
            if (mobileNavToggle) {
                mobileNavToggle.removeEventListener('click', handleMobileNavToggle);
            }
        };
    }, [mobileNavActive, isDesktop]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 992);
        };

        window.addEventListener('resize', handleResize);

        setIsDesktop(window.innerWidth > 992);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {!isDesktop && (
                <i className={`bx ${mobileNavActive ? 'bx-x' : 'bx-list'} mobile-nav-toggle`} onClick={toggleMobileNav}></i>
            )}
            <header id="header" className="d-flex flex-column justify-content-center">
                <nav id="navbar" className={`navbar nav-menu ${mobileNavActive ? 'mobile-nav-active' : ''}`}>
                    <ul>
                        <li><a href="#hero" className={`nav-link ${activeItem === 'hero' ? 'active' : ''}`} onClick={(e) => handleItemClick(e, '#hero')}><i className="bx bx-home"></i> <span>Home</span></a></li>
                        <li><a href="#about" className={`nav-link ${activeItem === 'about' ? 'active' : ''}`} onClick={(e) => handleItemClick(e, '#about')}><i className="bx bx-user"></i> <span>Sobre</span></a></li>
                        <li><a href="#resume" className={`nav-link ${activeItem === 'resume' ? 'active' : ''}`} onClick={(e) => handleItemClick(e, '#resume')}><i className="bx bx-file-blank"></i> <span>Resumo</span></a></li>
                        <li><a href="#skills" className={`nav-link ${activeItem === 'skills' ? 'active' : ''}`} onClick={(e) => handleItemClick(e, '#skills')}><i className="bx bx-server"></i> <span>Skills</span></a></li>
                        <li><a href="#contact" className={`nav-link ${activeItem === 'contact' ? 'active' : ''}`} onClick={(e) => handleItemClick(e, '#contact')}><i className="bx bx-envelope"></i> <span>Contato</span></a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default NavbarComponent;