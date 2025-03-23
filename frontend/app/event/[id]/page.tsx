import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  // In a real app, you would fetch event data based on the ID
  const eventData = {
    id: params.id,
    title: params.id === "1" ? "Music Festival" : "Food & Wine Festival",
    date: params.id === "1" ? "April 15, 2025" : "April 16, 2025",
    time: "2:00 PM - 10:00 PM",
    location: params.id === "1" ? "Ibirapuera Park" : "Downtown São Paulo",
    description:
      "Join us for an unforgettable experience with amazing performances, great food, and wonderful company.",
    price: "R$ 85,00",
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=192&width=384" alt={eventData.title} fill className="object-cover" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{eventData.title}</h1>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{eventData.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{eventData.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{eventData.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-medium">About this event</h2>
            <p className="text-sm text-muted-foreground">{eventData.description}</p>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">{eventData.price}</p>
              </div>
              <Link href={`/event/${params.id}/booking`}>
                <Button>Select Tickets</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

