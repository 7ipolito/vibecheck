import { Plus } from "lucide-react";
import React from "react";

interface Props {
  handleAddStory: () => void;
}

const AddParty = ({ handleAddStory }: Props) => {
  return (
    <div
      className="flex flex-col items-center space-y-1 cursor-pointer"
      onClick={handleAddStory}
    >
      <div className="rounded-full p-[2px] bg-white border-2 border-dashed border-blue-500">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Plus className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <span className="text-xs truncate w-full text-center">Add story</span>
    </div>
  );
};

export default AddParty;
