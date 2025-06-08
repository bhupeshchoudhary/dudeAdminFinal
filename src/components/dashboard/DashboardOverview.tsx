// components/dashboard/DashboardOverview.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Target,
  Activity
} from 'lucide-react'

interface StatCard {
  title: string
  value: string | number
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  description: string
  color: string
}

interface RecentActivity {
  id: string
  type: 'order' | 'user' | 'product' | 'review'
  description: string
  time: string
  status: 'success' | 'warning' | 'error' | 'info'
}

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const stats: StatCard[] = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      changeType: "increase",
      icon: <DollarSign className="w-5 h-5" />,
      description: "from last month",
      color: "text-green-600"
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+180",
      changeType: "increase",
      icon: <ShoppingCart className="w-5 h-5" />,
      description: "this month",
      color: "text-blue-600"
    },
    {
      title: "Total Users",
      value: "1,429",
      change: "+19%",
      changeType: "increase",
      icon: <Users className="w-5 h-5" />,
      description: "active users",
      color: "text-purple-600"
    },
    {
      title: "Total Products",
      value: "156",
      change: "+5",
      changeType: "increase",
      icon: <Package className="w-5 h-5" />,
      description: "in inventory",
      color: "text-orange-600"
    }
  ]

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "order",
      description: "New order #ORD-001 received from John Doe",
      time: "2 minutes ago",
      status: "success"
    },
    {
      id: "2",
      type: "user",
      description: "New user registration: jane@example.com",
      time: "5 minutes ago",
      status: "info"
    },
    {
      id: "3",
      type: "product",
      description: "Product 'Chocolate Cake' is running low on stock",
      time: "10 minutes ago",
      status: "warning"
    },
    {
      id: "4",
      type: "order",
      description: "Order #ORD-002 has been completed and shipped",
      time: "15 minutes ago",
      status: "success"
    },
    {
      id: "5",
      type: "review",
      description: "New 5-star review received for 'Vanilla Cupcake'",
      time: "20 minutes ago",
      status: "success"
    }
  ]

  const topProducts = [
    { name: "Chocolate Cake", sales: 234, revenue: "$2,340", trend: "up" },
    { name: "Vanilla Cupcake", sales: 189, revenue: "$1,890", trend: "up" },
    { name: "Red Velvet", sales: 156, revenue: "$1,560", trend: "down" },
    { name: "Strawberry Pie", sales: 98, revenue: "$980", trend: "up" }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4" />
      case 'user': return <Users className="w-4 h-4" />
      case 'product': return <Package className="w-4 h-4" />
      case 'review': return <Eye className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      case 'error': return 'text-red-600 bg-red-50'
      case 'info': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
            <p className="text-blue-100">Here's what's happening with your store today.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Calendar className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates from your store</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-1.5 rounded-full ${getStatusColor(activity.status)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{product.revenue}</p>
                  <div className="flex items-center text-xs">
                    {product.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-600 mr-1" />
                    )}
                    <span className={product.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {product.trend === 'up' ? '+' : '-'}5%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
                {/* Quick Actions */}
                <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View All Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Process Orders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Marketing Tools
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Server and application health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Uptime</span>
                <span className="text-green-600">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Health</span>
                <span className="text-green-600">Excellent</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Response</span>
                <span className="text-yellow-600">Good</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                All systems operational
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>This week's performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Daily Target</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  $1,200
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Today's Sales</span>
                  <span className="font-medium">$980</span>
                </div>
                <Progress value={82} className="h-2" />
                <p className="text-xs text-gray-500">82% of daily target</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">15</p>
                  <p className="text-xs text-gray-500">Orders Today</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">8</p>
                  <p className="text-xs text-gray-500">New Customers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alerts & Notifications
          </CardTitle>
          <CardDescription>Items that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-orange-100 rounded-full">
                  <Package className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Low Stock Alert</p>
                  <p className="text-xs text-gray-600">5 products are running low on inventory</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-blue-100 rounded-full">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pending Orders</p>
                  <p className="text-xs text-gray-600">8 orders waiting for processing</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Process
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">System Update</p>
                  <p className="text-xs text-gray-600">Platform updated successfully to v2.1.0</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}