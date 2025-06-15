
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Chrome, Zap, Shield } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <Chrome className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Easy URL Opener
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A Chrome extension for lightning-fast access to any URL with customizable templates
          </p>
          <Badge variant="secondary" className="mb-8">
            Chrome Extension • Manifest V3
          </Badge>
        </div>

        {/* Demo Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-center text-lg">Try the Demo</CardTitle>
              <CardDescription className="text-center text-blue-100">
                Enter a value to see how it works (demo only)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter any value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-base"
                  autoFocus
                />
                <Button 
                  onClick={handleOpenUrl}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Configure your own URL template in the extension popup
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-300 text-sm">
                Auto-focused input and keyboard shortcuts for instant access
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Chrome className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Fully Customizable</h3>
              <p className="text-gray-300 text-sm">
                Configure any URL template with placeholder variables
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Clean</h3>
              <p className="text-gray-300 text-sm">
                Minimal permissions and lightweight design
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How to Install</CardTitle>
            <CardDescription className="text-center">
              Get the extension running in your Chrome browser
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Developer Mode</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Open Chrome and go to <code className="bg-gray-100 px-2 py-1 rounded">chrome://extensions/</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Enable "Developer mode" in the top right</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Click "Load unpacked" and select the <code className="bg-gray-100 px-2 py-1 rounded">public</code> folder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Pin the extension to your toolbar for easy access</span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Usage</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Click the extension icon to configure your URL template</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Use <code className="bg-gray-100 px-1 rounded text-xs">{'{placeholder}'}</code> in your template for dynamic values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Type values and press Enter to open URLs instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Use keyboard shortcuts for even faster access</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
