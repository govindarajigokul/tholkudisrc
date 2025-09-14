import { BuildConfig } from '../config/build-config.interface';

export const environment: Partial<BuildConfig> = {
  production: true,

  // Angular SSR (Server Side Rendering) settings
  ssr: {
    enabled: false,
    enablePerformanceProfiler: false,
    inlineCriticalCss: false,
    transferState: true,
    replaceRestUrl: false,
    paths: [ '/home', '/items/', '/entities/', '/collections/', '/communities/', '/bitstream/', '/bitstreams/', '/handle/', '/reload/' ],
    enableSearchComponent: false,
    enableBrowseComponent: false,
  },
};