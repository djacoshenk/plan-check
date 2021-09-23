import { Fragment } from "react";

import { HomePageFeatures } from "pages/HomePage/HomePageFeatures";
import { HomePageFooter } from "pages/HomePage/HomePageFooter";
import { HomePageHero } from "pages/HomePage/HomePageHero";

export function HomePage() {
  return (
    <Fragment>
      <HomePageHero />
      <HomePageFeatures />
      <HomePageFooter />
    </Fragment>
  );
}
