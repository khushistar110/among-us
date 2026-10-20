import React from 'react';
import { Hero } from '../components/Hero';
import { OverviewSection } from '../components/OverviewSection';
import { ComplianceSection } from '../components/ComplianceSection';
import { Footer } from '../components/Footer';

interface HomeViewProps {
  onExplore: () => void;
  onBookDemo: () => void;
  onSelectComponent: (name: string, data: any) => void;
  onNavigateSection?: (route: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onExplore,
  onBookDemo,
  onSelectComponent,
}) => {
  return (
    <div className="w-full">
      {/* Hero Section (12-Column Split Grid + 3D Isometric Mine Canvas) */}
      <Hero
        onExplore={onExplore}
        onBookDemo={onBookDemo}
        onSelectComponent={onSelectComponent}
      />

      {/* Core Suite // Features Section with 3 Bookmark Ribbon Cards */}
      <OverviewSection />

      {/* Governance // Statutory DGMS & Environmental Compliance */}
      <ComplianceSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};
