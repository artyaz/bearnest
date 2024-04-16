import { BButton } from "./bearnest-button";

export default function CTAOverviewCard() {
  const buttonSharedStyles =
    "py-3 pl-4 pr-6 text-[12px] font-bold uppercase uppercase leading-[15px]";

  return (
    <div className="col-span-2 flex flex-col gap-3 rounded-[12px] bg-white bg-[url(../../public/images/wood-pattern.svg)] bg-cover bg-no-repeat p-3 tablet:gap-6 tablet:rounded-[32px] tablet:p-6 desktop:gap-14 desktop:p-8">
      <p className="font-schabo text-[44px] uppercase leading-[55px] tracking-wide text-zinc-900 tablet:text-[88px] tablet:leading-[104px] tablet:tracking-[0.88px]">
        Bear-ly Believable
        <br />
        Furniture Finds!
      </p>

      <div className="flex gap-3">
        <BButton
          text="Catalog"
          icon="manage_search"
          variant="orange"
          additionalStyles={buttonSharedStyles}
        />

        <BButton
          text="Company"
          icon="keyboard_arrow_right"
          additionalStyles={buttonSharedStyles}
        />
      </div>
    </div>
  );
}
