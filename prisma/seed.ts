const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
const prisma = new PrismaClient()

async function main() {
  // 1. Create Categories
  const bags = await prisma.category.upsert({
    where: { name: 'Bags' },
    update: {},
    create: { name: 'Bags', slug: 'bags' },
  })
  
  const rugs = await prisma.category.upsert({
    where: { name: 'Rugs' },
    update: {},
    create: { name: 'Rugs', slug: 'rugs' },
  })

  const decor = await prisma.category.upsert({
    where: { name: 'Home Decor' },
    update: {},
    create: { name: 'Home Decor', slug: 'home-decor' },
  })

  // 2. Create Products (From your Designs)
  const products = [
    {
      name: 'The Bengal Tote',
      slug: 'the-bengal-tote',
      description: 'Handcrafted jute tote bag perfect for daily carry. Durable and eco-friendly.',
      price: 45.00,
      categoryId: bags.id,
      weaveStyle: 'Braided',
      color: 'Natural',
      stock: 50,
      images: ['https://placehold.co/600x400/e2e2e2/8b5cf6?text=Bengal+Tote'] // Placeholder for now
    },
    {
      name: 'The Sundarban Rug',
      slug: 'the-sundarban-rug',
      description: 'Circular woven jute rug inspired by the mangroves. Adds warmth to any room.',
      price: 120.00,
      categoryId: rugs.id,
      weaveStyle: 'Spiral',
      color: 'Natural',
      stock: 20,
      images: ['https://placehold.co/600x400/e2e2e2/8b5cf6?text=Sundarban+Rug']
    },
    {
      name: 'Macrame Wall Hanging',
      slug: 'macrame-wall-hanging',
      description: 'Intricate macrame design to bring bohemian vibes to your wall.',
      price: 25.00,
      categoryId: decor.id,
      weaveStyle: 'Macrame',
      color: 'Bleached',
      stock: 15,
      images: ['https://placehold.co/600x400/e2e2e2/8b5cf6?text=Macrame+Wall']
    },
    {
      name: 'Terracotta Dye Planter',
      slug: 'terracotta-dye-planter',
      description: 'Two-tone planter basket with natural terracotta dye.',
      price: 45.00,
      categoryId: decor.id,
      weaveStyle: 'Coiled',
      color: 'Terracotta',
      stock: 30,
      images: ['https://placehold.co/600x400/e2e2e2/8b5cf6?text=Planter+Basket']
    }
  ]

  console.log('🌱 Seeding database...')
  
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }
  
  console.log('✅ Database seeded with Jute Products!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })