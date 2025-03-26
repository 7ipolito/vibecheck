import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QrCode, Globe } from "lucide-react";

export function PaymentMethodSelector({
  selectedMethod,
  setSelectedMethod,
}: {
  selectedMethod: "pix" | "worldcoin" | null;
  setSelectedMethod: (value: "pix" | "worldcoin") => void;
}) {
  return (
    <RadioGroup
      value={selectedMethod || ""}
      onValueChange={(value) => setSelectedMethod(value as "pix" | "worldcoin")}
      className="space-y-4"
    >
      <PaymentMethodCard
        id="pix"
        value="pix"
        selectedMethod={selectedMethod}
        icon={<QrCode className="h-5 w-5 mr-2 text-green-500" />}
        title="PIX"
        description="Pagamento instantâneo via PIX. Transfira diretamente do seu banco."
        footer="Processamento instantâneo"
      />

      <PaymentMethodCard
        id="worldcoin"
        value="worldcoin"
        selectedMethod={selectedMethod}
        icon={<Globe className="h-5 w-5 mr-2 text-blue-500" />}
        title="WorldCoin"
        description="Pagamento com WorldCoin. Verifique sua identidade e pague com criptomoeda."
        footer="Verificação de identidade necessária"
      />
    </RadioGroup>
  );
}

function PaymentMethodCard({
  id,
  value,
  selectedMethod,
  icon,
  title,
  description,
  footer,
}: {
  id: string;
  value: string;
  selectedMethod: string | null;
  icon: JSX.Element;
  title: string;
  description: string;
  footer: string;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        selectedMethod === value
          ? "border-primary ring-1 ring-primary"
          : "hover:border-muted-foreground"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={value} id={id} />
          <Label htmlFor={id} className="cursor-pointer flex items-center">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        {footer}
      </CardFooter>
    </Card>
  );
}
