import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { CreateEmblaCarouselType } from "embla-carousel-solid";
import createEmblaCarousel from "embla-carousel-solid";
import type { Accessor, ComponentProps, Setter, ValidComponent, VoidProps } from "solid-js";
import { createContext, createEffect, mergeProps, onCleanup, onMount, splitProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { cx } from "@/components/utils/cva";
import type { ButtonProps } from "./button";
import { Button } from "./button";

type CarouselAPI = CreateEmblaCarouselType[1];
type CreateCarouselParameters = Parameters<typeof createEmblaCarousel>;
type CarouselOptions = CreateCarouselParameters[0];
type CarouselPlugin = CreateCarouselParameters[1];

export interface CarouselOptionsProps {
  options?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setAPI?: Setter<CarouselAPI>;
}

export type CarouselProps = ComponentProps<"div"> & CarouselOptionsProps;

type CarouselContextProps = {
  ref: ReturnType<typeof createEmblaCarousel>[0];
  api: ReturnType<typeof createEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: Accessor<boolean>;
  canScrollNext: Accessor<boolean>;
} & CarouselOptionsProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
};

export const Carousel = (props: CarouselProps) => {
  const merge = mergeProps<CarouselProps[]>(
    {
      orientation: "horizontal",
    },
    props,
  );
  const [, rest] = splitProps(merge, ["orientation", "options", "setAPI", "plugins", "class", "children"]);

  const [ref, api] = createEmblaCarousel(
    () => ({
      ...props.options?.(),
      axis: props.orientation === "horizontal" ? "x" : "y",
    }),
    () => props.plugins?.() ?? [],
  );

  const [store, setStore] = createStore({
    canScrollNext: false,
    canScrollPrev: false,
  });

  const onSelect = (api: CarouselAPI) => {
    if (!api()) return;
    setStore({
      canScrollNext: api()!.canScrollNext(),
      canScrollPrev: api()!.canScrollPrev(),
    });
  };

  const scrollPrev = () => {
    api()?.scrollPrev();
  };

  const scrollNext = () => {
    api()?.scrollNext();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  onMount(() => {
    if (!api() || !props.setAPI) return;
    // @ts-expect-error - api should be defined
    props.setAPI(api);
  });

  createEffect(() => {
    if (!api()) return;
    onSelect(api);
    api()!.on("reInit", (api) => {
      onSelect(() => api);
    });
    api()!.on("select", (api) => {
      onSelect(() => api);
    });

    onCleanup(() => {
      api()!.off("select", (api) => {
        onSelect(() => api);
      });
    });
  });

  const value: CarouselContextProps = {
    api,
    canScrollNext: () => store.canScrollNext,
    canScrollPrev: () => store.canScrollPrev,
    get options() {
      return props.options;
    },
    get orientation() {
      return props.orientation ?? (props.options?.().axis === "y" ? "vertical" : "horizontal");
    },
    get plugins() {
      return props.plugins;
    },
    ref,
    scrollNext,
    scrollPrev,
    get setAPI() {
      return props.setAPI;
    },
  };

  return (
    <CarouselContext.Provider value={value}>
      <div aria-roledescription="carousel" class={cx("relative", props.class)} data-slot="carousel" onKeyDown={handleKeyDown} role="region" {...rest}>
        {props.children}
      </div>
    </CarouselContext.Provider>
  );
};

export type CarouselContentProps = ComponentProps<"div">;

export const CarouselContent = (props: CarouselContentProps) => {
  const { ref, orientation } = useCarousel();
  const [, rest] = splitProps(props, ["class"]);

  return (
    <div class="overflow-hidden" data-slot="carousel-content" ref={ref}>
      <div class={cx("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", props.class)} {...rest} />
    </div>
  );
};

export type CarouselItemProps = ComponentProps<"div">;

export const CarouselItem = (props: CarouselItemProps) => {
  const { orientation } = useCarousel();
  const [, rest] = splitProps(props, ["class"]);

  return (
    <div
      aria-roledescription="slide"
      class={cx("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", props.class)}
      data-slot="carousel-item"
      role="group"
      {...rest}
    />
  );
};

export type CarouselNextProps<T extends ValidComponent = "button"> = VoidProps<ButtonProps<T>>;

export const CarouselNext = <T extends ValidComponent = "button">(props: PolymorphicProps<T, CarouselNextProps<T>>) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const merge = mergeProps<CarouselNextProps[]>(
    {
      size: "icon",
      variant: "outline",
    },
    props as CarouselNextProps,
  );
  const [, rest] = splitProps(merge, ["class", "variant", "size"]);

  return (
    <Button
      class={cx(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        props.class,
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext()}
      onClick={scrollNext}
      size={props.size}
      variant={props.variant}
      {...rest}
    >
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14m-7-7l7 7l-7 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </Button>
  );
};

export type CarouselPreviousProps<T extends ValidComponent = "button"> = VoidProps<ButtonProps<T>>;

export const CarouselPrevious = <T extends ValidComponent = "button">(props: PolymorphicProps<T, CarouselPreviousProps<T>>) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const merge = mergeProps<CarouselPreviousProps[]>(
    {
      size: "icon",
      variant: "outline",
    },
    props as CarouselPreviousProps,
  );
  const [, rest] = splitProps(merge, ["class", "variant", "size"]);

  return (
    <Button
      class={cx(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        props.class,
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev()}
      onClick={scrollPrev}
      size={props.size}
      variant={props.variant}
      {...rest}
    >
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m12 19l-7-7l7-7m7 7H5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </Button>
  );
};
