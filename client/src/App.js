import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import AddOns from './components/AddOns';
import Vision from './components/Vision';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);

            const sections = ['home', 'services', 'reviews', 'booking', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="App">
            <Navbar 
                scrolled={scrolled} 
                activeSection={activeSection}
                scrollToSection={scrollToSection} 
            />
            <main>
                <Hero scrollToSection={scrollToSection} />
                <Packages id="services" />
                <AddOns />
                <Vision />
                <Reviews id="reviews" />
                <Booking id="booking" />
                <Contact id="contact" />
            </main>
            <Footer />
            <FloatingButton />
        </div>
    );
}

export default App;