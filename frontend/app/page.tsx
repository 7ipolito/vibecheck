import { ClientContent } from "@/components/ClientContent";
import client from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import { Rating } from "@smastrom/react-rating";

const Home = async () => {
  console.log("Server Rendering Works!");
  return (
    <div className="bg-white text-black min-h-full p-5">
      <ClientContent />
      <p>From the Server Side!</p>
    </div>
  );
};

export default Home;
