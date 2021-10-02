import { Fragment } from "react";

import { HomeFeatures } from "pages/Home/HomeFeatures";
import { HomeFooter } from "pages/Home/HomeFooter";
import { HomeHero } from "pages/Home/HomeHero";
import { HomeStats } from "pages/Home/HomeStats";

export function Home() {
  return (
    <Fragment>
      <HomeHero />
      <HomeFeatures />
      <HomeStats />
      <HomeFooter />
    </Fragment>
  );
}
