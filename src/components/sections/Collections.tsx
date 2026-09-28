import { Button } from "@/components/ui/button";
import { ArrowIcon, PlusIcon } from "@/components/Icons";
import { categories, products, type Category, type Product } from "@/data/catalog";
import { fullVersionToast, useStore } from "@/state/store";
import { cn, img, inr } from "@/lib/utils";
import { SectionHead, wrap } from "./Section";

function CategoryTile({ c, n, className }: { c: Category; n: number; className?: string }) {
  const lead = n === 1;
  return (
    <a
      id={c.id}
      href={`#${c.id}`}
      onClick={(e) => {
        e.preventDefault();
        fullVersionToast(`The ${c.name} collection page comes with the full site.`);
      }}
      className={cn("reveal group relative block scroll-mt-28 overflow-hidden bg-night text-ivory", className)}
    >
      <img
        src={img(c.image)}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-settle)] group-hover:scale-[1.03]"
      />
      <span aria-hidden className="tile-fade absolute inset-x-0 bottom-0 h-[58%]" />
      {c.standIn && (
        <span className="absolute left-3.5 top-3.5 inline-flex h-[22px] items-center border border-dashed border-gold/60 bg-night/60 px-2.5 text-[9.5px] uppercase tracking-[0.2em] md:left-6 md:top-6 md:h-6 md:text-[10px]">
          Stand-in image · swap for lehenga
        </span>
      )}
      <span className={cn("absolute flex items-end justify-between", lead ? "inset-x-5 bottom-5 md:inset-x-9 md:bottom-9" : "inset-x-3.5 bottom-3.5 md:inset-x-6 md:bottom-6")}>
        <span className="flex flex-col gap-1.5 md:gap-2.5">
          <span className="kicker text-[9.5px] md:text-[10px]">{String(n).padStart(2, "0")}{lead && " · Leads the season"}</span>
          <span className={cn("font-serif leading-none", lead ? "text-[36px] md:text-[64px]" : "text-[24px] md:text-[34px]")}>{c.name}</span>
        </span>
        {lead && (
          <span className="kicker flex items-center gap-2 text-[10px] md:text-[11px]">
            Explore <ArrowIcon size={14} />
          </span>
        )}
      </span>
    </a>
  );
}

export function Categories() {
  const [lead, bridal, sherwani, tuxedo, suits] = categories;
  return (
    <section id="shop" aria-labelledby="shop-title" className={`${wrap} flex scroll-mt-20 flex-col gap-8 py-16 pb-[72px] md:gap-12 md:py-[120px]`}>
      <SectionHead
        kicker="I · The collections"
        title={<span id="shop-title">Shop by category</span>}
        action={
          <Button variant="link" className="hidden h-11 md:inline-flex" onClick={() => fullVersionToast("Collection pages come with the full site.")}>
            All collections <ArrowIcon />
          </Button>
        }
      />
      {/* Editorial grid: the lead tile large, the rest smaller and staggered. */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <CategoryTile c={lead} n={1} className="aspect-[342/420] md:aspect-auto md:h-[840px] md:w-[49%]" />
        <div className="grid flex-1 grid-cols-2 items-start gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <CategoryTile c={bridal} n={2} className="aspect-[163/240] md:aspect-auto md:h-[380px]" />
            <CategoryTile c={tuxedo} n={4} className="aspect-[163/240] md:aspect-auto md:h-[380px]" />
          </div>
          <div className="mt-12 flex flex-col gap-4 md:mt-14 md:gap-6">
            <CategoryTile c={sherwani} n={3} className="aspect-[163/240] md:aspect-auto md:h-[380px]" />
            <CategoryTile c={suits} n={5} className="aspect-[163/240] md:aspect-auto md:h-[380px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  const { add } = useStore();
  return (
    <article className="reveal flex flex-col gap-3 md:gap-4" style={{ ["--reveal-delay" as string]: `${(i % 4) * 80}ms` }}>
      <div className="group relative aspect-[4/5] overflow-hidden bg-night">
        <img
          src={img(p.image)}
          alt={`${p.name}${p.tag === "Detail" ? ", embroidery detail" : ""}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-settle)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-2 top-2 inline-flex h-[22px] items-center border border-gold/55 bg-night/60 px-2.5 text-[9.5px] uppercase tracking-[0.2em] text-gold md:left-3 md:top-3 md:h-6 md:text-[10px]">
          {p.tag}
        </span>
        <button
          type="button"
          onClick={() => add(p)}
          aria-label={`Add ${p.name} to your order slip`}
          className="absolute bottom-1 right-1 grid size-11 cursor-pointer place-items-center rounded-full text-gold transition-colors hover:text-gold-bright md:bottom-2 md:right-2 md:border md:border-gold/50 md:bg-night/55"
        >
          <PlusIcon />
        </button>
      </div>
      <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-3">
        <h3 className="m-0 font-serif text-[19px] font-medium leading-[1.1] md:text-[23px] md:leading-[1.15]">{p.name}</h3>
        <span className="whitespace-nowrap text-[13px] text-muted md:text-[14px]">{inr(p.price)}</span>
      </div>
      <span className="kicker -mt-1 hidden text-[10px] text-muted md:block">{p.line}</span>
    </article>
  );
}

export function NewArrivals() {
  return (
    <section aria-labelledby="new-title" className="md:border-t md:border-gold/22">
      <div className={`${wrap} flex flex-col gap-8 py-16 pb-[72px] md:gap-12 md:py-[120px]`}>
        <SectionHead
          kicker="II · Just in"
          title={<span id="new-title">New arrivals</span>}
          action={
            <Button variant="link" className="hidden h-11 md:inline-flex" onClick={() => fullVersionToast("The full catalogue comes with the full site.")}>
              View the collection <ArrowIcon />
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <div className="flex justify-center md:hidden">
          <Button variant="link" onClick={() => fullVersionToast("The full catalogue comes with the full site.")}>
            View the collection <ArrowIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
