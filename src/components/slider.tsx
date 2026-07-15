import { slides } from "@/content/prep-copy";

// Stacked illustrations — full content width, one below the other.
export function Slider() {
  return (
    <div className="slides-stack" aria-label="How PREP works, in three steps">
      {slides.map((s) => (
        <figure className="slide" key={s.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.alt} width={1920} height={1080} loading="lazy" />
          <figcaption>{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
