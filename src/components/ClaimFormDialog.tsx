import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const claimFormSchema = z.object({
  policyId: z.string().min(1, "Policy ID is required"),
  username: z.string().min(1, "Username is required"),
  claimAmount: z
    .string()
    .min(1, "Claim amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a valid positive number"),
});

type ClaimFormValues = z.infer<typeof claimFormSchema>;

interface ClaimFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClaimFormDialog({ open, onOpenChange }: ClaimFormDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({});

  const form = useForm<ClaimFormValues>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      policyId: "",
      username: "",
      claimAmount: "",
    },
  });

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => ({ ...prev, [file.name]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews((prev) => ({ ...prev, [file.name]: null }));
      }
    });
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    setPreviews((prev) => {
      const copy = { ...prev };
      delete copy[fileName];
      return copy;
    });
  };

const onSubmit = async (data: ClaimFormValues) => {
  if (files.length === 0) {
    toast({
      title: "Error",
      description: "Please upload at least one bill receipt",
      variant: "destructive",
    });
    return;
  }

  try {
    // Prepare FormData for binary file upload
    const formData = new FormData();
    formData.append("policyId", data.policyId);
    formData.append("username", data.username);
    formData.append("claimedAmt", data.claimAmount);
    files.forEach((file) => {
      formData.append("billReceipts", file);
    });

    const response = await fetch("http://172.20.4.70:8080/v1/userform", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Claim submitted successfully:", result);

    toast({
      title: "Success",
      description: "Claim submitted successfully!",
    });

    // Reset form
    form.reset();
    setFiles([]);
    setPreviews({});
    onOpenChange(false);
  } catch (error) {
    console.error("API Error:", error);
    toast({
      title: "Error",
      description: "Something went wrong while submitting your claim.",
      variant: "destructive",
    });
  }
};



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for Claim</DialogTitle>
          <DialogDescription>
            Fill in the details below to submit your claim request
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="policyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter policy ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="claimAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Claim Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter claim amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multi-file upload */}
            <div className="space-y-2">
              <FormLabel>Bill Receipts</FormLabel>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload one or more files
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleFilesChange}
                />
              </label>

              {/* Preview uploaded files */}
              <div className="space-y-2 mt-2">
                {files.map((file) => (
                  <div key={file.name} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {file.type === "application/pdf" ? (
                          <FileText className="w-5 h-5 text-primary" />
                        ) : (
                          <img
                            src={previews[file.name] || ""}
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        )}
                        <span className="text-sm font-medium truncate max-w-[300px]">
                          {file.name}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.name)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Submit Claim
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}