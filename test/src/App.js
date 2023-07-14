import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Carousel from "./Components/Carousel";
import Marquee from "./Components/Marquee";
import { Flex } from "@chakra-ui/react";
import Calender from "./Components/Calender";
import MessageBoard from "./Components/MessageBoard";

function App() {
  const images = [
    "https://www.drdo.gov.in/sites/default/files/inline-images/inner-default-banner.jpg",
    "https://static.mygov.in/static/s3fs-public/styles/home-slider-image/public/mygov_168786324482937911.jpg",
    "https://c.wallhere.com/photos/fe/be/DRDO_ATAGS_Howitzer-1150847.jpg!d",
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
      <Carousel images={images} />
      <Flex justify={"space-between"} mt={4} paddingRight={"10px"}>
        <Marquee MarqueeData={Vmarquee} isVertical={true} />
        <MessageBoard />
        {/* <Calender /> */}
      </Flex>
    </div>
  );
}

export default App;
