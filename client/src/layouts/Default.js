import React from 'react';
import Header from './ui/Header';
import Footer from './ui/Footer';


const Default = ({title = 'Title', description = 'Description', className, children}) => (
    <>
        <Header title={title} description={description} />
        <main className={className}>{children}</main>
        <Footer />
    </>
);

export default Default;