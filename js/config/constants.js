const GITHUB_API = 'https://api.github.com';
const GITHUB_SITE = 'https://github.com';

export const DATA_STORE_TYPES = {
  popular: 'popular',
  trending: 'trending',
};

export const ROUTES = {
  popular: 'Popular',
  popularIndex: 'PopularIndex',
  trending: 'Trending',
  favorite: 'Favorite',
  details: 'Details',
  my: 'My',
};

export const MY_MENUS = {
  customLanguage: {
    name: 'CustomLanguage',
    icon: 'star-outline',
  },
  sortLanguage: {
    name: 'sortLanguage',
    icon: 'star-outline',
  },
  customTheme: {
    name: 'customTheme',
    icon: 'star-outline',
  },
  customTag: {
    name: 'customTag',
    icon: 'star-outline',
  },
  sortTag: {
    name: 'sortTag',
    icon: 'star-outline',
  },
  removeTag: {
    name: 'removeTag',
    icon: 'star-outline',
  },
  aboutAuthor: {
    name: 'aboutAuthor',
    icon: 'star-outline',
  },
  about: {
    name: 'about',
    icon: 'star-outline',
  },
  tutorial: {
    name: 'tutorial',
    icon: 'star-outline',
  },
  feedback: {
    name: 'feedback',
    icon: 'star-outline',
  },
  share: {
    name: 'share',
    icon: 'star-outline',
  },
};

export const POPULAR_TABS = [
  'All',
  'NodeJS',
  'C#',
  'React',
  'React Native',
  'Android',
  'iOS',
  'Java',
];

export const TRENDING_TABS = [
  'All',
  'NodeJS',
  'C#',
  'Android',
  'iOS',
  'React',
  'React Native',
];

export const THEME = {
  black: 'black',
  blue: 'blue',
  tomato: 'tomato',
};

export const GITHUB = {
  base: 'https://api.github.com',
  repos: `${GITHUB_API}/search/repositories?q=`,
  queryStr: '&sort=stars',
  trending: `${GITHUB_SITE}/trending`,
  trendingQuery: '?since=daily',
};

export const STYLES = {
  sizes: {
    xxs: 'xxs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    xxl: 'xxl',
  },
  weights: {
    xxs: '300',
    xs: '400',
    sm: '500',
    md: '600',
    lg: '700',
    xl: '800',
    xxl: '900',
  },
  margins: {
    ml: 'ml',
    mr: 'mr',
    mx: 'mx',
    mt: 'mt',
    mb: 'mb',
    my: 'my',
    ma: 'ma',
  },
};
