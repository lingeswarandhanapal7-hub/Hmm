import { Users, Award } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

export default function Team() {
  return (
    <section className="team-section" id="team" aria-labelledby="team-heading">
      <div className="container">
        <div className="team-header">
          <div className="section-kicker">
            <span>The Creators</span>
          </div>
          <h2 id="team-heading" className="team-title">
            Built by Gear5coders
          </h2>
          <p className="team-subtitle">
            An engineering team committed to breaking language barriers and returning dignity to public document comprehension.
          </p>
        </div>

        <div className="team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="team-card paper-sheet">
              <div className="team-avatar-wrap">
                <div className="team-avatar-initials" aria-hidden="true">
                  {member.initials}
                </div>
                <div className="team-badge-circle" title="Gear5coders Contributor">
                  <Award size={12} />
                </div>
              </div>

              <div className="team-card-info">
                <h3 className="team-member-name">{member.name}</h3>
                <div className="team-member-role">{member.role}</div>
                <p className="team-member-focus">{member.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
