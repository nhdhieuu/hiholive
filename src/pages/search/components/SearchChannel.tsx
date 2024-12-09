export default function SearchChannel() {
  return (
    <div className="flex items-center gap-4 p-4 max-w-xl">
      <img
        src="https://placehold.co/600x400"
        alt="Channel avatar"
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold mb-1">Cao Hoàng</h2>
        <p className="text-muted-foreground">917,3 N người theo dõi</p>
      </div>
    </div>
  );
}
