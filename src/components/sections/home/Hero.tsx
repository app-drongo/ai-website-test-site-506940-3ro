'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Zap, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  badge: 'New Release',
  title: 'Technology Made Simple',
  subtitle:
    'Clean, intuitive solutions that bridge the gap between complex technology and everyday users. Experience the power of simplicity.',
  primaryCta: 'Get Started',
  primaryCtaHref: '/start',
  secondaryCta: 'Watch Demo',
  imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
  imageAlt: 'Clean technology interface on modern devices',
  features: [
    { title: 'Intuitive Design', description: 'User-friendly interfaces that anyone can master' },
    { title: 'Secure & Reliable', description: 'Enterprise-grade security with effortless setup' },
    { title: 'Smart Automation', description: 'Intelligent features that adapt to your workflow' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrimaryCta = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <span data-editable="badge">{config.badge}</span>
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span data-editable="title">{config.title}</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  <span data-editable="subtitle">{config.subtitle}</span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCta}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group"
              >
                <span data-editable="primaryCta">{config.primaryCta}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
              >
                <Play
                  className={`mr-2 h-4 w-4 transition-transform ${isPlaying ? 'scale-110' : ''}`}
                />
                <span data-editable="secondaryCta">{config.secondaryCta}</span>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="grid gap-4 sm:grid-cols-3 pt-8">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="text-primary mt-1">
                    {idx === 0 && <Zap className="h-5 w-5" />}
                    {idx === 1 && <Shield className="h-5 w-5" />}
                    {idx === 2 && <Users className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      <span data-editable={`features[${idx}].description`}>
                        {feature.description}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative">
                <Image
                  src={config.imageUrl}
                  alt={config.imageAlt}
                  data-editable-src="imageUrl"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
