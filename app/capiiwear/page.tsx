import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";


export const metadata = {
  title: "CapiiWear | Capii",
  description: "Ropa y accesorios oficiales de Capii.",
};

export default function CapiiWearPage() {
  return (
    <main>
      <Header />
      <FeaturedProducts />
      <Footer />
      
    </main>
  );
}
