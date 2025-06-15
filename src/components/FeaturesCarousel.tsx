
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Zap, Chrome, Shield, Settings, Keyboard, ExternalLink } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Auto-focused input and keyboard shortcuts for instant access to your favorite URLs",
    badge: "Performance",
    gradient: "from-yellow-400/20 to-orange-500/20"
  },
  {
    icon: <Chrome className="h-8 w-8 text-blue-400" />,
    title: "Fully Customizable",
    description: "Configure any URL template with placeholder variables for maximum flexibility",
    badge: "Customization",
    gradient: "from-blue-400/20 to-purple-500/20"
  },
  {
    icon: <Shield className="h-8 w-8 text-green-400" />,
    title: "Secure & Clean",
    description: "Minimal permissions, lightweight design, and privacy-focused architecture",
    badge: "Security",
    gradient: "from-green-400/20 to-emerald-500/20"
  },
  {
    icon: <Settings className="h-8 w-8 text-purple-400" />,
    title: "Easy Setup",
    description: "Simple configuration through an intuitive popup interface with real-time preview",
    badge: "User Experience",
    gradient: "from-purple-400/20 to-pink-500/20"
  },
  {
    icon: <Keyboard className="h-8 w-8 text-cyan-400" />,
    title: "Keyboard Shortcuts",
    description: "Access your URLs faster with customizable keyboard shortcuts and hotkeys",
    badge: "Productivity",
    gradient: "from-cyan-400/20 to-blue-500/20"
  },
  {
    icon: <ExternalLink className="h-8 w-8 text-indigo-400" />,
    title: "Smart Templates",
    description: "Create intelligent URL patterns that adapt to your workflow and use cases",
    badge: "Intelligence",
    gradient: "from-indigo-400/20 to-purple-500/20"
  }
];

const FeaturesCarousel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Everything you need for lightning-fast URL access, beautifully designed and thoughtfully crafted
        </p>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {features.map((feature, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm`}>
                    {feature.icon}
                  </div>
                  
                  <Badge variant="secondary" className="mb-3 mx-auto">
                    {feature.badge}
                  </Badge>
                  
                  <h3 className="font-bold text-xl text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
      </Carousel>
    </div>
  );
};

export default FeaturesCarousel;
