import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Calendar, DollarSign } from "lucide-react"
import { StatusBadge } from "./status-badge"

const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardName: z.string().optional(),
})

type PaymentForm = z.infer<typeof paymentSchema>

interface FeeRecord {
  id: string
  description: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paidDate?: string
}

interface FeesPaymentProps {
  feeRecords: FeeRecord[]
  onPayment: (feeId: string, paymentData: PaymentForm) => void
  onDownloadReceipt: (feeId: string) => void
}

export function FeesPayment({ feeRecords, onPayment, onDownloadReceipt }: FeesPaymentProps) {
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const form = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  })

  const paymentMethod = form.watch("paymentMethod")

  const handlePayment = (data: PaymentForm) => {
    if (!selectedFee) return
    
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      onPayment(selectedFee.id, data)
      setIsProcessing(false)
      setSelectedFee(null)
      form.reset()
    }, 3000)
  }

  const totalPending = feeRecords
    .filter(fee => fee.status === "pending" || fee.status === "overdue")
    .reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {feeRecords.filter(f => f.status !== "paid").length} pending payments
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Year</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,780</div>
            <p className="text-xs text-muted-foreground">Total payments made</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="backdrop-blur-md bg-card/80">
            <CardHeader>
              <CardTitle>Fee Records</CardTitle>
              <CardDescription>Your payment history and pending fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeRecords.map((fee) => (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover-elevate cursor-pointer"
                    onClick={() => fee.status !== "paid" && setSelectedFee(fee)}
                    data-testid={`fee-record-${fee.id}`}
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{fee.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(fee.dueDate).toLocaleDateString()}
                      </p>
                      {fee.paidDate && (
                        <p className="text-sm text-muted-foreground">
                          Paid: {new Date(fee.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold">${fee.amount.toLocaleString()}</p>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={fee.status} size="sm" />
                        {fee.status === "paid" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDownloadReceipt(fee.id)
                            }}
                            data-testid={`button-download-receipt-${fee.id}`}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="backdrop-blur-md bg-card/80">
            <CardHeader>
              <CardTitle>Make Payment</CardTitle>
              <CardDescription>
                {selectedFee 
                  ? `Pay for: ${selectedFee.description}`
                  : "Select a fee record to make payment"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedFee ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              value={`$${selectedFee.amount.toLocaleString()}`}
                              disabled
                              data-testid="input-amount"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-payment-method">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="credit-card">Credit Card</SelectItem>
                              <SelectItem value="debit-card">Debit Card</SelectItem>
                              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                              <SelectItem value="upi">UPI Payment</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                      <>
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-card-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="1234 5678 9012 3456"
                                  data-testid="input-card-number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="MM/YY"
                                    data-testid="input-expiry-date"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="123"
                                    data-testid="input-cvv"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isProcessing}
                      data-testid="button-make-payment"
                    >
                      {isProcessing ? "Processing Payment..." : `Pay $${selectedFee.amount.toLocaleString()}`}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a pending fee record to make payment
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}