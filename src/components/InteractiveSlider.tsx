
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, Chrome, Shield } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Auto-focused input and keyboard shortcuts for instant access",
    color: "text-blue-400"
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Fully Configurable",
    description: "Set up any URL template with dynamic placeholders",
    color: "text-purple-400"
  },
  {
    icon: <Chrome className="h-8 w-8" />,
    title: "Modern Extension",
    description: "Built with Manifest V3 for security and performance",
    color: "text-green-400"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure & Clean",
    description: "Minimal permissions and lightweight design",
    color: "text-orange-400"
  }
];

export const InteractiveSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState([0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSliderChange = (value: number[]) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(value);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const currentFeature = features[currentIndex[0]];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Explore Features</h3>
            <p className="text-gray-300">Use the slider to discover what makes our extension special</p>
          </div>
          
          <div className="mb-8">
            <Slider
              value={currentIndex}
              onValueChange={handleSliderChange}
              max={features.length - 1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              {features.map((_, index) => (
                <span key={index} className={currentIndex[0] === index ? 'text-white font-bold' : ''}>
                  {index + 1}
                </span>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="text-center">
              <div className={`${currentFeature.color} mb-4 flex justify-center transform transition-transform duration-300 hover:scale-110`}>
                {currentFeature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3">{currentFeature.title}</h4>
              <p className="text-gray-300">{currentFeature.description}</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Feature {currentIndex[0] + 1} of {features.length}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
