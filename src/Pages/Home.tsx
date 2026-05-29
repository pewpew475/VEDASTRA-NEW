import Header from "../Components/Header"
import Actionbutton from "../Components/Action-button"
import Todayhoroscope from "../Components/Today-horoscope"
import Freeservices from "../Components/Freeservices"
import Latestfromvedastra from "../Components/Latest-from-vedastra"
import OurAstrologers from "../Components/our-Astrologers"
import SeoSection from "../Components/Seo-section"
import Testimonials from "../Components/Testimonials"
import FAQ from "../Components/FAQ"

function Home() {
  return (
    <div className="bg-white">

        <Header />
        <Actionbutton />
        <Todayhoroscope />
        <Freeservices />
        <Latestfromvedastra />
        <OurAstrologers/>
        <Testimonials/>
        <SeoSection/>
        <FAQ/>

    </div>
  )
}

export default Home
