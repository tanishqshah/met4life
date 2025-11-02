import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Search,
  Download,
  Eye,
  Loader2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const documents = [
  { id: 1, name: "Medical_Claim_001.pdf", type: "Claim", status: "processed", uploadDate: "2024-01-15", size: "2.4 MB" },
  { id: 2, name: "Policy_Document_456.pdf", type: "Policy", status: "processing", uploadDate: "2024-01-15", size: "1.8 MB" },
  { id: 3, name: "Medical_Records_789.pdf", type: "Medical", status: "processed", uploadDate: "2024-01-14", size: "5.2 MB" },
  { id: 4, name: "Claim_Supporting_002.pdf", type: "Supporting", status: "processed", uploadDate: "2024-01-14", size: "3.1 MB" },
  { id: 5, name: "Prescription_Details.pdf", type: "Medical", status: "pending", uploadDate: "2024-01-13", size: "0.8 MB" },
];

const Documents = () => {
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-success/10 text-success border-success/20";
      case "processing":
        return "bg-warning/10 text-warning border-warning/20";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Document Processing</h1>
        <p className="text-muted-foreground">Upload and manage insurance documents with AI-powered extraction.</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary">
            <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Drop files here or click to browse</p>
            <p className="mb-4 text-xs text-muted-foreground">
              Supports PDF, DOCX, PNG, JPG up to 10MB
            </p>
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button disabled={uploading} asChild>
                <span>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Select Files
                    </>
                  )}
                </span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Documents</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{doc.uploadDate}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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

export default Documents;
