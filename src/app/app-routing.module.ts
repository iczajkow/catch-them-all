import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pokemon-list').then((m) => m.PokemonListModule),
  },
  {
    path: 'pageNotFound',
    loadChildren: () => import('./not-found').then((m) => m.NotFoundModule),
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./pokemon-details/pokemon-details.module').then(
        (m) => m.PokemonDetailsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'pageNotFound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
