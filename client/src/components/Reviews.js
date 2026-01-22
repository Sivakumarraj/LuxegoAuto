import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

const Reviews = () => {
    const [currentReview, setCurrentReview] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    
    const reviews = [
        {
            name: 'Ajo Joseph',
            rating: 5,
            text: 'Amazing work. I felt so refreshed once entered in the car after the cleaning. The car looks stunning inside and outside. Well done and keep it up.',
            avatar: 'AJ'
        },
        {
            name: 'Sarah Johnson',
            rating: 5,
            text: 'Excellent service from start to finish. The team was professional, thorough, and my car has never looked better. Highly recommend!',
            avatar: 'SJ'
        },
        {
            name: 'Michael Chen',
            rating: 5,
            text: 'Convenient mobile service that saved me so much time. The attention to detail was impressive, and the results speak for themselves.',
            avatar: 'MC'
        },
        {
            name: 'Emma Williams',
            rating: 5,
            text: 'Best car detailing service in Chelmsford! They brought my 10-year-old car back to life. Worth every penny!',
            avatar: 'EW'
        }
    ];

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const goToReview = (index) => {
        setCurrentReview(index);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [currentReview, isAutoPlaying, reviews.length]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`fas fa-star ${i < rating ? 'active' : ''}`}></i>
        ));
    };

    return (
        <section className={`section ${styles.bgDark}`} id="reviews">
            <div className="container">
                <h2 className="section-title fade-in">What Our Clients Say</h2>
                <div className={`${styles.ratingBadge} fade-in`}>
                    <div className={styles.stars}>
                        {renderStars(5)}
                    </div>
                    <span>5.0 from Google Reviews</span>
                </div>
                
                <div 
                    className={`${styles.reviewsCarousel} fade-in`}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <button className={`${styles.carouselBtn} ${styles.prev}`} onClick={prevReview} aria-label="Previous review">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    
                    <div className="review-card glass-card">
                        <div className={styles.reviewContent}>
                            <div className={styles.reviewText}>
                                "{reviews[currentReview].text}"
                            </div>
                            <div className={styles.reviewAuthor}>
                                <div className={styles.authorAvatar}>
                                    {reviews[currentReview].avatar}
                                </div>
                                <div className={styles.authorInfo}>
                                    <div className={styles.authorName}>{reviews[currentReview].name}</div>
                                    <div className={styles.reviewRating}>
                                        {renderStars(reviews[currentReview].rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className={`${styles.carouselBtn} ${styles.next}`} onClick={nextReview} aria-label="Next review">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div className={`${styles.carouselDots} fade-in`}>
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentReview ? styles.dotActive : ''}`}
                            onClick={() => goToReview(index)}
                            aria-label={`Go to review ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;