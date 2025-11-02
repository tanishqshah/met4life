import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  Eye,
  TrendingDown,
  FileWarning
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fraudCases = [
  { 
    id: 1, 
    claimId: "CLM-2024-001", 
    riskScore: 87, 
    reason: "Duplicate claim detected", 
    amount: "$12,450",
    date: "2024-01-15",
    status: "under_review"
  },
  { 
    id: 2, 
    claimId: "CLM-2024-023", 
    riskScore: 92, 
    reason: "Suspicious provider activity", 
    amount: "$24,800",
    date: "2024-01-15",
    status: "flagged"
  },
  { 
    id: 3, 
    claimId: "CLM-2024-045", 
    riskScore: 78, 
    reason: "Unusual billing pattern", 
    amount: "$8,200",
    date: "2024-01-14",
    status: "under_review"
  },
  { 
    id: 4, 
    claimId: "CLM-2024-067", 
    riskScore: 95, 
    reason: "Identity mismatch detected", 
    amount: "$15,600",
    date: "2024-01-14",
    status: "flagged"
  },
];

const getRiskLevel = (score: number) => {
  if (score >= 90) return { label: "Critical", color: "bg-destructive text-destructive-foreground" };
  if (score >= 75) return { label: "High", color: "bg-warning text-warning-foreground" };
  if (score >= 50) return { label: "Medium", color: "bg-warning/50 text-warning-foreground" };
  return { label: "Low", color: "bg-success/50 text-success-foreground" };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "flagged":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "under_review":
      return "bg-warning/10 text-warning border-warning/20";
    case "resolved":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const FraudDetection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fraud Detection</h1>
        <p className="text-muted-foreground">AI-powered fraud detection and risk analysis.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs text-destructive font-medium mt-1">4 critical</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cases Resolved</p>
                <p className="text-3xl font-bold">48</p>
                <p className="text-xs text-success font-medium mt-1">This month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Shield className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Prevented Loss</p>
                <p className="text-3xl font-bold">$284K</p>
                <p className="text-xs text-success font-medium mt-1">-15% vs last month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <TrendingDown className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileWarning className="h-5 w-5" />
            High-Risk Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fraudCases.map((fraud) => {
                const riskLevel = getRiskLevel(fraud.riskScore);
                return (
                  <TableRow key={fraud.id}>
                    <TableCell className="font-medium">{fraud.claimId}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{fraud.riskScore}%</span>
                          <Badge className={riskLevel.color}>{riskLevel.label}</Badge>
                        </div>
                        <Progress value={fraud.riskScore} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>{fraud.reason}</TableCell>
                    <TableCell className="font-medium">{fraud.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{fraud.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(fraud.status)}>
                        {fraud.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetection;
