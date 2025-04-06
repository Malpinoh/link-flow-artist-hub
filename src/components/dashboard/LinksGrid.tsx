
import { FanLink } from "@/types/fanlink";
import { LinkCard } from "./LinkCard";
import { EmptyState } from "./EmptyState";

interface LinksGridProps {
  fanLinks: FanLink[];
}

export function LinksGrid({ fanLinks }: LinksGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fanLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
      
      {fanLinks.length === 0 && <EmptyState />}
    </div>
  );
}
