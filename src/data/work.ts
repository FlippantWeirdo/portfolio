export type WorkImage = { src: string; alt: string; note?: string; wide?: boolean };

export type WorkProject = {
  slug: string;
  title: string;
  category: string;
  status: string;
  cardText: string;
  intro: string;
  storyIntro?: string;
  role: string;
  stack: string[];
  contribution: string[];
  images: WorkImage[];
  link?: { label: string; url: string };
  secondaryLink?: { label: string; url: string };
  tone: 'nokslock' | 'flamingo' | 'admin' | 'rosie' | 'caxten' | 'qstc';
};

export const work: WorkProject[] = [
  {
    slug: 'nokslock',
    title: 'Nokslock',
    category: 'Flutter · Mobile app',
    status: 'Live on both stores',
    cardText: 'Live on both stores. I built the Android app in Flutter.',
    intro: 'I built Nokslock’s Android app in Flutter, from the interface to working authentication, data, and subscription flows.',
    storyIntro: 'Android mobile development across the complete app experience.',
    role: 'Android mobile developer',
    stack: ['Flutter', 'Android', 'REST APIs', 'RevenueCat'],
    contribution: [
      'Owned the Android mobile development across Nokslock.',
      'Connected the app to REST APIs and built its authentication and data flows.',
      'Implemented in-app subscriptions with RevenueCat and prepared the app for Google Play.',
    ],
    images: [
      { src: '/images/projects/nokslock-add.png', alt: 'Nokslock add item screen' },
      { src: '/images/projects/nokslock-detail.png', alt: 'Nokslock item detail screen' },
    ],
    link: { label: 'View on Google Play', url: 'https://play.google.com/store/apps/details?id=com.nokslock.app' },
    secondaryLink: { label: 'View on the App Store', url: 'https://apps.apple.com/ng/app/nokslock/id6784939511' },
    tone: 'nokslock',
  },
  {
    slug: 'flamingo-live',
    title: 'Flamingo Live',
    category: 'React Native · Mobile marketplace',
    status: 'App coming soon · site live',
    cardText: 'The complete mobile frontend and public website for a live-shopping marketplace.',
    intro: 'I built Flamingo Live’s entire React Native mobile frontend, integrated backend APIs, and built its public website and waitlist.',
    storyIntro: 'The mobile app frontend and the live public website.',
    role: 'Frontend developer · mobile app and website',
    stack: ['React Native', 'TypeScript', 'API integration', 'Web'],
    contribution: [
      'Owned and implemented the full mobile frontend across Flamingo Live.',
      'Integrated backend APIs to connect the interface to working product flows.',
      'Built the shopping, storefront, and product experiences shown here.',
      'Built and launched Flamingo Live’s public website and waitlist.',
    ],
    images: [
      { src: '/images/projects/flamingo-shop.png', alt: 'Flamingo Live shop screen' },
      { src: '/images/projects/flamingo-product.png', alt: 'Flamingo Live product screen' },
      { src: '/images/projects/flamingo-website.png', alt: 'Flamingo Live public website and waitlist', wide: true },
    ],
    link: { label: 'Visit the live website', url: 'https://www.flamingolive.app/' },
    tone: 'flamingo',
  },
  {
    slug: 'flamingo-admin',
    title: 'Flamingo Admin',
    category: 'Web · Admin dashboard',
    status: 'Internal tool',
    cardText: 'The complete frontend for Flamingo’s admin dashboard.',
    intro: 'I built Flamingo Admin’s full web frontend, including its operational and analytics views and the API connections behind them. The figures pictured came from testing.',
    storyIntro: 'The full admin frontend, from the interface to backend API integration.',
    role: 'Frontend developer · complete admin frontend',
    stack: ['React', 'Admin dashboard', 'API integration'],
    contribution: [
      'Owned and implemented the complete admin dashboard frontend.',
      'Connected the interface to backend APIs for administrative workflows.',
      'Built the dashboard and analytics views shown here using testing-period data.',
    ],
    images: [
      { src: '/images/projects/flamingo-admin-dashboard.png', alt: 'Flamingo Admin dashboard with testing data', note: 'Figures shown were accumulated during testing and are not live business metrics.' },
      { src: '/images/projects/flamingo-admin-analytics.png', alt: 'Flamingo Admin analytics screen with testing data', note: 'Figures shown were accumulated during testing and are not live business metrics.' },
    ],
    tone: 'admin',
  },
  {
    slug: 'rosie',
    title: 'Rosie',
    category: 'Mobile app · Website',
    status: 'In development',
    cardText: 'A more personal space for cycle and health tracking.',
    intro: 'Rosie brings cycle and health tracking into a more personal experience. The mobile app and its companion site are being developed together.',
    role: 'Mobile and frontend developer',
    stack: ['Mobile UI', 'Frontend'],
    contribution: ['Worked on the mobile experience.', 'Built the companion website, which is awaiting deployment.'],
    images: [
      { src: '/images/projects/rosie-app.png', alt: 'Rosie mobile avatar screen' },
      { src: '/images/projects/rosie-site.png', alt: 'Rosie website homepage' },
    ],
    tone: 'rosie',
  },
  {
    slug: 'caxten-engineering',
    title: 'Caxten Engineering',
    category: 'Frontend · Website',
    status: 'Live',
    cardText: 'A clear online presence for an engineering team.',
    intro: 'A website that gives Caxten Engineering a clear place to present its work and services online.',
    role: 'Frontend developer',
    stack: ['Frontend', 'Responsive web'],
    contribution: ['Built the public facing website.', 'Designed responsive presentation for the company and its services.'],
    images: [{ src: '/images/projects/caxten.png', alt: 'Caxten Engineering website homepage' }],
    link: { label: 'Visit the website', url: 'https://caxtenengineering.com/' },
    tone: 'caxten',
  },
  {
    slug: 'qstc',
    title: 'QSTC',
    category: 'Frontend · Website',
    status: 'Live',
    cardText: 'A focused website for a specialist business.',
    intro: 'A client website built to make a specialist business easy to understand and explore.',
    role: 'Frontend developer',
    stack: ['Frontend', 'Responsive web'],
    contribution: ['Scoped and built the website.', 'Created responsive pages for a clear public presence.'],
    images: [{ src: '/images/projects/qstc.png', alt: 'QSTC website homepage' }],
    link: { label: 'Visit the website', url: 'https://www.qstcng.com/' },
    tone: 'qstc',
  },
];
