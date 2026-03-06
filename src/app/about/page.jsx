"use client";

import { CheckCircle2, Shield, Zap, Users, Scale, FileText, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import InteractiveHero from "@/components/features/about/InteractiveHero";

const stats = [
  { name: 'Active Users', value: '50k+', icon: Users },
  { name: 'Digital Assets', value: '10k+', icon: Zap },
  { name: 'Secure Transactions', value: '100%', icon: Shield },
  { name: 'Satisfaction Rate', value: '99%', icon: CheckCircle2 },
];

const gplRights = [
  {
    title: "Freedom to Use",
    description: "You can use the software for any purpose, whether personal, educational, or commercial, without restrictions."
  },
  {
    title: "Freedom to Study",
    description: "You have access to the source code and can study how the program works and adapt it to your needs."
  },
  {
    title: "Freedom to Share",
    description: "You can redistribute copies of the original software to help others benefit from it."
  },
  {
    title: "Freedom to Modify",
    description: "You can modify the software and distribute your modified versions, ensuring improvements benefit the community."
  }
];

const faqs = [
  {
    question: "What is GPL and how does it affect me?",
    answer: "GPL (General Public License) is a free software license that guarantees end users the freedom to run, study, share, and modify the software. All assets on AssetsMine are distributed under GPL, meaning you can use them freely in your projects, modify them, and even redistribute them."
  },
  {
    question: "Can I use GPL assets in commercial projects?",
    answer: "Yes! GPL allows commercial use. You can use any asset from AssetsMine in your commercial projects without additional licensing fees. However, if you distribute the modified asset, you must also make it available under GPL."
  },
  {
    question: "Do I need to credit the original creator?",
    answer: "While GPL doesn't strictly require attribution, we encourage giving credit to original creators as a courtesy. It helps support the community and acknowledges their hard work."
  },
  {
    question: "What happens if an asset is removed?",
    answer: "If an asset is flagged for copyright infringement and removed, users who downloaded it should cease using it. AssetsMine is not liable for any issues arising from continued use of removed assets."
  },
  {
    question: "Can I sell modified versions of GPL assets?",
    answer: "Yes, you can sell modified versions, but you must also distribute them under GPL and provide access to the source code. The GPL ensures that freedom is preserved throughout the distribution chain."
  },
  {
    question: "How do you ensure asset quality?",
    answer: "We have a review process for all submitted assets. Our team checks for code quality, security issues, and compliance with GPL licensing before assets are published on the marketplace."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and various digital payment methods. All transactions are secured with industry-standard encryption."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the digital nature of our products, we generally don't offer refunds. However, if you experience technical issues or the asset doesn't match its description, please contact our support team."
  }
];

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Interactive Hero Section */}
      <InteractiveHero />

      {/* Mission & Vision */}
      <section className="mx-auto w-11/12 gap-12 grid grid-cols-1 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AssetsMine began with a simple idea: design and development should not be bottlenecked by a lack of quality resources. We focus on curating top-tier UI kits, 3D models, frameworks, and templates so that developers and designers can focus on what they do best: creating.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every day, we strive to bridge the gap between imagination and execution by providing a platform where world-class assets are just a click away.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
           {stats.map((stat, idx) => (
             <div key={idx} className="group relative overflow-hidden rounded-3xl border bg-card/30 p-6 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:bg-card">
               <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
                 <stat.icon className="h-5 w-5" />
               </div>
               <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
               <p className="text-2xl font-bold tracking-tight mt-1">{stat.value}</p>
             </div>
           ))}
        </div>
      </section>

      {/* GPL Legal Rights Section */}
      <section className="mx-auto w-11/12">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Scale className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Your Rights Under GPL</h2>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl mx-auto">
            All assets on AssetsMine are distributed under the General Public License (GPL), guaranteeing you four essential freedoms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {gplRights.map((right, idx) => (
            <Card key={idx} className="border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{right.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {right.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Important Note</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The GPL is designed to ensure that software remains free and open. When you receive GPL software, you receive these rights, and you must preserve these rights when you distribute the software to others. This creates a community where everyone benefits from shared improvements and innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto w-11/12">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted-foreground text-lg">
            Everything you need to know about AssetsMine and GPL licensing
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {faqs.map((faq, idx) => (
            <Card 
              key={idx} 
              className="border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:bg-card group"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-11">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 inline-block">
            <p className="text-lg font-semibold mb-2">
              Still have questions?
            </p>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you with any inquiries
            </p>
            <a href="/contact">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-95">
                Contact Support
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
