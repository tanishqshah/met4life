import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

type Claim = {
  id: number;
  claimant: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  validated?: boolean;
  fullname?: string;
  claimedAmt?: string;
  updatedAt?: string;
};

interface ClaimTableProps {
  data: Claim[];
}

export const ClaimTable: React.FC<ClaimTableProps> = ({ data }) => {
  const [claims, setClaims] = React.useState<Claim[]>(data ?? []);

  React.useEffect(() => {
    setClaims(data);
  }, [data]);

  // PATCH call to backend
  const updateStatusAPI = async (id: number, status: Claim["status"]) => {
    try {
      const response = await fetch("http://172.20.4.70:8080/v1/userform/update-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update claim status");
      }

      const updatedClaim = await response.json();
      console.log("Updated claim:", updatedClaim);

      // Update state after successful API call
      setClaims((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update claim status. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Claims</h2>

      {claims.length === 0 ? (
        <p className="text-sm text-muted-foreground">No claims found.</p>
      ) : (
        <Table>
          <TableCaption>List of recent claim requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.No</TableHead>
              <TableHead>Claimant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.id}</TableCell>
                <TableCell>{claim?.fullname}</TableCell>
                <TableCell>{claim.claimedAmt}</TableCell>
                <TableCell>{claim.updatedAt}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      claim.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : claim.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        claim.status === "approved"
                          ? "bg-green-600"
                          : claim.status === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    />
                    {claim.status}
                    {claim.validated && (
                      <span className="ml-2 inline-flex items-center text-xs text-green-700">
                        <CheckCircle size={14} />
                        <span className="ml-1">Validated</span>
                      </span>
                    )}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                    { claim.status === "pending" &&
                  <div className="inline-flex gap-2">
                    
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => updateStatusAPI(claim.id, "approved")}
                      
                    >
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle size={14} /> Approve
                      </span>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatusAPI(claim.id, "rejected")}
                      
                    >
                      <span className="inline-flex items-center gap-1">
                        <XCircle size={14} /> Reject
                      </span>
                    </Button>
                  </div>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ClaimTable;
