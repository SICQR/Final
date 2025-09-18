import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id);
  
  // Mock product data - in a real app this would come from a database
  const products = [
    {
      id: 1,
      name: "HOTMESS Drop #1",
      description: "RAW limited edition tee",
      longDescription: "A raw expression of queer identity, this limited edition tee embodies the HOTMESS ethos. Made from premium cotton with a relaxed fit that moves with you through the night. Perfect for those who stayed up, stayed soft, and still showed up.",
      price: 60,
      images: ["/placeholder-product.jpg", "/placeholder-product-2.jpg"],
      category: "RAW",
      inStock: true,
      featured: true,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Hot Pink"],
      materials: "100% Premium Cotton",
      care: "Machine wash cold, tumble dry low"
    },
    {
      id: 2,
      name: "HOTMESS Drop #2", 
      description: "HUNG hoodie collection",
      longDescription: "The HUNG collection celebrates confidence and comfort. This hoodie wraps you in softness while making a statement. Essential for aftercare moments and late-night adventures.",
      price: 80,
      images: ["/placeholder-product.jpg", "/placeholder-product-2.jpg"],
      category: "HUNG",
      inStock: true,
      featured: false,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Grey", "Hung Yellow"],
      materials: "80% Cotton, 20% Polyester",
      care: "Machine wash cold, hang dry"
    },
    {
      id: 3,
      name: "HOTMESS Drop #3",
      description: "HIGH energy tank",
      longDescription: "Channel your HIGH energy with this performance tank. Designed for movement, comfort, and the dance floor. Currently sold out but restocking soon.",
      price: 45,
      images: ["/placeholder-product.jpg", "/placeholder-product-2.jpg"], 
      category: "HIGH",
      inStock: false,
      featured: true,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Neon Green", "Electric Blue", "Hot Pink"],
      materials: "95% Polyester, 5% Elastane",
      care: "Machine wash cold, do not bleach"
    },
    {
      id: 4,
      name: "HOTMESS Drop #4",
      description: "SUPER exclusive mesh",
      longDescription: "The SUPER collection pushes boundaries. This exclusive mesh piece is designed for those who dare to be seen. Limited quantities available.",
      price: 95,
      images: ["/placeholder-product.jpg", "/placeholder-product-2.jpg"],
      category: "SUPER", 
      inStock: true,
      featured: false,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Transparent"],
      materials: "100% Polyester Mesh",
      care: "Hand wash only, air dry"
    },
    {
      id: 5,
      name: "HOTMESS Drop #5",
      description: "Aftercare comfort collection",
      longDescription: "HNHMESS - Hand 'n' Hand is the only way to land. This comfort collection is designed for those tender moments after the storm. Aftercare, not afterthought.",
      price: 70,
      images: ["/placeholder-product.jpg", "/placeholder-product-2.jpg"],
      category: "HNHMESS",
      inStock: true,
      featured: true,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Soft Pink", "Cream", "Lavender"],
      materials: "100% Organic Cotton",
      care: "Machine wash gentle, tumble dry low"
    },
    {
      id: 6,
      name: "HOTMESS Drop #6",
      description: "Limited frequency gear",
      longDescription: "Rep the frequency with this limited radio merch. Perfect for listeners of London's Filth Frequency. Show your support for queer radio.",
      price: 55,
      images: ["/placeholder-product.jpg", "/placeholder-product-2.jpg"],
      category: "RADIO",
      inStock: true,
      featured: false,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Radio Red"],
      materials: "100% Cotton",
      care: "Machine wash cold, iron on reverse"
    }
  ];

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ product });
}