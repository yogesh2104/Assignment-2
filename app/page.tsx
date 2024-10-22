"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SideBar from "@/components/sidebar"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function ResponsiveProductAdditionForm() {

  const products = [
    { name: "Nike Air Jordan", price: "₹12,000", brand: "Nike", image: "/placeholder.svg?height=80&width=80" },
    { name: "Nike Dunk Low", price: "₹8,000", brand: "Nike", image: "/placeholder.svg?height=80&width=80" },
  ]

  const [openaddCategory,setOpenCategory] = useState(false)

  const [categories, setCategories] = useState([
    { id: "abc", name: "Shoes" },
    { id: "xyz", name: "T-shirt" },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;
    const newCategory = { id: Date.now().toString(), name: newCategoryName }; 
    setCategories([...categories, newCategory]);
    setNewCategoryName(""); 
    setOpenCategory(false);
  };

  return (
    <div className="flex h-screen">
      <aside className="hidden md:block w-72 border-r">
        <SideBar />
      </aside>

      <main className="flex-1 p-4 h-screen overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="space-x-2">
          <Dialog open={openaddCategory} onOpenChange={setOpenCategory}>
            <DialogTrigger asChild>
              <Button variant="outline">Add category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add category</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="name">Category name *</Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)} // Update state on input change
                  placeholder="Enter category name"
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="button" variant={"outline"} className="w-[100px]" onClick={() => setOpenCategory(false)}>
                  Cancel
                </Button>
                <Button type="button" className="w-[100px] bg-[#1F8CD0]" onClick={handleAddCategory}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button asChild>
            <Link className="!bg-[#1F8CD0]" href={"/add-product"}>Add Product</Link>
          </Button>
        </div>
        </div>

        <div className="grid grid-cols-4 gap-3 h-full">
          <div className="bg-muted h-full p-2 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Shoes</h2>
            <div className="space-y-4">
            {products.map((product, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center">
                    <div className="w-20 h-20 object-cover mr-4 rounded-sm border" />
                    <div>
                      <h3 className="font-bold text-md">{product.name}</h3>
                      <p className="font-medium text-sm">{product.price}</p>
                      <p className="text-sm text-blue-600 bg-[#ECF7FF] w-fit px-3 rounded-sm mt-3">{product.brand}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="bg-muted h-full p-2 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">T-shirt</h2>
          </div>
        </div>
      </main>

    </div>
  )
}