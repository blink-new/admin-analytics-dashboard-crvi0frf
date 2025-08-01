import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  Target,
  Activity
} from 'lucide-react';
import { kpiData } from '@/data/mockData';
import { useState, useEffect } from 'react';

const KPISkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-2 w-full" />
      </div>
    </CardContent>
  </Card>
);

export default function KPICards() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <KPISkeleton key={i} />
        ))}
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(kpiData.revenue.current),
      change: kpiData.revenue.change,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      target: kpiData.revenue.target,
      current: kpiData.revenue.current,
      description: "vs last month"
    },
    {
      title: "Active Users",
      value: formatNumber(kpiData.users.current),
      change: kpiData.users.change,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      target: kpiData.users.target,
      current: kpiData.users.current,
      description: "registered users"
    },
    {
      title: "Total Orders",
      value: formatNumber(kpiData.orders.current),
      change: kpiData.orders.change,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      target: kpiData.orders.target,
      current: kpiData.orders.current,
      description: "this month"
    },
    {
      title: "Conversion Rate",
      value: `${kpiData.conversion.current}%`,
      change: kpiData.conversion.change,
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      target: kpiData.conversion.target,
      current: kpiData.conversion.current,
      description: "avg conversion"
    }
  ];

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        const progress = calculateProgress(card.current, card.target);
        
        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <div className={`p-2 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">
                      {card.value}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getChangeColor(card.change)} border-current`}
                    >
                      <div className="flex items-center gap-1">
                        {getChangeIcon(card.change)}
                        {Math.abs(card.change).toFixed(1)}%
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{card.description}</span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {progress.toFixed(0)}% of target
                      </span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}