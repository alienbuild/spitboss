import React from 'react';
import Header from './ui/Header';
import Footer from './ui/Footer';
import Container from '@material-ui/core/Container';


const Default = ({title = 'Title', description = 'Description', className, children}) => (
    <>
        <Header title={title} />
        <Container maxWidth={false}>
            <main className={className}>{children}</main>
        </Container>
        <Footer />
    </>
);

export default Default;