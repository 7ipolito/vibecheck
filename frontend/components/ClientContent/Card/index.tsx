import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function Card() {
  return (
    <Card className="overflow-hidden rounded-xl border-2">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src="https://instagram.fcgh11-1.fna.fbcdn.net/v/t51.2885-19/132317866_1348146018881168_1138802133276996261_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fcgh11-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QGOG_sA8KVwKapNurJzjPBKOPWiCvW-cjadayQO55piuadJHpPCY0lD4CjLwEduvGY&_nc_ohc=9p6-WCpZvDcQ7kNvgFCmIf-&_nc_gid=-yLi9Gl0RdzgSHZHZAyLsw&edm=AEYEu-QBAAAA&ccb=7-5&oh=00_AYHClSQEYNmFs0gQpQJQL7xq-haCJ_YrSgcOREWjBIaFgQ&oe=67E66D70&_nc_sid=ead929"
            alt="Evento 1"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-white text-sm font-medium">Show ao vivo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default index;
