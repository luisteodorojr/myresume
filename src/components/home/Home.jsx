import React, { Component } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeaderComponent from './Header/HeaderComponent.jsx'
import ResumeComponent from './Resume/ResumeComponent.jsx'
import SkillsComponent from './Skills/SkillsComponent.jsx'
import FooterComponent from './Footer/FooterComponent.jsx'
import NavbarComponent from './NavbarComponent.jsx'
import AboutComponent from './About/AboutComponent.jsx'
import ContactComponent from './Contact/ContactComponent.jsx'
import ColorsService from './Services/ColorsService.jsx'
import LoadingSpinner from '../spinner/LoadingSpinner.jsx'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      colors: null
    };
  }

  componentDidMount() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    ColorsService().then(colors => {
      this.setState({ colors, loading: false });
      const root = document.documentElement;
      root.style.setProperty('--primary-color', colors.primaryColor ?? "#0563bb");
    });
  }

  render() {
    const { loading, colors } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <NavbarComponent />
        <HeaderComponent />
        <AboutComponent />
        <ResumeComponent />
        <SkillsComponent />
        <ContactComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default Home;
