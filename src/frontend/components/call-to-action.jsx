import OverviewCard from "./cta-overview-card";
import Card from "./cta-card";

export default function CallToAction() {
  const cardData = [
    {
      text: "Check out new products",
      style: "bg-[url(../../public/images/couch.png)] desktop:row-start-2",
    },
    {
      text: "Find us in your city",
      style:
        "bg-[url(../../public/images/bearnest-catalog.png)] desktop:row-start-2",
    },
    {
      text: "Upgrade your space",
      style:
        "bg-[url(../../public/images/chair.png)] desktop:col-start-3 desktop:row-start-1",
    },
    {
      text: "Don't miss out our sale!",
      style:
        "bg-[#949446] bg-[url(../../public/images/paws.svg)] desktop:row-start-2",
    },
    {
      text: "Discover new seasonal offers!",
      style:
        "col-span-2 bg-[#949446] bg-[url(../../public/images/offers.png)] desktop:col-auto desktop:row-span-2",
    },
  ];

  const cards = cardData.map((data) => <Card {...data} key={data.text} />);

  return (
    <section className="mx-4 mt-[72px] grid grid-cols-2 grid-rows-[194px_repeat(2,_164px)_343px] gap-4 tablet:mx-8 tablet:grid-rows-[328px_repeat(2,_335px)_625px] tablet:gap-8 desktop:mx-40 desktop:grid-cols-4 desktop:grid-rows-[repeat(2,_376px)]">
      <OverviewCard />
      {cards}
    </section>
  );
}
