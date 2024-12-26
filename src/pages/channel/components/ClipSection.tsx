export default function ClipsSection() {
  const clips = [
    { id: 1, title: "Double Kill Highlight", views: "5", time: "1 hour ago" },
    { id: 2, title: "Amazing Play", views: "3", time: "1 hour ago" },
    { id: 3, title: "Best Moment", views: "55", time: "2 days ago" },
    { id: 4, title: "Epic Gameplay", views: "85", time: "2 days ago" },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Featured Clips</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {clips.map((clip) => (
          <div key={clip.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-900" />
            <div className="p-3">
              <h4 className="font-medium truncate">{clip.title}</h4>
              <p className="text-sm text-gray-400">
                {clip.views} views • {clip.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
