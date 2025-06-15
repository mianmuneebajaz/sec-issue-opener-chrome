import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Chrome,
  Zap,
  Shield,
  Settings,
  Github,
  ArrowRight,
  Sparkles,
  Code,
  Key,
} from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Index = () => {
  const [issueNumber, setIssueNumber] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenIssue = () => {
    const trimmedNumber = issueNumber.trim();
    if (trimmedNumber) {
      const url = `https://shuttlehealth.atlassian.net/browse/SEC-${trimmedNumber}`;
      window.open(url, "_blank");
      setIssueNumber("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOpenIssue();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/40 border-b border-white/5 rounded-full py-2 sm:py-3 px-4 sm:px-6 mb-8 sm:mb-16 ${
            scrollY > 50 ? "shadow-2xl shadow-purple-900/20" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <img
                  src="/icon-only.png"
                  alt="Easy URL Opener"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
              </motion.div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Easy URL Opener
              </span>
            </div>
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white text-xs sm:text-sm"
                  onClick={() =>
                    window.open(
                      "https://github.com/mianmuneebajaz/sec-issue-opener-chrome",
                      "_blank"
                    )
                  }
                >
                  <Github className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">GitHub</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-10 sm:mb-16 px-2 sm:px-0"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4 sm:mb-6"
          >
            <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1 sm:p-1.5 shadow-xl shadow-purple-900/30">
              <div className="bg-slate-900 rounded-xl p-1.5 sm:p-2">
                <img
                  src="/icon-only.png"
                  alt="Easy URL Opener"
                  className="h-14 w-14 sm:h-20 sm:w-20"
                />
              </div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2"
          >
            Easy URL Opener
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4 max-w-2xl mx-auto px-4"
          >
            A configurable Chrome extension for lightning-fast access to any URL
            with dynamic parameters
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Perfect for JIRA issues, GitHub repos, support tickets, or any URL
            pattern you use frequently
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2"
          >
            <motion.div variants={itemFadeIn}>
              <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-xs sm:text-sm">
                Chrome Extension
              </Badge>
            </motion.div>
            <motion.div variants={itemFadeIn}>
              <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs sm:text-sm">
                Manifest V3
              </Badge>
            </motion.div>
            <motion.div variants={itemFadeIn}>
              <Badge className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 text-xs sm:text-sm">
                Configurable
              </Badge>
            </motion.div>
            <motion.div variants={itemFadeIn}>
              <Badge className="bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 text-xs sm:text-sm">
                Keyboard Shortcuts
              </Badge>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-6"
        >
          <Card className="bg-white/5 backdrop-blur-md shadow-2xl border-white/10 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white rounded-t-lg border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-center text-base sm:text-lg">
                Try the Demo (SEC Issues)
              </CardTitle>
              <CardDescription className="text-center text-blue-100 text-xs sm:text-sm">
                This is just one example - you can configure any URL pattern
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter issue number (e.g., 1332)"
                  value={issueNumber}
                  onChange={(e) => setIssueNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-sm sm:text-base bg-white/10 border-white/10 text-white placeholder:text-gray-400"
                  autoFocus
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    onClick={handleOpenIssue}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 sm:px-6 w-full sm:w-auto"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </motion.div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-3 text-center">
                Example: Enter "1332" to open SEC-1332 • Configure your own URL
                templates in the extension
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-6"
        >
          <motion.div
            variants={itemFadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white h-full">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="bg-blue-500/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Lightning Fast
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Auto-focused input and keyboard shortcuts for instant access
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemFadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white h-full">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="bg-purple-500/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Fully Configurable
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Set up any URL template with dynamic placeholders
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemFadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white h-full">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="bg-indigo-500/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Chrome className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Modern Extension
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Built with Manifest V3 for security and performance
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemFadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white h-full">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="bg-pink-500/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Secure & Clean
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Minimal permissions and lightweight design
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 sm:mb-16 px-4 sm:px-6"
        >
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs sm:text-sm mb-2 sm:mb-3"
            >
              <Sparkles className="mr-1 h-3 w-3 text-blue-400" />
              Use Cases
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Perfect For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              variants={itemFadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white h-full">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg flex items-center">
                    <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400" />
                    Development Teams
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                      JIRA issues (SEC-1234, PROJ-567)
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                      GitHub repositories and PRs
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                      Jenkins builds and deployments
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                      Confluence pages
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              variants={itemFadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white h-full">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg flex items-center">
                    <Key className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-400" />
                    Support & Operations
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
                      Support ticket systems
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
                      Customer accounts and profiles
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
                      Monitoring dashboards
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
                      Internal tools and admin panels
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Installation Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 sm:mb-16 px-4 sm:px-6"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-xl overflow-hidden">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-5">
              <CardTitle className="text-center text-xl sm:text-2xl text-white">
                How to Install & Configure
              </CardTitle>
              <CardDescription className="text-center text-gray-300 text-xs sm:text-sm">
                Get the extension running with your custom URL templates
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-base sm:text-lg text-white">
                    Installation
                  </h4>
                  <ol className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        1
                      </span>
                      <span className="text-gray-300">
                        Open Chrome and go to{" "}
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs sm:text-sm text-gray-200">
                          chrome://extensions/
                        </code>
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        2
                      </span>
                      <span className="text-gray-300">
                        Enable "Developer mode" in the top right
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        3
                      </span>
                      <span className="text-gray-300">
                        Click "Load unpacked" and select the{" "}
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs sm:text-sm text-gray-200">
                          public
                        </code>{" "}
                        folder
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        4
                      </span>
                      <span className="text-gray-300">
                        Pin the extension to your toolbar
                      </span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-base sm:text-lg text-white">
                    Configuration
                  </h4>
                  <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        1
                      </span>
                      <span className="text-gray-300">
                        Click the extension icon to open the popup
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        2
                      </span>
                      <span className="text-gray-300">
                        Set your URL template (e.g.,{" "}
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-gray-200">
                          https://example.com/issue/{`{placeholder}`}
                        </code>
                        )
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        3
                      </span>
                      <span className="text-gray-300">
                        Customize the extension title and save
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        4
                      </span>
                      <span className="text-gray-300">
                        Set up keyboard shortcuts in Chrome extensions settings
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/5 rounded-lg">
                <h5 className="font-semibold mb-2 text-sm sm:text-base text-white">
                  Example URL Templates:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <code className="block bg-white/10 p-2 rounded border border-white/10 text-xs text-gray-200">
                      https://mycompany.atlassian.net/browse/SEC-
                      {`{placeholder}`}
                    </code>
                    <span className="text-blue-300 text-xs">
                      For JIRA issues
                    </span>
                  </div>
                  <div>
                    <code className="block bg-white/10 p-2 rounded border border-white/10 text-xs text-gray-200">
                      https://github.com/myorg/{`{placeholder}`}
                    </code>
                    <span className="text-purple-300 text-xs">
                      For GitHub repos
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* GitHub Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 px-4 sm:px-6"
        >
          <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-white/10 text-white">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Github className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                Open Source
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                This extension is open source and available on GitHub. Feel free
                to contribute, report issues, or fork it for your own needs.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() =>
                    window.open(
                      "https://github.com/mianmuneebajaz/sec-issue-opener-chrome",
                      "_blank"
                    )
                  }
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-xs sm:text-sm mt-8 sm:mt-16 pb-6 sm:pb-8 px-4">
          <div className="flex justify-center items-center gap-2 mb-3 sm:mb-4">
            <div className="h-1 w-1 rounded-full bg-blue-400"></div>
            <div className="h-1 w-1 rounded-full bg-purple-400"></div>
            <div className="h-1 w-1 rounded-full bg-pink-400"></div>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Easy URL Opener | Made with ❤️ for
            developers
          </p>
          <p className="mt-2">
            Made with love by{" "}
            <a
              href="https://github.com/mianmuneebajaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Muneeb Ajaz
            </a>
            {" • "}
            <a
              href="https://github.com/mianmuneebajaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github className="inline h-3.5 w-3.5" />
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/muneebajaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="inline h-3.5 w-3.5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 00.1.24V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
