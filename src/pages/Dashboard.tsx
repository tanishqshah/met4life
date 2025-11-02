import { useEffect, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock } from "lucide-react";
import ClaimTable from "@/components/ClaimTable";

interface ClaimStatusCount {
  totalClaims: number;
  approved: number;
  pending: number;
  rejected: number;
}

const Dashboard = () => {
  const [claims, setClaims] = useState<[]>([]);
  const [statusCount, setStatusCount] = useState<ClaimStatusCount | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all claims
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch("http://172.20.4.70:8080/v1/userform/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claims");
        }

        const data = await response.json();
        setClaims(data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  // Fetch status counts
  useEffect(() => {
    const fetchStatusCount = async () => {
      try {
        const response = await fetch("http://172.20.4.70:8080/v1/userform/status/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claim status count");
        }

        const data = await response.json();
        setStatusCount({
          totalClaims: claims.length ?? 0,
          approved: data.approved ?? 0,
          pending: data.pending ?? 0,
          rejected: data.rejected ?? 0,
        });
      } catch (error) {
        console.error("Error fetching status count:", error);
      }
    };

    fetchStatusCount();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your overview.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Claims"
          value={loading ? "Loading..." : claims.length.toLocaleString() ?? "0"}
          change="+12.5% from last month"
          icon={FileText}
          trend="up"
        />
        <MetricCard
          title="Approved"
          value={loading ? "Loading..." : statusCount?.approved?.toString() ?? "0"}
          change="Approved claims"
          icon={FileText}
          trend="up"
        />
        <MetricCard
          title="Pending"
          value={loading ? "Loading..." : statusCount?.pending?.toString() ?? "0"}
          change="Currently under review"
          icon={Clock}
          trend="neutral"
        />
      </div>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Claims Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading claims...</p>
          ) : (
            <ClaimTable data={claims} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
