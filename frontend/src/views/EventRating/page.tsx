"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/uploadthing";
import { ArrowLeft, Trash } from "lucide-react";

const CadastrarEvento: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState(false);

  const router = useRouter();

  const handleImageUploadComplete = (res: any) => {
    setUploadError(false);
    setImagemUrl(res[0].fileUrl); // Supondo que `fileUrl` é a chave correta
    console.log("Imagem carregada:", res);
  };

  const handleImageUploadError = (error: Error) => {
    console.error("Erro no upload:", error);
    setUploadError(true);
    alert(`Erro ao carregar a imagem: ${error.message}`);
  };

  const handleSubmit = async () => {
    if (!imagemUrl) {
      alert("Por favor, envie uma imagem para o evento.");
      return;
    }

    try {
      const userData = { name: titulo, image: imagemUrl };
      console.log("Dados do evento:", userData);
      // Chame sua função de API para salvar os dados, como createSimplePost(userData)
      alert("Evento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar o evento:", error);
      alert("Erro ao cadastrar o evento. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 relative">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6">
        {/* Botão de voltar */}
        <button
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors pb-4"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        {/* Componente de upload de imagem */}
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <img
              src={imagemUrl!}
              width={150}
              alt="Imagem do Evento"
              className="rounded-md shadow-md"
            />
          </div>

          {uploadError && (
            <span role="errorImageRole" className="text-red-500">
              Erro ao carregar a imagem. Tente novamente.
            </span>
          )}

          {imagemUrl && (
            <button
              onClick={() => setImagemUrl(null)} // Limpar a URL da imagem
              className="mt-4 text-blue-500 flex items-center"
            >
              <Trash className="mr-2 w-5 h-5 text-red-700" />
              Limpar imagem
            </button>
          )}
        </div>

        {/* Input do título */}
        <div className="mb-6">
          <Label htmlFor="titulo" className="block mb-2">
            Título do Evento
          </Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título do evento"
            required
          />
        </div>

        {/* Botão de enviar */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default CadastrarEvento;
