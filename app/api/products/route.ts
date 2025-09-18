import { NextResponse } from 'next/server';

export async function GET() {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "HOTMESS Drop #1",
      description: "RAW limited edition tee",
      price: 60,
      image: "/placeholder-product.jpg",
      category: "RAW",
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: "HOTMESS Drop #2", 
      description: "HUNG hoodie collection",
      price: 80,
      image: "/placeholder-product.jpg",
      category: "HUNG",
      inStock: true,
      featured: false
    },
    {
      id: 3,
      name: "HOTMESS Drop #3",
      description: "HIGH energy tank",
      price: 45,
      image: "/placeholder-product.jpg", 
      category: "HIGH",
      inStock: false,
      featured: true
    },
    {
      id: 4,
      name: "HOTMESS Drop #4",
      description: "SUPER exclusive mesh",
      price: 95,
      image: "/placeholder-product.jpg",
      category: "SUPER", 
      inStock: true,
      featured: false
    },
    {
      id: 5,
      name: "HOTMESS Drop #5",
      description: "Aftercare comfort collection",
      price: 70,
      image: "/placeholder-product.jpg",
      category: "HNHMESS",
      inStock: true,
      featured: true
    },
    {
      id: 6,
      name: "HOTMESS Drop #6",
      description: "Limited frequency gear",
      price: 55,
      image: "/placeholder-product.jpg",
      category: "RADIO",
      inStock: true,
      featured: false
    }
  ];

  return NextResponse.json({ products });
}