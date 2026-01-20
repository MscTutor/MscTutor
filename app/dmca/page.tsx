import Breadcrumbs from '@/components/Breadcrumbs'

export default function DMCAPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'DMCA' }]} />
      <h1 className="text-4xl font-bold mb-8">DMCA Notice</h1>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <p>
          MscTutor respects the intellectual property rights of others and expects its users to do the same.
        </p>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Copyright Infringement Claims</h2>
          <p>
            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>A description of the copyrighted work that you claim has been infringed</li>
            <li>The location of the material that you claim is infringing</li>
            <li>Your contact information</li>
            <li>A statement that you have a good faith belief that the use is not authorized</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
