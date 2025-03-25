import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Definindo o tipo correto para 'story'
export const StoryCard = ({
  story,
  handleClick,
}: {
  story: {
    id: number;
    username: string;
    avatar: string;
    viewed: boolean;
  };
  handleClick: (id: number) => void;
}) => {
  return (
    <button
      onClick={() => handleClick(story.id)}
      className="flex flex-col items-center space-y-1"
    >
      <div
        className={`rounded-full p-[2px] ${
          story.viewed
            ? "bg-gray-200"
            : "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
        }`}
      >
        <Avatar className="w-16 h-16 border-2 border-white">
          <AvatarImage src={story.avatar} alt={story.username} />
          <AvatarFallback>
            {story.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <span className="text-xs truncate w-full text-center">
        {story.username}
      </span>
    </button>
  );
};
