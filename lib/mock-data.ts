import { Building2, ClipboardList, FileText, Landmark, Scale, ShieldCheck, LucideIcon } from 'lucide-react';

export interface CategoryInfo {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
}

export const categoryMap: Record<string, CategoryInfo> = {
  rti: {
    key: 'rti',
    title: 'RTI & Information Requests',
    description: 'Turn your question into a clear information request and understand the route ahead.',
    icon: FileText,
    examples: [
      'How do I file an RTI for local project records?',
      'I want information about road repair expenditure in my ward.',
      'How can I request government expenditure records?',
    ],
  },
  complaints: {
    key: 'complaints',
    title: 'Civic Complaints',
    description: 'Find the right starting point for unresolved local civic problems.',
    icon: ClipboardList,
    examples: [
      'Potholes on main road',
      'Garbage has not been collected in my locality.',
      'There is a broken streetlight near my house.',
    ],
  },
  services: {
    key: 'services',
    title: 'Public Services',
    description: 'Understand the steps and authority involved in accessing public services.',
    icon: ShieldCheck,
    examples: [
      'My birth certificate application is delayed.',
      'How do I apply for a public service?',
      'My government service request has not been processed.',
    ],
  },
  procedures: {
    key: 'procedures',
    title: 'Government Procedures',
    description: 'Understand forms, steps, documents and public procedures more clearly.',
    icon: Landmark,
    examples: [
      'What documents are needed for this government application?',
      'What is the process for applying for this certificate?',
      'Where should I submit this application?',
    ],
  },
  development: {
    key: 'development',
    title: 'Local Development Issues',
    description: 'Get structured guidance for roads, drainage, sanitation and local infrastructure.',
    icon: Building2,
    examples: [
      'Potholes on the main road',
      'Open drainage near my locality',
      'Streetlights are not working in my area.',
    ],
  },
  rights: {
    key: 'rights',
    title: 'Citizen Rights',
    description: 'Understand your civic rights, responsibilities and possible escalation routes.',
    icon: Scale,
    examples: [
      'What can I do if my civic complaint is ignored?',
      'How can I request government records?',
      'What is my right to access this public service?',
    ],
  },
};

export const categories: CategoryInfo[] = [
  categoryMap.rti,
  categoryMap.complaints,
  categoryMap.services,
  categoryMap.procedures,
  categoryMap.development,
  categoryMap.rights,
];

export const prompts = ['How do I file an RTI?', 'My municipal complaint is unresolved.', 'How can I get information about a local project?', 'I need to understand a government procedure.'];
export const guidance = { question: 'I want information about a government road project in my area.', category:'Information Request', process:'RTI', intent:'Obtain information from a public authority', text:'You may be able to request records about the road project through an RTI application. A focused request can help you ask for documents such as sanction details, approved estimates, work orders, timelines and inspection records. Start by identifying which public authority is responsible for the road.', steps:['Understand what information you need','Identify the appropriate authority','Prepare the request','Submit the application','Keep the acknowledgement'], sources:[{title:'Right to Information Act, 2005', type:'Legislation', detail:'Section placeholder · Demo source'}, {title:'RTI application guidance', type:'Process guide', detail:'Page placeholder · Demo source'}] };
export const trust = [['Source-backed','See where your information comes from.'],['Simple language','Complex civic processes explained clearly.'],['Action-focused','Know what to do next, not just what the rules say.'],['Privacy-minded','Designed with responsible handling of citizen information.']];

