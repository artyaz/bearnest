import Link from "next/link";

export default function CTACard({ text, style }) {
  return (
    <Link
      href="/"
      className={`${style} relative rounded-xl bg-cover bg-center bg-no-repeat`}
    >
      <span className="absolute bottom-3 px-3 font-e-ukraine text-[16px] font-bold uppercase leading-5 tracking-wide text-zinc-100 tablet:px-6 tablet:font-schabo tablet:text-[40px] tablet:font-normal tablet:leading-[50px]">
        {text}
      </span>
    </Link>
  );
}
