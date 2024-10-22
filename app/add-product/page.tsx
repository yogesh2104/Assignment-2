"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Image, Menu, Trash2 } from "lucide-react"
import SideBar from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const steps = ["Description", "Variants", "Combinations", "Price info"]

export default function ProductAdd() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Shoes",
    brand: "Nike",
    image: "",
    variants: [
      { name: "Size", values: ["M", "L"] },
      { name: "Color", values: ["Black", "Red"] },
    ],
    combinations: [
      { name: "M/Black", sku: "ABC12", quantity: 4, inStock: false },
      { name: "M/Red", sku: "SDF3", quantity: 5, inStock: true },
      { name: "L/Black", sku: "HWE2", quantity: 0, inStock: false },
      { name: "L/Red", sku: "ABC12", quantity: 9, inStock: true },
    ],
    priceInr: 500,
    discount: {
      method: "pct",
      value: 12
    }
  })

  const router = useRouter()

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }


  const generateOutput = () => {
    const output = {
      products: {
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        image: formData.image,
        variants: formData.variants,
        combinations: Object.fromEntries(
          formData.combinations.map((combo, index) => [
            String.fromCharCode(97 + index),
            {
              name: combo.name,
              sku: combo.sku,
              quantity: combo.quantity,
              inStock: combo.inStock
            }
          ])
        ),
        priceInr: formData.priceInr,
        discount: formData.discount
      }
    }
    return JSON.stringify(output, null, 2)
  }

  const addVariant = () => {
    setFormData((prevData) => ({
      ...prevData,
      variants: [...prevData.variants, { name: "", values: [] }],
    }));
  };

  const updateVariant = (index: number, field: "name" | "values", value: string) => {
    const updatedVariants = [...formData.variants];
    if (field === "name") {
      updatedVariants[index].name = value;
    } else {
      updatedVariants[index].values = value.split(",").map(v => v.trim());
    }
    setFormData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const removeVariant = (index:number) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-36 text-[#1F8CD0]" onClick={() => handleInputChange("image", "/placeholder.svg")}>
              <Image className="h-4 w-4" /> Upload Image
            </Button>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            {formData.variants.map((variant, index) => (
              <div key={index} className="mb-4">
                <div className="flex space-x-4 mb-2">
                  <div className="flex-1">
                    <Label htmlFor={`option-${index}`}>Option *</Label>
                    <Input
                      id={`option-${index}`}
                      value={variant.name}
                      className={cn(variant.name === "" && "border border-red-500")}
                      onChange={(e) => updateVariant(index, "name", e.target.value)}
                      placeholder="e.g. Size"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`values-${index}`}>Values *</Label>
                    <Input
                      id={`values-${index}`}
                      value={variant.values.join(", ")}
                      className={cn(variant.name === "" && "border border-red-500")}
                      onChange={(e) => updateVariant(index, "values", e.target.value)}
                      placeholder="e.g. Small, Medium, Large"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    onClick={() => removeVariant(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {variant.name === "" && (
                  <p className="text-red-500 text-sm">Option can&apos;t be empty</p>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addVariant} className="mt-2">
              + Add Option
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Combination</th>
                  <th className="text-left">SKU *</th>
                  <th className="text-left">In stock</th>
                  <th className="text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {formData.combinations.map((combo, index) => (
                  <tr key={index}>
                    <td>{combo.name}</td>
                    <td>
                      <Input
                        value={combo.sku}
                        onChange={(e) => {
                          const newCombinations = [...formData.combinations]
                          newCombinations[index].sku = e.target.value
                          handleInputChange("combinations", newCombinations)
                        }}
                        className="w-[140px]"
                      />
                    </td>
                    <td>
                      <Switch
                        checked={combo.inStock}
                        onCheckedChange={(checked) => {
                          const newCombinations = [...formData.combinations]
                          newCombinations[index].inStock = checked
                          handleInputChange("combinations", newCombinations)
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={combo.quantity}
                        className="w-[140px]"
                        onChange={(e) => {
                          const newCombinations = [...formData.combinations]
                          newCombinations[index].quantity = parseInt(e.target.value)
                          handleInputChange("combinations", newCombinations)
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.priceInr}
                onChange={(e) => handleInputChange("priceInr", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount</Label>
              <div className="flex space-x-2">
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount.value}
                  onChange={(e) => handleInputChange("discount", { ...formData.discount, value: parseFloat(e.target.value) })}
                />
                <Select
                  value={formData.discount.method}
                  onValueChange={(value) => handleInputChange("discount", { ...formData.discount, method: value })}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pct">%</SelectItem>
                    <SelectItem value="flat">$</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:block w-72">
        <SideBar />
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <div className="flex items-center space-x-2">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SideBar />
              </SheetContent>
            </Sheet>
            <Button variant="outline" className="text-[#1F8CD0]" onClick={() =>currentStep==0? router.back() : setCurrentStep(Math.max(0, currentStep - 1))}>
              Back
            </Button>
            <Button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  setShowOutput(true)
                } else {
                  setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                }
              }}
              className="bg-[#1F8CD0]"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>

        <div className="mb-6 overflow-x-auto">
          <nav className="flex space-x-1 min-w-max items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                 <Button
                    variant={index === currentStep ? "secondary" : "ghost"}
                    size={"sm"}
                    className={index <= currentStep ? "bg-blue-100 text-blue-600" : ""}
                    onClick={() => setCurrentStep(index)}
                  >
                  {step}
                </Button>
                {index < steps.length - 1 && <ChevronRight className="w-5 h-5 text-gray-400" />}
              </React.Fragment>
            ))}
          </nav>
        </div>

        <Card className={"max-w-lg"}>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">{steps[currentStep]}</h2>
            {renderStepContent()}
          </CardContent>
        </Card>

        <Dialog open={showOutput} onOpenChange={setShowOutput}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Data</DialogTitle>
              <DialogDescription>
                Here&apos;s the JSON representation of the product data:
              </DialogDescription>
            </DialogHeader>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-sm">
              {generateOutput()}
            </pre>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}