import { ClientContent } from "@/components/ClientContent";
import client from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import { Rating } from "@smastrom/react-rating";

const Page = async () => {
  return (
    <div className="bg-white text-black min-h-full p-5">
      <ClientContent />
    </div>
  );
};

export default Page;
