export type ProjectCategory = 
  | 'all'
  | 'brand-architecture'
  | 'performance-growth'
  | '3d-spatial'
  | 'creative-direction';

export interface ProjectMetric {
  label: string;
  value: string;
  baseline?: string;
  change?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  summary: string;
  challenge: string;
  strategy: string;
  outcome: string;
  metrics: ProjectMetric[];
  deliverables: string[];
  imageUrl: string;
  aspectRatio?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface UploadedAsset {
  id: string;
  url: string;
  filename: string;
  title: string;
  size: number;
  createdAt: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  heroImage: string;
  contactEmail: string;
}
