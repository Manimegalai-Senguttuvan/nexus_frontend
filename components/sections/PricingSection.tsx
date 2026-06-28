"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Zap, Crown, Rocket, Sparkles } from 'lucide-react';
import TextReveal from '../effects/TextReveal';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    icon: Zap,
    features: ['5 AI chats/day', 'Basic content writing', 'Image generation (10/mo)', 'Community support'],
    color: 'from-slate-600 to-slate-700',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    icon: Crown,
    features: ['Unlimited AI chats', 'Advanced content writing', 'Image generation (100/mo)', 'Code generation', 'Priority support', 'API access'],
    color: 'from-purple-600 to-cyan-600',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    icon: Rocket,
    features: ['Everything in Pro', 'Custom AI training', 'Unlimited images', 'Team collaboration', 'SSO & SAML', 'Dedicated support', 'Custom integrations'],
    color: 'from-pink-600 to-purple-600',
    popular: false,
  },
];

export default function PricingSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="pricing" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">Pricing</span>
          </motion.div>

          <TextReveal
            text="Simple Pricing"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            delay={0.1}
          />
          <motion.p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Start free, scale as you grow. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl overflow-hidden ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              initial={{ opacity: 0, y: 60, rotateY: plan.popular ? 0 : i === 0 ? 15 : -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -15, scale: 1.02, rotateY: 0 }}
              style={{ perspective: 1000 }}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 100%' }}
                />
              )}
              <div className={`glass p-8 h-full border ${plan.popular ? 'border-purple-500/30' : 'border-white/10'} hover:border-purple-500/20 transition-all duration-500`}>
                {plan.popular && (
                  <motion.div 
                    className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-medium mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <plan.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fi) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center gap-3 text-sm text-slate-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 + fi * 0.05 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      </motion.div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]'
                      : 'glass text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.price === 'Free' ? 'Get Started' : 'Subscribe Now'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
