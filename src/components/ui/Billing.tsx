// src/components/ui/Billing.tsx
import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InsightsCard from "./InsightsCard";

const MOCK_INVOICES = [
  {
    invoice: "INV-0010",
    date: "03 Nov 2025",
    subTotal: "₹1,780",
    gst: "₹320",
    total: "₹2,100",
    status: "PAID",
  },
  {
    invoice: "INV-0009",
    date: "27 Oct 2025",
    subTotal: "₹1,200",
    gst: "₹216",
    total: "₹1,416",
    status: "PAID",
  },
  {
    invoice: "INV-0008",
    date: "20 Oct 2025",
    subTotal: "₹980",
    gst: "₹176",
    total: "₹1,156",
    status: "PAID",
  },
];

export function Billing() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">
            Billing &amp; Credits
          </h1>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            GST-compliant • SOC 2 ready
            <Badge variant="outline" className="text-xs">
              SOC 2
            </Badge>
          </p>
        </div>
        <Button disabled title="Coming soon">
          Add Credits
        </Button>
      </div>

      {/* Top cards */}
      <div className="grid gap-4 md:grid-cols-5">
        {/* Account balance card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-muted-foreground">
              Account balance
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="text-3xl font-semibold tracking-tight">
              ₹2,400.00
            </div>
            <p className="text-xs text-muted-foreground">
              “Add credits” is disabled in MVP.
            </p>
          </CardContent>
        </Card>

        <InsightsCard
          label="Active jobs"
          value="12"
          hint="Running right now"
        />
        <InsightsCard
          label="This month usage"
          value="178 GB"
          hint="Client-mocked data"
        />
        <InsightsCard
          label="GB processed"
          value="234 GB"
          hint="Historical total"
        />
      </div>

      {/* Invoices table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold">GST Invoices</div>
            <p className="text-sm text-muted-foreground">
              Shows last 0–10 rows (mock). Paginated client-side.
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-2">Invoice #</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Sub-total</th>
                  <th className="px-4 py-2">GST (18%)</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 text-right">Download</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INVOICES.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No invoices yet.
                    </td>
                  </tr>
                ) : (
                  MOCK_INVOICES.map((row) => (
                    <tr key={row.invoice} className="border-b last:border-0">
                      <td className="px-4 py-2">{row.invoice}</td>
                      <td className="px-4 py-2">{row.date}</td>
                      <td className="px-4 py-2">{row.subTotal}</td>
                      <td className="px-4 py-2">{row.gst}</td>
                      <td className="px-4 py-2">{row.total}</td>
                      <td className="px-4 py-2">
                        <Badge
                          className="bg-emerald-500/10 text-emerald-600"
                          variant="outline"
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled
                          title="Coming soon"
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Billing;
