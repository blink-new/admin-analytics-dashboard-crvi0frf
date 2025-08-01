import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ExternalLink,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Documentation', href: '#', icon: ExternalLink },
    { name: 'API Reference', href: '#', icon: ExternalLink },
    { name: 'Support', href: '#', icon: Mail },
    { name: 'Status', href: '#', icon: Globe },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Admin Pro</h3>
                <p className="text-xs text-muted-foreground">Premium Dashboard</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span>Fast & Secure</span>
              <Separator orientation="vertical" className="h-3" />
              <Shield className="h-3 w-3 text-green-500" />
              <span>Enterprise Ready</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.name}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-8 text-xs"
                    asChild
                  >
                    <a href={link.href} className="flex items-center gap-2">
                      <Icon className="h-3 w-3" />
                      {link.name}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    asChild
                  >
                    <a href={social.href} title={social.name}>
                      <Icon className="h-3 w-3" />
                    </a>
                  </Button>
                );
              })}
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Need help? Contact our support team
              </p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Mail className="h-3 w-3 mr-1" />
                support@adminpro.com
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>© {currentYear} Admin Pro. Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>for developers worldwide.</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <Separator orientation="vertical" className="h-3" />
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <Separator orientation="vertical" className="h-3" />
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}