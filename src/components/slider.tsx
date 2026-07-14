import { slides } from "@/content/prep-copy";

// Pure-CSS scroll-snap slider — no JS. If the images are missing at build
// time the component still renders its captions gracefully.
export function Slider() {
  return (
    <div className="slider" aria-label="How PREP works, in three steps">
      <div className="slider-track">
        {slides.map((s) => (
          <figure className="slide" key={s.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} width={1920} height={1080} loading="lazy" />
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="slider-hint" aria-hidden="true">
        ← scroll →
      </p>
    </div>
  );
}
