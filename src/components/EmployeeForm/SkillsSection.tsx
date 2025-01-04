import React, { useState } from 'react';
import Select from 'react-select';
import { Plus, X, Star } from 'lucide-react';
import { Skill } from '../../types';

interface SkillsSectionProps {
  skills: Skill[];
  availableSkills: Array<{ id: string; name: string; category: string }>;
  onUpdate: (skills: Skill[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  skills, 
  availableSkills,
  onUpdate 
}) => {
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleAddSkill = () => {
    if (selectedSkill && !skills.some(s => s.name === selectedSkill)) {
      onUpdate([...skills, { name: selectedSkill, isFavorite: false }]);
      setSelectedSkill('');
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    onUpdate(skills.filter(skill => skill.name !== skillName));
  };

  const handleToggleFavorite = (skillName: string) => {
    onUpdate(
      skills.map(skill =>
        skill.name === skillName
          ? { ...skill, isFavorite: !skill.isFavorite }
          : skill
      )
    );
  };

  const groupedOptions = availableSkills.reduce((acc, { name, category }) => {
    const group = acc.find(g => g.label === category);
    if (group) {
      group.options.push({ value: name, label: name });
    } else {
      acc.push({
        label: category,
        options: [{ value: name, label: name }]
      });
    }
    return acc;
  }, [] as { label: string; options: { value: string; label: string }[] }[]);

  return (
    <div className="mt-6">
      <h4 className="font-medium text-sm text-gray-700 mb-2">Skills</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`flex items-center px-3 py-1 rounded-full ${
              skill.isFavorite
                ? 'bg-orange-100 text-orange-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            <span>{skill.name}</span>
            <button
              type="button"
              onClick={() => handleToggleFavorite(skill.name)}
              className={`ml-2 ${
                skill.isFavorite
                  ? 'text-orange-600 hover:text-orange-800'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <Star className={`w-4 h-4 ${skill.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill.name)}
              className={`ml-2 ${
                skill.isFavorite
                  ? 'text-orange-600 hover:text-orange-800'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Select
          options={groupedOptions}
          value={selectedSkill ? { value: selectedSkill, label: selectedSkill } : null}
          onChange={(option) => setSelectedSkill(option?.value || '')}
          placeholder="Select a skill..."
          className="flex-1"
          isClearable
          isSearchable
        />
        <button
          type="button"
          onClick={handleAddSkill}
          disabled={!selectedSkill}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};