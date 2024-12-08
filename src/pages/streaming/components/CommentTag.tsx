import React from "react";

interface CommentTagProps {
  date: string;
  username: string;
  content: string;
}
export default function CommentTag({
  date,
  username,
  content,
}: CommentTagProps) {
  return (
    <div className="text-sm">
      <span className="text-zinc-400">{date}</span>{" "}
      <span className="text-green-400">{username}</span>: {content}
    </div>
  );
}
