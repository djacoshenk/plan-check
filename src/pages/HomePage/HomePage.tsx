import { HomePageHeroSection } from 'pages/HomePage/HomePageHeroSection';
import { HomePageNavBar } from 'pages/HomePage/HomePageNavBar';

import 'pages/HomePage/HomePage.css';

export function HomePage() {
  return (
    <main className='home-page-main-container'>
      <HomePageNavBar />
      <HomePageHeroSection />
    </main>
  );
}
