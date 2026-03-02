"use client";

import { motion } from "motion/react";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Contact() {
  return (
    <div className="flex flex-col gap-24 pb-24 pt-12">
      {/* Header */}
      <section className="mx-auto w-11/12 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gradient mb-6">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Have questions about our premium assets? Need help with an order? Our support team is here to assist you.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto w-11/12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="rounded-3xl border bg-card/30 p-8 sm:p-10 backdrop-blur-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="John" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Doe" className="bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Message
                </label>
                <textarea 
                  id="message" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-semibold">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="space-y-8 lg:pl-8"
          >
             <div className="group relative overflow-hidden rounded-3xl border bg-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                   <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Email Support</h3>
                <p className="mt-2 text-muted-foreground">Our team responds within 24 hours.</p>
                <p className="mt-4 font-medium text-foreground">support@assetsmine.com</p>
             </div>
             
             <div className="group relative overflow-hidden rounded-3xl border bg-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                   <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Live Chat</h3>
                <p className="mt-2 text-muted-foreground">Chat with a helpful human right now.</p>
                <p className="mt-4 font-medium text-foreground">Available 9am - 5pm EST</p>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
