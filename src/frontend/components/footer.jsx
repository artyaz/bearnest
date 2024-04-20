import Image from "next/image";
import Link from "next/link";
import { BButton } from "./bearnest-button";

export default function Footer() {
  const linkSectionData = [
    {
      title: "Information",
      links: [
        "Privacy",
        "FAQ",
        "Shipping and payment",
        "Partners",
        "Blog",
        "Contacts",
      ],
    },
    {
      title: "Menu",
      links: ["Furniture", "Room", "Ideas & Inspiration", "Yours", "Yours"],
    },
    {
      title: "Lorem",
      links: [
        "Lorem ipsum dolor",
        "Lorem ipsum",
        "Lorem dolor",
        "Lorem ipsum dolor",
      ],
    },
  ];

  const links = linkSectionData.map((data) => (
    <div className="flex flex-1 flex-col gap-4">
      <h3 className="leading-[1.25]">{data.title}</h3>
      <ul className="flex flex-col gap-2 text-[16px] font-medium leading-[1.4]">
        {data.links.map((link) => (
          <li>
            <Link href={"/"}>{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <footer className="flex flex-col px-4 font-e-ukraine tablet:px-8 desktop:px-40">
      <section className="flex flex-col gap-24 bg-[url('../../public/images/bear-paw.svg')] bg-contain bg-center bg-no-repeat px-6 py-8 tablet:px-10 tablet:py-8 laptop:bg-auto">
        <div className="grid gap-8 text-[12px] leading-tight tablet:grid-cols-[1fr_auto] desktop:grid-cols-[auto_auto_auto]">
          <Image
            src="/images/bearnest-logo-desktop.svg"
            alt="Bearnest Logo"
            width={129}
            height={40}
          />

          <div className="flex flex-col items-center gap-1 tablet:items-end desktop:col-start-3">
            <BButton
              text="Request a call"
              variant="orange"
              additionalStyles="w-fit p-4 text-[12px] font-bold"
            />
            <address className="flex flex-col items-center gap-4 font-medium not-italic tablet:items-end tablet:gap-1">
              <span>+1 (999) 999-99-99</span>
              <span>info@logoipsum.com</span>
            </address>
          </div>

          <div className="flex flex-wrap gap-6 tablet:col-span-2 desktop:col-start-2 desktop:col-end-3 desktop:row-start-1">
            {links}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 text-[12px] font-medium leading-tight tablet:flex-row tablet:justify-center">
          <div className="flex gap-8 tablet:gap-2">
            <BButton type="rounded" additionalStyles="h-12 w-12" />
            <BButton type="rounded" additionalStyles="h-12 w-12" />
            <BButton type="rounded" additionalStyles="h-12 w-12" />
          </div>

          <address className="flex-1 text-center not-italic">
            1 Chome-1-1 Dogenzaka, Shibuya City, Tokyo 150-0043, Japan
          </address>

          <p>
            <span className="font-bold">16+</span> / Sales policy
          </p>
        </div>
      </section>
    </footer>
  );
}
