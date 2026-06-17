import { useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  getProduct,
  SIZE_OPTIONS,
  FRAME_OPTIONS,
  DEFAULT_SIZE,
  DEFAULT_FRAME,
  buildSku,
  type SizeId,
  type FrameId,
} from "../config/products";
import { getStripeLink } from "../config/stripe";
import ProductImage from "../components/ProductImage";
import CollectionBadge from "../components/ui/CollectionBadge";
import { Button } from "../components/ui/Button";
import { EASE_LUX, fadeUp, scaleIn } from "../lib/motion";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProduct(productId) : undefined;

  const [sizeId, setSizeId] = useState<SizeId>(DEFAULT_SIZE);
  const [frameId, setFrameId] = useState<FrameId>(DEFAULT_FRAME);
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  const size = useMemo(() => SIZE_OPTIONS.find((s) => s.id === sizeId)!, [sizeId]);
  const frame = useMemo(() => FRAME_OPTIONS.find((f) => f.id === frameId)!, [frameId]);

  const sku = useMemo(
    () => (product ? buildSku(product, size, frame) : ""),
    [product, size, frame]
  );

  if (!product) return <Navigate to="/" replace />;

  const framed = frameId === "black-frame";

  const flash = (msg: string) => {
    setNotice(msg);
    window.clearTimeout((flash as unknown as { t?: number }).t);
    (flash as unknown as { t?: number }).t = window.setTimeout(
      () => setNotice(null),
      3200
    );
  };

  const handleBuyNow = () => {
    const link = getStripeLink(sku);
    if (link) {
      window.location.href = link;
    } else {
      flash("Checkout opens soon — this piece isn't live for purchase yet.");
    }
  };

  const handleAddToCart = () => {
    flash(`Added · ${product.title}, ${size.label}, ${frame.label} ×${qty}`);
  };

  return (
    <main className="pt-16">
      {/* Breadcrumb */}
      <div className="container-lux pt-10">
        <nav className="flex items-center gap-2 text-xs text-ash">
          <Link to="/" className="transition-colors hover:text-chalk">
            Home
          </Link>
          <span className="text-white/20">/</span>
          <Link
            to={`/collections/${product.collection}`}
            className="transition-colors hover:text-chalk"
          >
            {product.collectionLabel}
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-chalk/80">{product.title}</span>
        </nav>
      </div>

      <div className="container-lux grid gap-12 pb-28 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Gallery */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative lg:sticky lg:top-24 lg:self-start"
        >
          <div className="relative">
            {product.collection === "premium" && (
              <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_65%)]" />
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={framed ? "framed" : "print"}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_LUX }}
              >
                <ProductImage
                  src={product.image}
                  alt={`${product.title} poster`}
                  title={product.title}
                  collection={product.collection}
                  framed={framed}
                  className="relative mx-auto max-w-md"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Purchase panel */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col">
          <div className="flex items-center gap-3">
            <CollectionBadge collection={product.collection} label={product.collectionLabel} />
            <span className="rounded-full bg-gold/10 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-ultra text-gold">
              {product.badge}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tightest text-chalk sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ash">{product.description}</p>

          {/* Size selector */}
          <Selector label="Size" className="mt-9">
            {SIZE_OPTIONS.map((s) => (
              <OptionButton
                key={s.id}
                active={s.id === sizeId}
                onClick={() => setSizeId(s.id)}
              >
                {s.label}
              </OptionButton>
            ))}
          </Selector>

          {/* Frame selector */}
          <Selector label="Frame" className="mt-7">
            {FRAME_OPTIONS.map((f) => (
              <OptionButton
                key={f.id}
                active={f.id === frameId}
                onClick={() => setFrameId(f.id)}
              >
                {f.label}
              </OptionButton>
            ))}
          </Selector>

          {/* Quantity */}
          <div className="mt-7">
            <p className="eyebrow mb-3">Quantity</p>
            <div className="inline-flex items-center rounded-full border border-white/12">
              <QtyBtn onClick={() => setQty((q) => Math.max(1, q - 1))} label="−" />
              <span className="w-12 text-center text-sm tabular-nums text-chalk">{qty}</span>
              <QtyBtn onClick={() => setQty((q) => Math.min(99, q + 1))} label="+" />
            </div>
          </div>

          {/* Details */}
          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.07] pt-8">
            {product.details.map((d) => (
              <div key={d.label}>
                <dt className="text-[0.62rem] uppercase tracking-ultra text-ash">{d.label}</dt>
                <dd className="mt-1 text-sm text-chalk/90">{d.value}</dd>
              </div>
            ))}
          </dl>

          {/* Desktop actions */}
          <div className="mt-10 hidden gap-3 sm:flex">
            <Button variant="metallic" full onClick={handleAddToCart}>
              Add To Cart
            </Button>
            <Button variant="ghost" full onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          <p className="mt-5 text-xs text-ash">
            SKU reference: <span className="text-chalk/70">{sku}</span>
          </p>
        </motion.div>
      </div>

      {/* Sticky mobile purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] glass px-4 py-3 sm:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-chalk">{product.title}</p>
            <p className="truncate text-xs text-ash">
              {size.label} · {frame.label}
            </p>
          </div>
          <Button variant="metallic" onClick={handleAddToCart} className="px-5 py-3 text-xs">
            Add
          </Button>
          <Button variant="primary" onClick={handleBuyNow} className="px-5 py-3 text-xs">
            Buy
          </Button>
        </div>
      </div>

      {/* Notice toast */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: EASE_LUX }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full glass px-6 py-3 text-sm text-chalk shadow-glass sm:bottom-8"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Selector({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="eyebrow mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ease-lux",
        active
          ? "border-chalk bg-chalk text-ink"
          : "border-white/12 text-ash hover:border-white/40 hover:text-chalk",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function QtyBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center text-lg text-ash transition-colors hover:text-chalk"
      aria-label={label === "+" ? "Increase quantity" : "Decrease quantity"}
    >
      {label}
    </button>
  );
}
