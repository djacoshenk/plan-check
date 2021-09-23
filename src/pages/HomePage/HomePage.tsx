import { Fragment } from "react";

import { HomePageFeatures } from "pages/HomePage/HomePageFeatures";
import { HomePageFooter } from "pages/HomePage/HomePageFooter";
import { HomePageHero } from "pages/HomePage/HomePageHero";

export function HomePage() {
  return (
    <main className="home-page-main-container">
      <HomePageNavBar />
      <HomePageHeroSection />
      <HomePageFeaturesSection />
    </main>
  );
}
