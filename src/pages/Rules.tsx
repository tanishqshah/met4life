import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus,
  Shield,
  Edit,
  Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rules = [
  { 
    id: 1, 
    name: "Maximum Claim Amount", 
    description: "Auto-reject claims exceeding $50,000",
    type: "threshold",
    active: true,
    priority: "high"
  },
  { 
    id: 2, 
    name: "Duplicate Detection", 
    description: "Flag duplicate claims within 30 days",
    type: "fraud",
    active: true,
    priority: "critical"
  },
  { 
    id: 3, 
    name: "Pre-Authorization Required", 
    description: "Require pre-auth for procedures over $10,000",
    type: "authorization",
    active: true,
    priority: "medium"
  },
  { 
    id: 4, 
    name: "Network Provider Check", 
    description: "Verify provider is in-network",
    type: "validation",
    active: false,
    priority: "medium"
  },
  { 
    id: 5, 
    name: "Age-Based Restrictions", 
    description: "Apply age limits for certain procedures",
    type: "eligibility",
    active: true,
    priority: "low"
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-destructive text-destructive-foreground";
    case "high":
      return "bg-warning text-warning-foreground";
    case "medium":
      return "bg-primary/50 text-primary-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "fraud":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "threshold":
      return "bg-warning/10 text-warning border-warning/20";
    case "authorization":
      return "bg-primary/10 text-primary border-primary/20";
    case "validation":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const Rules = () => {
  const [ruleList, setRuleList] = useState(rules);

  const toggleRule = (id: number) => {
    setRuleList(ruleList.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rules Engine</h1>
          <p className="text-muted-foreground">Configure and manage claim processing rules.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                <p className="text-3xl font-bold">
                  {ruleList.filter(r => r.active).length}
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Rules</p>
                <p className="text-3xl font-bold">{ruleList.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Rules</p>
                <p className="text-3xl font-bold">
                  {ruleList.filter(r => r.priority === "critical").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ruleList.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(rule.type)}>
                      {rule.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={rule.active} 
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {rule.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
