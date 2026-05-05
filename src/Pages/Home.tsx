import Banner from "../Components/Banner"
import Actionbutton from "../Components/Action-button"
import Freeservices from "../Components/Freeservices"
import Latestfromvedastra from "../Components/Latest-from-vedastra"
import OurAstrologers from "../Components/our-Astrologers"
import SeoSection from "../Components/Seo-section"
import FAQ from "../Components/FAQ"

function Home() {
  return (
    <div>

        <Banner />
        <Actionbutton />
        <Freeservices />
        <Latestfromvedastra />
        <OurAstrologers/>
        <SeoSection/>
        <FAQ/>

    </div>
  )
}

export default Home
