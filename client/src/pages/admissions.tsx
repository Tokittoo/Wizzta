import { AdmissionsForm } from "@/components/admissions-form"

export default function Admissions() {
  const handleSubmit = (data: any) => {
    console.log('Admission application submitted:', data)
    // TODO: remove mock functionality - implement real form submission
  }

  return (
    <div className="min-h-screen bg-background">
      <AdmissionsForm 
        onSubmit={handleSubmit}
        applicationStatus="pending"
      />
    </div>
  )
}