import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Lightbulb,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  ShoppingCart
} from 'lucide-react';
import { aiInsights } from '@/data/mockData';
import { useState, useEffect } from 'react';

const InsightSkeleton = () => (
  <div className="space-y-3 p-4 border rounded-lg">
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-1/3" />
    </div>
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-2/3" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

export default function AIInsightsPanel() {
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'opportunity': return <Target className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-3 w-3 text-green-600" /> : 
      <TrendingDown className="h-3 w-3 text-red-600" />;
  };

  if (loading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <InsightSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <motion.div
                animate={{ rotate: refreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
              >
                <Brain className="h-5 w-5 text-purple-600" />
              </motion.div>
              AI Insights
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-xs"
            >
              {refreshing ? 'Analyzing...' : 'Refresh'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered predictions and recommendations
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <AnimatePresence>
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedInsight === insight.id 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedInsight(
                  selectedInsight === insight.id ? null : insight.id
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="p-1.5 rounded-full bg-purple-100">
                      {getInsightIcon(insight.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {insight.title}
                      </h4>
                      {getTrendIcon(insight.trend)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {insight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getImpactColor(insight.impact)}`}
                        >
                          {insight.impact} impact
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                        selectedInsight === insight.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                    
                    <AnimatePresence>
                      {selectedInsight === insight.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pt-3 border-t border-gray-200"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-medium">Recommended Action:</span>
                            </div>
                            <p className="text-xs text-muted-foreground pl-5">
                              {insight.action}
                            </p>
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="outline" className="text-xs h-7">
                                View Details
                              </Button>
                              <Button size="sm" className="text-xs h-7">
                                Take Action
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <BarChart3 className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium">Accuracy</span>
                </div>
                <p className="text-lg font-bold text-blue-600">94%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Users className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium">Insights</span>
                </div>
                <p className="text-lg font-bold text-green-600">{aiInsights.length}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <ShoppingCart className="h-3 w-3 text-purple-600" />
                  <span className="text-xs font-medium">Actions</span>
                </div>
                <p className="text-lg font-bold text-purple-600">12</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}