import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondPageComponent1 from './SecondPageComponent1';
import SecondPageComponent2 from './SecondPageComponent2';
import './SecondPage.css';

const SecondPage: React.FC = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem('userDetails');
        if (!data) {
            window.confirm("Please Enter Your Details to Access this page");
            // NAVIGATE TO PREVIOUS PAGE
            navigate("/");
        }
    }, 
[navigate]);
    
    return (
        <div className='secondpage'>
            <div className='component1'>
                <SecondPageComponent1 />
            </div>
            <div className='component2'>
                <SecondPageComponent2 />
            </div>
        </div>
    );
};

export default SecondPage;