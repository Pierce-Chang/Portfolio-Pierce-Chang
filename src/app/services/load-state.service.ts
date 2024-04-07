import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadStateService {

  private static readonly IMAGES_LOADED_KEY = 'imagesLoaded';

  checkImagesLoadedStatus(): void {
    const imagesLoaded = sessionStorage.getItem(LoadStateService.IMAGES_LOADED_KEY);
    if (imagesLoaded) {
      this.setImagesLoaded(true);
    } else {
      this.setImagesLoaded(false);
    }
  }

  setImagesLoaded(loaded: boolean): void {
    sessionStorage.setItem(LoadStateService.IMAGES_LOADED_KEY, loaded ? 'true' : 'false');
  }

  getImagesLoaded(): boolean {
    const imagesLoaded = sessionStorage.getItem(LoadStateService.IMAGES_LOADED_KEY);
    return imagesLoaded === 'true';
  }
}
