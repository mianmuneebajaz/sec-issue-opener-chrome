
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  duration: number;
}

const stats: StatItem[] = [
  { label: "URLs Opened", value: 10000, suffix: "+", duration: 2000 },
  { label: "Time Saved", value: 50, suffix: " hrs", duration: 2500 },
  { label: "Happy Users", value: 500, suffix: "+", duration: 3000 },
  { label: "Configurations", value: 100, suffix: "+", duration: 1500 }
];

interface CountUpProps {
  end: number;
  duration: number;
  suffix: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const AnimatedStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-6 text-center">
            <div className={`text-3xl font-bold mb-2 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: `${index * 200}ms` }}>
              {isVisible ? (
                <CountUp end={stat.value} duration={stat.duration} suffix={stat.suffix} />
              ) : (
                "0"
              )}
            </div>
            <div className={`text-sm text-gray-300 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: `${index * 200 + 100}ms` }}>
              {stat.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
