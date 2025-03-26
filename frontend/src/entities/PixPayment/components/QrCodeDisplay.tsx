import Image from "next/image";

interface QrCodeDisplayProps {
  pixQrCode: string;
}

export function QrCodeDisplay({ pixQrCode }: QrCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {pixQrCode ? (
        <div className="bg-white p-4 rounded-lg">
          <Image
            src={pixQrCode}
            alt="PIX QR Code"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      ) : (
        <div className="bg-gray-100 w-[200px] h-[200px] flex items-center justify-center rounded-lg">
          <p className="text-sm text-muted-foreground">
            QR Code will appear here
          </p>
        </div>
      )}
    </div>
  );
}
