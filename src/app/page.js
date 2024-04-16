import ProductListView from "@/frontend/components/product-list-view";
import CallToAction from "@/frontend/components/call-to-action";

export default function Home() {
  return (
    <>
      <CallToAction />
      <ProductListView title="Chairs" />
    </>
  );
}
