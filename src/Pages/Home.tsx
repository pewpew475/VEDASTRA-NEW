import Banner from "../Components/Banner"
import Actionbutton from "../Components/Action-button"
import Todayhoroscope from "../Components/Today-horoscope"
import Freeservices from "../Components/Freeservices"
import Latestfromvedastra from "../Components/Latest-from-vedastra"
import OurAstrologers from "../Components/our-Astrologers"
import SeoSection from "../Components/Seo-section"
import FAQ from "../Components/FAQ"

type HomeProps = {
  bannerInitialDelayMs?: number;
};

function Home({ bannerInitialDelayMs = 3000 }: HomeProps) {
  return (
    <div className="bg-white">

        <Banner initialDelayMs={bannerInitialDelayMs} />
        <Actionbutton />
        <Todayhoroscope />
        <Freeservices />
        <Latestfromvedastra />
        <OurAstrologers/>
        <SeoSection/>
        <FAQ/>

    </div>
  )
}

export default Home
