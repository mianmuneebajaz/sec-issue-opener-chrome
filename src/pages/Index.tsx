
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Chrome, Github, Download, Star } from "lucide-react";
import ThreeHero from "@/components/ThreeHero";
import FeaturesCarousel from "@/components/FeaturesCarousel";

const Index = () => {
  const [inputValue, setInputValue] = useState('');

  const handleOpenUrl = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      // Demo URL - this would be replaced by the actual configured template in the extension
      const url = `https://example.com/item/${trimmedValue}`;
      window.open(url, '_blank');
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleOpenUrl();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with 3D Background */}
        <div className="relative text-center mb-16">
          <ThreeHero />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl mb-6 backdrop-blur-sm">
              <Chrome className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Easy URL Opener
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              A Chrome extension for lightning-fast access to any URL with customizable templates
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Chrome className="h-4 w-4 mr-2" />
                Chrome Extension
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                Manifest V3
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Open Source
              </Badge>
            </div>

            {/* GitHub and Download buttons */}
            <div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
              <Button 
                onClick={() => window.open('https://github.com/yourusername/easy-url-opener', '_blank')}
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                size="lg"
              >
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Install Extension
              </Button>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-center text-xl">Try the Demo</CardTitle>
              <CardDescription className="text-center text-blue-100">
                Enter a value to see how it works (demo only)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter any value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-lg h-12 border-2 focus:border-blue-500"
                  autoFocus
                />
                <Button 
                  onClick={handleOpenUrl}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 h-12"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Open
                </Button>
              </div>
              <p className="text-gray-600 mt-4 text-center">
                Configure your own URL template in the extension popup
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Carousel */}
        <div className="mb-20">
          <FeaturesCarousel />
        </div>

        {/* Installation Instructions */}
        <Card className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">How to Install</CardTitle>
            <CardDescription className="text-lg">
              Get the extension running in your Chrome browser in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="font-bold mb-6 text-xl text-blue-600">Developer Mode Installation</h4>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm font-bold">1</span>
                    <span className="text-gray-700">Open Chrome and go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">chrome://extensions/</code></span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm font-bold">2</span>
                    <span className="text-gray-700">Enable "Developer mode" toggle in the top right corner</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm font-bold">3</span>
                    <span className="text-gray-700">Click "Load unpacked" and select the <code className="bg-gray-100 px-2 py-1 rounded text-sm">public</code> folder</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm font-bold">4</span>
                    <span className="text-gray-700">Pin the extension to your toolbar for easy access</span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-xl text-purple-600">Usage & Features</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <ExternalLink className="h-6 w-6 mt-1 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700">Click the extension icon to configure your URL template</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <ExternalLink className="h-6 w-6 mt-1 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700">Use <code className="bg-gray-100 px-2 py-1 rounded text-sm">{'{placeholder}'}</code> in your template for dynamic values</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <ExternalLink className="h-6 w-6 mt-1 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700">Type values and press Enter to open URLs instantly</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <ExternalLink className="h-6 w-6 mt-1 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700">Use keyboard shortcuts for even faster access</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="flex justify-center items-center gap-6 text-gray-400">
            <Button
              variant="ghost"
              onClick={() => window.open('https://github.com/yourusername/easy-url-opener', '_blank')}
              className="text-gray-400 hover:text-white"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub Repository
            </Button>
            <span>•</span>
            <span>Made with ❤️ for productivity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
