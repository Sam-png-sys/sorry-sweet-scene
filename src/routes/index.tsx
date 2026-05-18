import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HeartScene from "@/components/HeartScene";

export const Route = createFileRoute("/")({
  component: SorryPage,
  head: () => ({
    meta: [
      { title: "I'm Sorry, My Love 💗" },
      { name: "description", content: "A heartfelt apology, crafted just for you." },
    ],
  }),
});

const reasons = [
  { emoji: "🌹", title: "You deserve better", text: "Every day with you reminds me how lucky I am, and I let you down." },
  { emoji: "💌", title: "I hear you", text: "Your feelings matter more than my pride. I should have listened sooner." },
  { emoji: "✨", title: "I'll do better", text: "Not just words — actions. Starting now, starting always." },
];

function FloatingHeart({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute text-3xl pointer-events-none select-none"
      style={{ left: x, bottom: "-40px" }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -800, opacity: [0, 1, 1, 0], rotate: [0, 20, -20, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeOut" }}
    >
      💗
    </motion.div>
  );
}

function SorryPage() {
  const [forgiven, setForgiven] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const dodgeNo = () => {
    setNoPos({
      x: Math.random() * 400 - 200,
      y: Math.random() * 200 - 100,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-romance)" }}>
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.7} x={`${(i * 8.3) % 100}%`} />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40" style={{ background: "var(--rose-glow)" }} />
      <div className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30" style={{ background: "var(--rose)" }} />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.p
              className="text-sm uppercase tracking-[0.4em] text-primary mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              A letter to you
            </motion.p>
            <h1 className="text-7xl md:text-8xl font-serif italic leading-[0.95] text-foreground mb-6">
              I'm{" "}
              <span className="relative inline-block">
                <span style={{ background: "var(--gradient-heart)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  sorry
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ background: "var(--gradient-heart)" }}
                  initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 1.2 }}
                />
              </span>
              ,<br />Apurva.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
              I know words on a screen can't undo what hurt — but I built this so you'd know I've been thinking about nothing else.
            </p>

            <div className="flex flex-wrap gap-4 relative h-16">
              <motion.button
                onClick={() => setForgiven(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-primary-foreground font-medium shadow-lg"
                style={{ background: "var(--gradient-heart)", boxShadow: "var(--shadow-soft)" }}
              >
                I forgive you 💗
              </motion.button>

              <motion.button
                onMouseEnter={dodgeNo}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 200 }}
                className="px-8 py-4 rounded-full border border-border bg-card/60 backdrop-blur text-foreground font-medium"
              >
                Not yet
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Heart */}
          <motion.div
            className="h-[500px] lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <HeartScene />
          </motion.div>
        </section>

        {/* Reasons cards */}
        <section className="mt-12 mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif italic text-center mb-12 text-foreground"
          >
            What I want you to know
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-3xl bg-card/70 backdrop-blur-md border border-border"
                style={{ boxShadow: "var(--shadow-soft)", transformStyle: "preserve-3d" }}
              >
                <div className="text-5xl mb-4">{r.emoji}</div>
                <h3 className="text-xl font-serif italic text-foreground mb-3">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Love note */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center pb-20"
        >
          <div className="p-10 rounded-3xl bg-card/60 backdrop-blur-md border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-foreground">
              "In a sea of people, my eyes will always search for you."
            </p>
            <p className="mt-6 text-primary tracking-widest text-sm">— YOURS, ALWAYS</p>
          </div>
        </motion.section>
      </div>

      {/* Forgiven overlay */}
      <AnimatePresence>
        {forgiven && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
            style={{ background: "oklch(0.55 0.25 10 / 0.4)" }}
            onClick={() => setForgiven(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="text-center p-12 rounded-3xl bg-card max-w-md mx-4"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                💗
              </motion.div>
              <h3 className="text-3xl font-serif italic text-foreground mb-3">Thank you</h3>
              <p className="text-muted-foreground">You have the kindest heart. I promise to deserve it.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
