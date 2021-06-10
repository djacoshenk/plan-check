import HeroImage from 'assets/engineering-hero.jpg';

import 'pages/HomePage/HomePageHeroSection.css';

export function HomePageHeroSection() {
  return (
    <section className='home-page-hero-section-container'>
      <div className='home-page-hero-section-image-container'>
        <img src={HeroImage} className='home-page-hero-section-image' alt='' />
      </div>
      <div className='home-page-hero-section-detail-btn-container'>
        <h2 className='home-page-hero-section-detail'>
          Plan check services for developers and engineers.
        </h2>
        <button type='button' className='home-page-hero-section-btn'>
          Get Started
        </button>
      </div>
    </section>
  );
}
