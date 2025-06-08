'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductsTab } from '../categoriTab/ProductsTab'
import { CategoriesTab } from '../categoriTab/CategoriesTab'
import { UsersTab } from '../categoriTab/UsersTab'
import { TopCategoriesTab } from '../categoriTab/TopCategoriesTab'
import { ImagesTab } from '../categoriTab/ImagesTab'
import ProdectOfTheDay from '../categoriTab/ProductOfTheDay'
import Flavour from "../categoriTab/Flavour"
import Orders from '../categoriTab/Orders'
import DashboardOverview from '../../dashboard/DashboardOverview'
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Users, 
  Image, 
  Star, 
  Palette,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Eye,
  AlertCircle
} from 'lucide-react'

interface TabItem {
  value: string
  label: string
  icon: React.ReactNode
  badge?: string | number
}

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs: TabItem[] = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      value: "products",
      label: "Products",
      icon: <Package className="w-4 h-4" />,
      badge: "156"
    },
    {
      value: "categories",
      label: "Categories",
      icon: <FolderOpen className="w-4 h-4" />,
      badge: "12"
    },
    {
      value: "orders",
      label: "Orders",
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: "23"
    },
    {
      value: "users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
      badge: "89"
    },
    {
      value: "images",
      label: "Images",
      icon: <Image className="w-4 h-4" />
    },
    {
      value: "flavour",
      label: "Flavours",
      icon: <Palette className="w-4 h-4" />
    },
    {
      value: "product-of-the-day",
      label: "Featured",
      icon: <Star className="w-4 h-4" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 lg:p-6 xl:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your e-commerce platform
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 bg-transparent h-auto p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {tab.icon}
                  <span className="hidden sm:inline truncate">{tab.label}</span>
                  <span className="sm:hidden text-[10px] mt-1 truncate">{tab.label}</span>
                  {tab.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-1 h-5 w-auto min-w-[20px] text-xs px-1.5 bg-blue-100 text-blue-700 data-[state=active]:bg-blue-200"
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <TabsContent value="dashboard" className="p-6 m-0">
              <DashboardOverview />
            </TabsContent>

            <TabsContent value="products" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Products Management</h2>
                  <Badge variant="outline">156 Total</Badge>
                </div>
                <ProductsTab />
              </div>
            </TabsContent>

            <TabsContent value="categories" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Categories Management</h2>
                  <Badge variant="outline">12 Total</Badge>
                </div>
                <CategoriesTab />
              </div>
            </TabsContent>

            <TabsContent value="orders" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Orders Management</h2>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                      5 Pending
                    </Badge>
                    <Badge variant="outline">23 Total</Badge>
                  </div>
                </div>
                <Orders />
              </div>
            </TabsContent>

            <TabsContent value="users" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Users Management</h2>
                  <Badge variant="outline">89 Total</Badge>
                </div>
                <UsersTab />
              </div>
            </TabsContent>

            <TabsContent value="images" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Images Management</h2>
                  <Badge variant="outline">Media Library</Badge>
                </div>
                <ImagesTab />
              </div>
            </TabsContent>

            <TabsContent value="flavour" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Flavours Management</h2>
                  <Badge variant="outline">Variants</Badge>
                </div>
                <Flavour />
              </div>
            </TabsContent>

            <TabsContent value="product-of-the-day" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Featured Products</h2>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
                <ProdectOfTheDay />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}