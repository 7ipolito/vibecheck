import { Card, CardContent } from "@/components/ui/card";

export default function AdsCard() {
  return (
    <Card className="rounded-xl border-2 mb-6">
      <CardContent className="p-4 flex justify-center items-center h-20">
        <span className="text-lg font-bold text-gray-500">ADS</span>
      </CardContent>
    </Card>
  );
}
