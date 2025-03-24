interface HeaderProps {
  location: string;
}

export default function Header({ location }: HeaderProps) {
  return (
    <div className="flex items-center space-x-2">
      <p>Your are in</p>
      <h1 className="text-2xl font-bold">{location}</h1>
    </div>
  );
}
