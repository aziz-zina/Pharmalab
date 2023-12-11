import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const input = document.getElementById('first_name');

function handleEvent(event: Event) {
  const target = event.target as HTMLInputElement;

  console.log(target.value);
}

input?.addEventListener('input', handleEvent);
