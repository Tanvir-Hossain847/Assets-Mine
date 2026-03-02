"use client";

import { motion } from "motion/react";
import { CheckCircle2, Shield, Zap, Users } from "lucide-react";

const stats = [
  { name: 'Active Users', value: '50k+', icon: Users },
  { name: 'Digital Assets', value: '10k+', icon: Zap },
  { name: 'Secure Transactions', value: '100%', icon: Shield },
  { name: 'Satisfaction Rate', value: '99%', icon: CheckCircle2 },
];

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-24 pt-12">
      {/* Hero Section */}
      <section className="mx-auto w-11/12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gradient mb-6">
            About AssetsMine
          </h1>
          <p className="mt-4 text-xl text-muted-foreground mx-auto max-w-2xl leading-relaxed">
            We are building the world's most comprehensive and accessible marketplace for premium digital assets, empowering creators to build incredible things faster.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto w-11/12 gap-12 grid grid-cols-1 lg:grid-cols-2 lg:items-center">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AssetsMine began with a simple idea: design and development should not be bottlenecked by a lack of quality resources. We focus on curating top-tier UI kits, 3D models, frameworks, and templates so that developers and designers can focus on what they do best: creating.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every day, we strive to bridge the gap between imagination and execution by providing a platform where world-class assets are just a click away.
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="grid grid-cols-2 gap-4 sm:gap-6"
        >
           {stats.map((stat, idx) => (
             <div key={idx} className="group relative overflow-hidden rounded-3xl border bg-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card">
               <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                 <stat.icon className="h-5 w-5" />
               </div>
               <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
               <p className="text-2xl font-bold tracking-tight mt-1">{stat.value}</p>
             </div>
           ))}
        </motion.div>
      </section>
    </div>
  );
}
