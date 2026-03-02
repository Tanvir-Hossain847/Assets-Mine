"use client";

import { motion } from "motion/react";
import { Scale, ShieldAlert, FileText, AlertTriangle } from "lucide-react";

export default function Legal() {
  return (
    <div className="flex flex-col gap-24 pb-24 pt-12">
      {/* Header */}
      <section className="mx-auto w-11/12 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Scale className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gradient mb-6">
            Legal & Licensing Protocol
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Understanding our licensing model and how we handle assets at risk. Please read carefully before downloading or using assets from AssetsMine.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="mx-auto w-11/12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* GPL License Section */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="relative overflow-hidden rounded-3xl border bg-card/30 p-8 sm:p-10 backdrop-blur-sm"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">General Public License (GPL)</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                All items listed on AssetsMine are developed by third-party developers and redistributed under the terms of the General Public License (GPL).
              </p>
              <p>
                This means you are free to use these assets on as many projects as you like, customize them to your needs, and even modify their source code. The GPL guarantees your freedom to share and change all versions of a program, ensuring it remains free software for all its users.
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5">
                <li>Free to use for personal and commercial projects.</li>
                <li>Free to modify and adapt.</li>
                <li>No restrictive licensing keys or usage limits.</li>
              </ul>
            </div>
          </motion.div>

          {/* Assets at Risk Section */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="relative overflow-hidden rounded-3xl border bg-card/30 p-8 sm:p-10 backdrop-blur-sm"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Assets at Risk & Copyright Protocol</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                While we strive to curate high-quality assets, content on our platform is user-submitted. We adhere strictly to copyright laws and will swiftly handle any disputes regarding intellectual property.
              </p>
              <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4 my-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  What happens if an asset is at risk?
                </h3>
                <p className="text-sm">
                  If an asset is flagged for potential copyright infringement or contains malicious code (is "at risk"), it will be <strong>immediately suspended</strong> from our platform pending investigation.
                </p>
              </div>
              <p>
                If the claim is verified, the asset will be permanently removed. Users who have previously downloaded the asset are advised to cease its use. AssetsMine holds no liability for any damages or legal repercussions arising from the continued use of removed assets. 
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
