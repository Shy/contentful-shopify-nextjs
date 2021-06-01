import Image from "next/image";
import Styles from "./Images.module.css";
import { useState, useRef, useEffect } from "react";
import ChevronLeft from "@svg/chevron_left";
import ChevronRight from "@svg/chevron_right";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Images({ images }) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderContainerRef = useRef();

  const [ref, slider] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  // https://github.com/vercel/commerce/blob/master/components/product/ProductSlider/ProductSlider.tsx
  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX;
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0;

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault();
    };

    sliderContainerRef.current.addEventListener("touchstart", preventNavigation);

    return () => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current.removeEventListener("touchstart", preventNavigation);
      }
    };
  }, []);

  return (
    <div ref={sliderContainerRef} className={Styles.images}>
      <button
        aria-label="View previous image"
        className={`${Styles.images__nav} ${Styles.images__nav__prev}`}
        onClick={slider?.prev}
      >
        <span className={Styles.images__nav__svg}>
          <ChevronLeft />
        </span>
      </button>
      <button
        aria-label="View next image"
        className={`${Styles.images__nav} ${Styles.images__nav__next}`}
        onClick={slider?.next}
      >
        <span className={Styles.images__nav__svg}>
          <ChevronRight />
        </span>
      </button>
      <div
        ref={ref}
        className={`keen-slider ${Styles.images__slider}`}
        style={{ opacity: isMounted ? 1 : 0 }}
      >
        {images.map((image, i) => (
          <div key={image.sys.id} className={`keen-slider__slide ${Styles.images__imageContainer}`}>
            <Image
              className={Styles.images__slide}
              src={image.url}
              alt={image.description}
              width={1050}
              height={1050}
              priority={i === 0}
              quality="85"
            />
          </div>
        ))}
      </div>
      {slider && (
        <div className={Styles.images__indicatorContainer}>
          {[...Array(slider.details().size).keys()].map((index) => {
            const classNames =
              currentSlide === index
                ? `${Styles.images__indicator} ${Styles.images__indicator__active}`
                : Styles.images__indicator;
            return (
              <button
                aria-label="Position indicator"
                key={index}
                className={classNames}
                onClick={() => {
                  slider.moveToSlideRelative(index);
                }}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
