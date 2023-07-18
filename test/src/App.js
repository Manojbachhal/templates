import "./App.css";
import Header from "./Components/Header";
import Marquee from "./Components/Marquee";
import { Flex } from "@chakra-ui/react";
import Calender from "./Components/Calender";
import MessageBoard from "./Components/MessageBoard";
import Swipers from "./Components/Swipers";
import RecentApps from "./Components/RecentApps";
import indiagate from "./assets/indiagate.jpg";
import Footer from "./Components/Footer/Footer";

function App() {
  const images = [
    "https://www.drdo.gov.in/sites/default/files/inline-images/inner-default-banner.jpg",
    "https://static.mygov.in/static/s3fs-public/styles/home-slider-image/public/mygov_168786324482937911.jpg",
    "https://c.wallhere.com/photos/fe/be/DRDO_ATAGS_Howitzer-1150847.jpg!d",
    "https://images.unsplash.com/photo-1489223339793-de491ea9108b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1500252185289-40ca85eb23a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    "https://plus.unsplash.com/premium_photo-1661964074409-dfa736a88357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    "https://plus.unsplash.com/premium_photo-1661875576496-01a57a1f13a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    indiagate,
  ];
  const Hmarquee = [
    "e-Journals",
    "TDF",
    "ADA",
    "DIAT",
    "CGDA",
    "IDST",
    "Subordinate Legislation",
  ];
  const Vmarquee = [
    {
      date: "11/07/2023",
      content:
        "Engagement of Retired Government officials at Level-6 as Consultant on contract basis in DISB (DRDO): lnviting applications thereof - reg.",
      new: true,
    },

    {
      date: "10/07/2023",
      content:
        "ADVT. No. 28-2023/JRF/DIAT (DU) JRF Recruitment - Call for Application in DIAT, Pune",
      new: true,
    },
    {
      date: "10/07/2023",
      content:
        "ADVT. No. 30-2023/JRF/DIAT (DU) JRF Recruitment - Call for Application in DIAT, Pune",
      new: true,
    },
    {
      date: "10/07/2023",
      content:
        "Walk-in-Interviews for the Award of DRDO RA (2 Posts) and JRF (4 Posts) at INMAS Delhi during 2nd, 4th & 7th August 2023.",
      new: true,
    },
    {
      date: "07/07/2023",
      content:
        "Engagement of Retired Government Officials as ‘Consultant’ in LRDE (DRDO), Bengaluru on Contract basis",
    },
    {
      date: "07/07/2023",
      content:
        "Provisional Selected Candidates for the Post Of JRF (Mechanical Engg and Electronics and Communication Engg) in PXE Chandipur",
      new: true,
    },
  ];
  return (
    <div className="App">
      <Marquee MarqueeData={Hmarquee} isVertical={false} />
      <Header />
      {/* <Carousel images={images} /> */}
      <Swipers images={images} />
      {/* <Swiper1 /> */}
      <Flex justify={"space-evenly"} mt={4} paddingRight={"10px"}>
        <Marquee MarqueeData={Vmarquee} isVertical={true} />
        <MessageBoard />
        <Calender />
      </Flex>

      <RecentApps />
      <Footer />
    </div>
  );
}

export default App;
