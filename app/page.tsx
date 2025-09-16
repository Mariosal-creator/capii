import Header from "../components/Header";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import BestSellers from "../components/BestSellers";
import VisitsTimeline from "@/components/VisitsTimeline";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Banner />
      <Testimonials />
      <BestSellers />
      <VisitsTimeline />
      <Footer />
    </>
  );
}
