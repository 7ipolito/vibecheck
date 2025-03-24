// src/components/SubmitButton.tsx
import React from "react";
import { Button } from "@/components/ui/button"; // Ajuste de acordo com a sua estrutura de componentes de botão

const SubmitButton: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Button variant="default" size={"lg"}>
        Submit Rating
      </Button>
    </div>
  );
};

export default SubmitButton;
