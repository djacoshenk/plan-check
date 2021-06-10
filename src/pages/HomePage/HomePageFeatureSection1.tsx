import FeatureOneImage from 'assets/engineering-feature-1.jpg';

import 'pages/HomePage/HomePageFeatureSection1.css';

export function HomePageFeatureSection1() {
  return (
    <section className='home-page-features-section-1-container'>
      <div className='home-page-features-section-1-image-container'>
        <img
          src={FeatureOneImage}
          alt=''
          className='home-page-features-section-1-image'
        />
      </div>
      <div className='home-page-features-section-1-heading-detail-container'>
        <h1 className='home-page-features-section-1-heading'>Go Paperless.</h1>
        <h2 className='home-page-features-section-1-detail'>
          Stop wasting paper and time. Submit construction document PDFs
          digitally and your engineer will review them.
        </h2>
        <button className='home-page-features-section-1-btn'>Learn More</button>
      </div>
    </section>
  );
}
