import React, { useState, useEffect } from 'react';
import HeaderService from '../home/Header/HeaderService.jsx';
import LoadingSpinner from '../spinner/LoadingSpinner.jsx';
import HeaderEditService from './HeaderEditService.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminHeader = () => {
    const [loading, setLoading] = useState(true);
    const [headerData, setHeaderData] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });

        setLoading(true);

        HeaderService()
            .then(data => {
                setHeaderData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao obter dados:', error);
                setLoading(false);
            });
    }, []);

    const updateHeaderData = (fieldName, newValue) => {
        setHeaderData(prevData => ({
            ...prevData,
            [fieldName]: newValue
        }));
    };

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        updateHeaderData(fieldName, value);
    };

    const handleSave = () => {
        setLoading(true);

        HeaderEditService(headerData)
            .then(data => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Erro ao salvar dados:', error);
            });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Editar Header</h5>
                <form className='php-email-form'>
                    <div className="row mb-3">
                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Nome</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputText" value={headerData.name} onChange={(e) => handleChange(e, 'name')} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Instagram</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputText" value={headerData.linkInstagram} onChange={(e) => handleChange(e, 'linkInstagram')} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Linkedin</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputText" value={headerData.linkLinkedin} onChange={(e) => handleChange(e, 'linkLinkedin')} />
                        </div>
                    </div>

                    <div className="text-center"><button type="submit" onClick={handleSave}>Atualizar</button></div>

                </form>
            </div>
        </div>

    );
};

export default AdminHeader;
