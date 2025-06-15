import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Chrome, Zap, Shield, Settings, Github } from "lucide-react";
import { ThreeHero } from "@/components/ThreeHero";
import { InteractiveSlider } from "@/components/InteractiveSlider";
import { AnimatedStats } from "@/components/AnimatedStats";

const Index = () => {
  const [issueNumber, setIssueNumber] = useState('');

  const handleOpenIssue = () => {
    const trimmedNumber = issueNumber.trim();
    if (trimmedNumber) {
      const url = `https://shuttlehealth.atlassian.net/browse/SEC-${trimmedNumber}`;
      window.open(url, '_blank');
      setIssueNumber('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleOpenIssue();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        {/* 3D Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <ThreeHero />
            <div className="mt-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
                Easy URL Opener
              </h1>
              <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto animate-fade-in">
                A configurable Chrome extension for lightning-fast access to any URL with dynamic parameters
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in">
                Perfect for JIRA issues, GitHub repos, support tickets, or any URL pattern you use frequently
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
                <Badge variant="secondary" className="animate-pulse">Chrome Extension</Badge>
                <Badge variant="secondary" className="animate-pulse">Manifest V3</Badge>
                <Badge variant="secondary" className="animate-pulse">Configurable</Badge>
                <Badge variant="secondary" className="animate-pulse">Keyboard Shortcuts</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="max-w-2xl mx-auto mb-16 animate-scale-in">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-center text-lg">Try the Demo (SEC Issues)</CardTitle>
              <CardDescription className="text-center text-blue-100">
                This is just one example - you can configure any URL pattern
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter issue number (e.g., 1332)"
                  value={issueNumber}
                  onChange={(e) => setIssueNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-base transition-all duration-200 focus:scale-105"
                  autoFocus
                />
                <Button 
                  onClick={handleOpenIssue}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 transform transition-all duration-200 hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Example: Enter "1332" to open SEC-1332 • Configure your own URL templates in the extension
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Features Slider */}
        <div className="mb-16">
          <InteractiveSlider />
        </div>

        {/* Animated Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Extension Impact</h2>
          <AnimatedStats />
        </div>

        {/* Use Cases Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-lg">Development Teams</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• JIRA issues (SEC-1234, PROJ-567)</li>
                  <li>• GitHub repositories and PRs</li>
                  <li>• Jenkins builds and deployments</li>
                  <li>• Confluence pages</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-lg">Support & Operations</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Support ticket systems</li>
                  <li>• Customer accounts and profiles</li>
                  <li>• Monitoring dashboards</li>
                  <li>• Internal tools and admin panels</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Installation Instructions */}
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-12 transform transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How to Install & Configure</CardTitle>
            <CardDescription className="text-center">
              Get the extension running with your custom URL templates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Installation</h4>
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
                    <span>Pin the extension to your toolbar</span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Configuration</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Settings className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Click the extension icon to open the popup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Set your URL template (e.g., <code className="bg-gray-100 px-1 rounded text-xs">https://example.com/issue/{`{placeholder}`}</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Customize the extension title and save</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Set up keyboard shortcuts in Chrome extensions settings</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold mb-2 text-blue-900">Example URL Templates:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <code className="block bg-white p-2 rounded border text-xs">
                    https://mycompany.atlassian.net/browse/SEC-{`{placeholder}`}
                  </code>
                  <span className="text-blue-700 text-xs">For JIRA issues</span>
                </div>
                <div>
                  <code className="block bg-white p-2 rounded border text-xs">
                    https://github.com/myorg/{`{placeholder}`}
                  </code>
                  <span className="text-blue-700 text-xs">For GitHub repos</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GitHub Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
            <CardContent className="p-8">
              <div className="bg-gray-500/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:rotate-12">
                <Github className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Open Source</h3>
              <p className="text-gray-300 mb-6">
                This extension is open source and available on GitHub. Feel free to contribute, report issues, or fork it for your own needs.
              </p>
              <Button 
                onClick={() => window.open('https://github.com/your-username/easy-url-opener', '_blank')}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transform transition-all duration-200 hover:scale-105"
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
