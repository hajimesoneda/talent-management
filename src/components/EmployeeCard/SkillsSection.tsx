import React from 'react';
import { Skill } from '../../types';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => (
  <div className="mt-4">
    <h4 className="font-medium text-sm text-gray-700 mb-2">Skills</h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.name}
          className={`px-2 py-1 text-xs rounded-full ${
            skill.isFavorite
              ? 'bg-orange-100 text-orange-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {skill.name}
        </span>
      ))}
    </div>
  </div>
);