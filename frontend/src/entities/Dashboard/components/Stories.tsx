"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { StoryCard } from "./StoryCard";
import { Camera, Plus, X } from "lucide-react";
import AddParty from "./AddParty";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Sample data for stories
const stories = [
  {
    id: 1,
    username: "Neymar",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Neymar_Junior.png",
    viewed: false,
  },
  {
    id: 2,
    username: "Allan",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIvMQ-dCzNRMgk4jtdDpEcpJPRLO8wh4Uo7eiw6_wiWPK21pVnCBg=s576-c-no",
    viewed: false,
  },
  // ... other stories
];

export default function Stories() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [cameraStream, setCameraStream] = React.useState<MediaStream | null>(
    null
  );
  const [isCameraVisible, setIsCameraVisible] = React.useState(false);
  const [capturedPhoto, setCapturedPhoto] = React.useState<string | null>(null);
  const [isCapturingMode, setIsCapturingMode] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const handleStoryClick = (id: number) => {
    console.log(`Story with id ${id} clicked`);
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Effect to handle camera stream connection to video element
  React.useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;

      // Ensure video plays when stream is set
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }

    // Cleanup function to stop camera when component unmounts or stream changes
    return () => {
      if (cameraStream && !isCameraVisible) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream, isCameraVisible]);

  const handleAddStory = async () => {
    router.push("/rating");
    // try {
    //   // Reset any previous state
    //   setCapturedPhoto(null);
    //   setIsCameraVisible(true);
    //   setIsCapturingMode(true);

    //   // Solicita permissão e inicia o stream da câmera
    //   const mediaStream = await navigator.mediaDevices.getUserMedia({
    //     video: { facingMode: "user" }, // Use front camera on mobile
    //   });

    //   setCameraStream(mediaStream);
    //   console.log("Câmera ativada com sucesso.");
    // } catch (err) {
    //   console.error("Erro ao acessar a câmera:", err);
    //   alert(
    //     "Não foi possível acessar a câmera. Verifique se você concedeu permissão."
    //   );
    //   setIsCameraVisible(false);
    // }
  };

  const closeCamera = () => {
    // Para o stream da câmera
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraVisible(false);
    setCapturedPhoto(null);
    setIsCapturingMode(true);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas reference not available");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Make sure video is playing and has dimensions
    if (
      video.readyState !== 4 ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      console.error("Video not ready yet");
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        // Convert canvas to data URL (base64 image)
        const photoDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedPhoto(photoDataUrl);
        setIsCapturingMode(false);
        console.log("Foto capturada com sucesso!");
      } catch (error) {
        console.error("Erro ao capturar foto:", error);
      }
    }
  };

  const savePhotoToServer = async (photoDataUrl: string) => {};

  const retakePhoto = () => {
    // Verificar se o stream da câmera ainda está ativo
    if (
      !cameraStream ||
      cameraStream.getTracks().some((track) => !track.enabled)
    ) {
      // Se o stream não estiver ativo, reativar a câmera
      closeCamera();
      handleAddStory();
    } else {
      closeCamera();

      // Se o stream estiver ativo, apenas voltar para o modo de captura
      setCapturedPhoto(null);
      setIsCapturingMode(true);

      // Garantir que o vídeo esteja sendo exibido
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.error("Error playing video after retake:", err);
        });
      }
    }
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      // Fechar a interface da câmera
      closeCamera();
    }
  };

  return (
    <div className="mb-6">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          dragFree: false,
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="-ml-4">
          <CarouselItem className="pl-4 basis-[80px] md:basis-[88px]">
            <AddParty handleAddStory={handleAddStory} />
          </CarouselItem>
          {stories.map((story) => (
            <CarouselItem
              key={story.id}
              className="pl-4 basis-[80px] md:basis-[88px]"
            >
              <StoryCard story={story} handleClick={handleStoryClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Canvas oculto para capturar fotos */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Exibir a câmera em tela cheia */}
      {isCameraVisible && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          {isCapturingMode ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted // Importante para alguns navegadores
              />
              <div className="absolute bottom-10 w-full flex justify-center space-x-4">
                <Button
                  onClick={closeCamera}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-16 w-16"
                >
                  <X />
                </Button>
                <Button
                  onClick={takePhoto}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-16 w-16 bg-white"
                >
                  <Camera className="h-8 w-8 text-black" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <img
                src={capturedPhoto || "/placeholder.svg"}
                alt="Foto capturada"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 w-full flex justify-center space-x-4">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  className="rounded-full bg-secondary backdrop-blur-sm"
                >
                  Tirar novamente
                </Button>
                <Button
                  onClick={confirmPhoto}
                  className="rounded-full bg-primary"
                >
                  Confirmar
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
