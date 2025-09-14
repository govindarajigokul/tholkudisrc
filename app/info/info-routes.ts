import {
  Route,
  Routes,
} from '@angular/router';

import { environment } from '../../environments/environment';
import { i18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { notifyInfoGuard } from '../core/coar-notify/notify-info/notify-info.guard';
import { feedbackGuard } from '../core/feedback/feedback.guard';
import { hasValue } from '../shared/empty.util';
import { ThemedEndUserAgreementComponent } from './end-user-agreement/themed-end-user-agreement.component';
import { ThemedFeedbackComponent } from './feedback/themed-feedback.component';
import {
  COAR_NOTIFY_SUPPORT,
  ABOUT_PATH,
  CREDITS_PATH,
  HELP_PATH,
  END_USER_AGREEMENT_PATH,
  FEEDBACK_PATH,
  PRIVACY_PATH,
} from './info-routing-paths';
import { NotifyInfoComponent } from './notify-info/notify-info.component';
import { ThemedAboutComponent } from './about/themed-about.component';
import { ThemedCreditsComponent } from './credits/themed-credits.component';
import { ThemedHelpComponent } from './help/themed-help.component';
import { ThemedPrivacyComponent } from './privacy/themed-privacy.component';


export const ROUTES: Routes = [
  {
    path: FEEDBACK_PATH,
    component: ThemedFeedbackComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'info.feedback.title', breadcrumbKey: 'info.feedback' },
    canActivate: [feedbackGuard],
  },
  environment.info.enableEndUserAgreement ? {
    path: END_USER_AGREEMENT_PATH,
    component: ThemedEndUserAgreementComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'info.end-user-agreement.title', breadcrumbKey: 'info.end-user-agreement' },
  } : undefined,

  environment.info.enableAboutStatement ? {
    path: ABOUT_PATH,
    component: ThemedAboutComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'info.about.title', breadcrumbKey: 'info.about' },
  } : undefined,

  environment.info.enableCreditsStatement ? {
    path: CREDITS_PATH,
    component: ThemedCreditsComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'info.credits.title', breadcrumbKey: 'info.credits' },
  } : undefined,

  environment.info.enableHelpStatement ? {
    path: HELP_PATH,
    component: ThemedHelpComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'info.help.title', breadcrumbKey: 'info.help' },
  } : undefined,

  environment.info.enablePrivacyStatement ? {
    path: PRIVACY_PATH,
    component: ThemedPrivacyComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'info.privacy.title', breadcrumbKey: 'info.privacy' },
  } : undefined,
  
  
  environment.info.enableCOARNotifySupport ? {
    path: COAR_NOTIFY_SUPPORT,
    component: NotifyInfoComponent,
    canActivate: [notifyInfoGuard],
    resolve: {
      breadcrumb: i18nBreadcrumbResolver,
    },
    data: {
      title: 'info.coar-notify-support.title',
      breadcrumbKey: 'info.coar-notify-support',
    },
  } : undefined,
].filter((route: Route) => hasValue(route));
