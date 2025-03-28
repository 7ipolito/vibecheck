// components/WorldIDVerification.tsx
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useContract } from "../../hooks/useContract";

export const WorldIDVerification = () => {
  const contract = useContract();

  const onSuccess = async (proof: ISuccessResult) => {
    try {
      const tx = await contract.verifyAndPay(
        proof.merkle_root,
        proof.nullifier_hash,
        proof.proof
      );
      await tx.wait();
      console.log("Verificação concluída!");
    } catch (error) {
      console.error("Erro na verificação:", error);
    }
  };

  return (
    <div>
      <IDKitWidget
        action={process.env.NEXT_PUBLIC_WLD_ACTION!}
        signal="my_signal"
        onSuccess={onSuccess}
        app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
      >
        {({ open }) => <button onClick={open}>Verificar com World ID</button>}
      </IDKitWidget>
    </div>
  );
};
