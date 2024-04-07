import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadStateService {

  private imagesLoaded: boolean = false;

  setImagesLoaded(loaded: boolean): void {
    this.imagesLoaded = loaded;
  }

  getImagesLoaded(): boolean {
    return this.imagesLoaded;
  }
}
