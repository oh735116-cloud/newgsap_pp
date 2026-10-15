import Image from "next/image";

export default function ClosingSection() {
  return (
    <section
      aria-labelledby="closing-title"
      data-header-tone="light"
      className="relative isolate flex min-h-[75svh] flex-col justify-center overflow-hidden bg-[#0c1629] px-6 py-28 text-center text-[#f1f5fc] md:min-h-[85svh] md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/closing-theater.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0c1629_0%,rgba(12,22,41,0.25)_25%,rgba(12,22,41,0.4)_65%,#0c1629_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-7 text-[11px] font-medium tracking-[0.35em] text-[#a9c2e8]">
          THANK YOU FOR YOUR TIME
        </p>
        <h2
          id="closing-title"
          className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[1.15] tracking-[-0.06em]"
        >
          감사합니다.
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-sm leading-8 text-[#c4d1e5] md:text-base">
          저의 이야기를 끝까지 함께해 주셔서 감사합니다.
          <br />
          다음 무대에서, 새로운 경험으로 만나겠습니다.
        </p>
        <a
          href="#top"
          className="mt-12 inline-flex items-center gap-4 rounded-full border border-[#a9c2e8]/30 px-6 py-3 text-xs font-medium tracking-wide text-[#dbe6f7] transition-colors hover:border-[#a9c2e8]/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a9c2e8]"
        >
          처음으로 돌아가기 <span aria-hidden="true">↑</span>
        </a>
      </div>

      <p className="mt-20 text-[10px] tracking-[0.3em] text-[#a9c2e8]/70">
        MUSIC · STAGE · EXPERIENCE
      </p>
    </section>
  );
}
