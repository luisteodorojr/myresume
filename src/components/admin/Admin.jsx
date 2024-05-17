import React, { Component } from "react";
import AdminHeader from './AdminHeader.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Admin extends Component {

  componentDidMount() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  render() {
    return (
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Painel de Administração</h2>
          </div>
          <div class="row gy-4">
            <div className="col-lg-6">
              <AdminHeader />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Admin;
