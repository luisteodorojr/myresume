import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import ContactService from './ContactService';
import LoadingSpinner from '../../spinner/LoadingSpinner.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ContactComponent = () => {
    const [contactData, setContactData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        ContactService()
            .then(data => {
                setContactData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching contact data:', error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { serviceId, templateId, userId } = contactData;
    
        setLoading(true);
    
        emailjs.send(serviceId, templateId, formData, userId)
            .then((response) => {
                console.log('E-mail enviado com sucesso!', response.status, response.text);
                setShowSuccessMessage(true);
            }, (error) => {
                console.error('Erro ao enviar e-mail:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    if (loading || !contactData) {
        return <LoadingSpinner />;
    }

    return (
        <section id="contact" className="contact">
             {loading && <LoadingSpinner />}
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>{contactData.contact}</h2>
                </div>
                <div className="row mt-1">
                    <div className="col-lg-4">
                        <div className="info">
                            <div className="address">
                                <i className="bi bi-geo-alt"></i>
                                <h4>{contactData.localTitle}:</h4>
                                <p>{contactData.local}</p>
                            </div>
                            <div className="email">
                                <i className="bi bi-envelope"></i>
                                <h4>{contactData.emailTitle}:</h4>
                                <p>{contactData.email}</p>
                            </div>
                            <div className="phone">
                                <i className="bi bi-phone"></i>
                                <h4>{contactData.phoneTitle}:</h4>
                                <p>{contactData.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-5 mt-lg-0">
                        <form onSubmit={handleSubmit} className="php-email-form">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Nome" required onChange={handleChange} value={formData.name} />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Assunto" required onChange={handleChange} value={formData.subject} />
                            </div>
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" rows="5" placeholder="Mensagem" required onChange={handleChange} value={formData.message}></textarea>
                            </div>
                            <div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                {showSuccessMessage && <div className="alert alert-success">Sua mensagem foi enviada. Obrigado!</div>}
                            </div>
                            <div className="text-center"><button type="submit">Enviar Mensagem</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactComponent;