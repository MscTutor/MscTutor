import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Science Branches...')

  const branches = [
    {
      name: 'physics',
      displayName: 'Physics',
      slug: 'physics',
      description: 'Study of matter, motion, energy, and force',
      order: 1,
    },
    {
      name: 'chemistry',
      displayName: 'Chemistry',
      slug: 'chemistry',
      description: 'Study of matter, its properties, and reactions',
      order: 2,
    },
    {
      name: 'biology',
      displayName: 'Biology',
      slug: 'biology',
      description: 'Study of living organisms and their processes',
      order: 3,
    },
    {
      name: 'geology',
      displayName: 'Geology',
      slug: 'geology',
      description: 'Study of the Earth and its processes',
      order: 4,
    },
    {
      name: 'environmental-science',
      displayName: 'Environmental Science',
      slug: 'environmental-science',
      description: 'Study of the environment and solutions to environmental problems',
      order: 5,
    },
    {
      name: 'astronomy',
      displayName: 'Astronomy',
      slug: 'astronomy',
      description: 'Study of celestial objects and the universe',
      order: 6,
    },
    {
      name: 'botany',
      displayName: 'Botany',
      slug: 'botany',
      description: 'Study of plants',
      order: 7,
    },
  ]

  for (const branch of branches) {
    await prisma.scienceBranch.upsert({
      where: { slug: branch.slug },
      update: {},
      create: branch,
    })
    console.log(`✅ Created Science Branch: ${branch.displayName}`)
  }

  console.log('🎉 Science branches seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
