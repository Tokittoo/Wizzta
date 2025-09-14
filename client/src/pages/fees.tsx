import { FeesPayment } from "@/components/fees-payment"

export default function Fees() {
  // TODO: remove mock functionality - replace with real fee records
  const mockFeeRecords = [
    {
      id: "1",
      description: "Tuition Fee - Semester 1",
      amount: 5000,
      dueDate: "2024-12-31",
      status: "pending" as const
    },
    {
      id: "2",
      description: "Library Fee",
      amount: 200,
      dueDate: "2024-11-15", 
      status: "overdue" as const
    },
    {
      id: "3",
      description: "Lab Fee - Computer Science",
      amount: 800,
      dueDate: "2024-10-15",
      status: "paid" as const,
      paidDate: "2024-10-10"
    },
    {
      id: "4",
      description: "Hostel Fee - Quarter 1",
      amount: 2500,
      dueDate: "2024-09-30",
      status: "paid" as const,
      paidDate: "2024-09-25"
    }
  ]

  const handlePayment = (feeId: string, paymentData: any) => {
    console.log('Payment initiated for fee:', feeId, paymentData)
    // TODO: remove mock functionality - implement real payment processing
  }

  const handleDownloadReceipt = (feeId: string) => {
    console.log('Download receipt for fee:', feeId)
    // TODO: remove mock functionality - implement real receipt download
  }

  return (
    <FeesPayment
      feeRecords={mockFeeRecords}
      onPayment={handlePayment}
      onDownloadReceipt={handleDownloadReceipt}
    />
  )
}