import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((x) => x.SettingsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((x) => x.ProfileModule),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((x) => x.EditorModule),
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((x) => x.ArticleModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preload all modules; optionally we could
      // implement a custom preloading strategy for just some
      // of the modules (PRs welcome 😉)
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
