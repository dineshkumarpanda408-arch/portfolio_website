import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EnvironmentSky } from './EnvironmentSky';
import { CameraController, IslandId } from './CameraController';
import { HomeIsland } from './islands/HomeIsland';
import { ProjectsIsland } from './islands/ProjectsIsland';
import { SkillsIsland } from './islands/SkillsIsland';
import { AchievementsIsland } from './islands/AchievementsIsland';
import { ResearchIsland } from './islands/ResearchIsland';
import { ContactIsland } from './islands/ContactIsland';
import { AIDroneCompanion } from './AIDroneCompanion';
import { Project, Skill, Achievement, ResearchPaper } from '../../config/portfolioConfig';

interface SceneCanvasProps {
  activeIsland: IslandId;
  onSelectIsland: (island: IslandId) => void;
  isNight: boolean;
  isIntro: boolean;
  onIntroComplete: () => void;
  onProjectClick: (project: Project) => void;
  onSkillHover: (skill: Skill | null) => void;
  selectedSkill: Skill | null;
  onAchievementClick: (achievement: Achievement) => void;
  onPaperClick: (paper: ResearchPaper) => void;
  onOpenAIChat: () => void;
  droneGreetingMessage: string;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  activeIsland,
  onSelectIsland,
  isNight,
  isIntro,
  onIntroComplete,
  onProjectClick,
  onSkillHover,
  selectedSkill,
  onAchievementClick,
  onPaperClick,
  onOpenAIChat,
  droneGreetingMessage,
}) => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#0a0d18] outline-none">
      <Canvas
        shadows
        camera={{ position: [0, 45, 60], fov: 45, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Environment, Sky, Fog & Lighting */}
          <EnvironmentSky isNight={isNight} />

          {/* Cinematic Camera Controller */}
          <CameraController
            activeIsland={activeIsland}
            isIntro={isIntro}
            onIntroComplete={onIntroComplete}
          />

          {/* 6 Floating Islands */}
          <HomeIsland
            isActive={activeIsland === 'home'}
            onSelect={() => onSelectIsland('home')}
          />

          <ProjectsIsland
            isActive={activeIsland === 'projects'}
            onSelect={() => onSelectIsland('projects')}
            onProjectClick={onProjectClick}
          />

          <SkillsIsland
            isActive={activeIsland === 'skills'}
            onSelect={() => onSelectIsland('skills')}
            onSkillHover={onSkillHover}
            selectedSkill={selectedSkill}
          />

          <AchievementsIsland
            isActive={activeIsland === 'achievements'}
            onSelect={() => onSelectIsland('achievements')}
            onAchievementClick={onAchievementClick}
          />

          <ResearchIsland
            isActive={activeIsland === 'research'}
            onSelect={() => onSelectIsland('research')}
            onPaperClick={onPaperClick}
          />

          <ContactIsland
            isActive={activeIsland === 'contact'}
            onSelect={() => onSelectIsland('contact')}
          />

          {/* Holographic AI Companion Drone */}
          <AIDroneCompanion
            activeIsland={activeIsland}
            onOpenChat={onOpenAIChat}
            greetingMessage={droneGreetingMessage}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
