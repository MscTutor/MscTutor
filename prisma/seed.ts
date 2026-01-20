import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create Classes (1-12)
  const classes = []
  for (let i = 1; i <= 12; i++) {
    const classItem = await prisma.class.upsert({
      where: { name: `class-${i}` },
      update: {},
      create: {
        name: `class-${i}`,
        displayName: `Class ${i}`,
        order: i,
      },
    })
    classes.push(classItem)
    console.log(`✅ Created Class ${i}`)
  }

  // Create Subjects for all classes
  const subjectsToCreate = ['math', 'science', 'commerce']
  
  for (const classItem of classes) {
    for (const subjectSlug of subjectsToCreate) {
      const subjectNames: Record<string, string> = {
        math: 'Mathematics',
        science: 'Science',
        commerce: 'Commerce',
      }

      const subjectDescriptions: Record<string, string> = {
        math: `Mathematics for ${classItem.displayName}`,
        science: `Science for ${classItem.displayName}`,
        commerce: `Commerce for ${classItem.displayName}`,
      }

      await prisma.subject.upsert({
        where: { 
          name: `${subjectSlug}-${classItem.name}`,
        },
        update: {},
        create: {
          name: `${subjectSlug}-${classItem.name}`,
          displayName: subjectNames[subjectSlug],
          slug: `${subjectSlug}-${classItem.name}`,
          description: subjectDescriptions[subjectSlug],
          classId: classItem.id,
        },
      })
      console.log(`✅ Created ${subjectNames[subjectSlug]} for ${classItem.displayName}`)
    }
  }

  // Get Class 10 for sample data
  const class10 = classes.find(c => c.name === 'class-10')
  
  if (class10) {
    const mathSubject = await prisma.subject.findFirst({
      where: {
        name: `math-${class10.name}`,
        classId: class10.id,
      },
    })

    if (mathSubject) {
      // Create sample chapters for Class 10 Math
      const algebraChapter = await prisma.chapter.upsert({
        where: {
          subjectId_slug: {
            subjectId: mathSubject.id,
            slug: 'algebra',
          },
        },
        update: {},
        create: {
          name: 'Algebra',
          slug: 'algebra',
          description: 'Introduction to Algebra',
          order: 1,
          subjectId: mathSubject.id,
        },
      })
      console.log('✅ Created Chapter: Algebra')

      const geometryChapter = await prisma.chapter.upsert({
        where: {
          subjectId_slug: {
            subjectId: mathSubject.id,
            slug: 'geometry',
          },
        },
        update: {},
        create: {
          name: 'Geometry',
          slug: 'geometry',
          description: 'Basic Geometry',
          order: 2,
          subjectId: mathSubject.id,
        },
      })
      console.log('✅ Created Chapter: Geometry')

      // Create Sample Questions (only if chapter exists)
      if (algebraChapter) {
      const question1 = await prisma.question.upsert({
        where: { slug: 'q-algebra-linear-equation-001' },
        update: {},
        create: {
          questionText: 'Solve for x: 2x + 5 = 15',
          questionLatex: 'Solve for $x$: $2x + 5 = 15$',
          slug: 'q-algebra-linear-equation-001',
          chapterId: algebraChapter.id,
          difficulty: 'easy',
          questionType: 'text',
        },
      })
      console.log('✅ Created Question 1')

      // Create Solution for Question 1
      await prisma.solution.createMany({
        data: [
          {
            questionId: question1.id,
            stepNumber: 1,
            stepText: 'Subtract 5 from both sides',
            stepLatex: '$2x + 5 - 5 = 15 - 5$',
            explanation: 'We isolate the variable term by removing the constant.',
          },
          {
            questionId: question1.id,
            stepNumber: 2,
            stepText: 'Simplify both sides',
            stepLatex: '$2x = 10$',
            explanation: 'After subtraction, we get 2x equals 10.',
          },
          {
            questionId: question1.id,
            stepNumber: 3,
            stepText: 'Divide both sides by 2',
            stepLatex: '$\\frac{2x}{2} = \\frac{10}{2}$',
            explanation: 'Divide by the coefficient of x to solve for x.',
          },
          {
            questionId: question1.id,
            stepNumber: 4,
            stepText: 'Final answer',
            stepLatex: '$x = 5$',
            explanation: 'Therefore, x equals 5.',
          },
        ],
        skipDuplicates: true,
      })
      console.log('✅ Created Solutions for Question 1')

      // Create Formula (check if exists first)
      const existingFormula = await prisma.formula.findFirst({
        where: {
          chapterId: algebraChapter.id,
          name: 'Linear Equation',
        },
      })

      if (!existingFormula) {
        await prisma.formula.create({
          data: {
            name: 'Linear Equation',
            formulaLatex: '$ax + b = c$',
            description: 'General form of a linear equation',
            chapterId: algebraChapter.id,
            variables: JSON.stringify(['a', 'b', 'c']),
          },
        })
        console.log('✅ Created Formula')
      } else {
        console.log('✅ Formula already exists')
      }

      // Create Question Variation
      await prisma.questionVariation.createMany({
        data: [
          {
            questionId: question1.id,
            text: 'Find the value of x if 2x + 5 equals 15',
            latex: 'Find the value of $x$ if $2x + 5 = 15$',
          },
        ],
        skipDuplicates: true,
      })
        console.log('✅ Created Question Variation')
      }
    }
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
