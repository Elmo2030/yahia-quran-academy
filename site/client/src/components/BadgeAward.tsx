// =============================================================================
// BadgeAward — the badge a child actually receives.
//
// The keepsake and the badge used to sit on the page from the moment it opened,
// so there was nothing to earn: a child could read the reward before answering
// anything. It is hidden until the answer is right, and when it appears it is a
// drawn medal rather than a line of text — the ribbon, the rosette, and the name
// of what was won.
//
// Drawn rather than a file: there are seventy-seven of these across the creed
// and the Seerah, and none of them should cost a download or wait on artwork.
// =============================================================================

const RIBBON = "#556B2F";

export function BadgeAward({
  icon, badge, keepsake, note, label,
}: {
  /** The card's own emoji, shown in the middle of the medal. */
  icon?: string;
  badge: string;
  keepsake?: string;
  note?: string;
  label: string;
}) {
  // The Seerah stores its badges with the word "وسام" already in front, while
  // the creed stores the name alone. The label above it says which it is, so
  // strip the prefix rather than printing it twice.
  const name = badge.replace(/^\s*(وسام|Badge)\s*[:：]\s*/, "");

  return (
    <div className="badge-award" role="img" aria-label={`${label}: ${name}`}>
      <svg className="badge-award__medal" viewBox="0 0 120 150" aria-hidden="true" focusable="false">
        <path d="M42 78 L28 138 L60 122 L92 138 L78 78 Z" fill={RIBBON} />
        <path d="M42 78 L28 138 L60 122 Z" fill="#3f5222" />
        <circle cx="60" cy="62" r="52" fill="#d4af37" />
        <circle cx="60" cy="62" r="44" fill="#f0d484" />
        <circle cx="60" cy="62" r="37" fill="#fffdf5" />
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={60 + Math.cos(angle) * 48}
              cy={62 + Math.sin(angle) * 48}
              r="3.2"
              fill="#c39c2b"
            />
          );
        })}
        {icon && (
          <text x="60" y="62" textAnchor="middle" dominantBaseline="central" fontSize="34">
            {icon}
          </text>
        )}
      </svg>

      <div className="badge-award__text">
        <span className="badge-award__label">{label}</span>
        <b>{name}</b>
        {keepsake && <span className="badge-award__keepsake">{keepsake}</span>}
        {note && <small>{note}</small>}
      </div>
    </div>
  );
}

export default BadgeAward;
