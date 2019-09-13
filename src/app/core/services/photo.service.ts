import { Injectable } from '@angular/core';

export interface CameraPhoto {
  img: string;
  source: Blob;
}
@Injectable()
export class PhotoService {
  constructor() {}

  accessCamera(video: HTMLVideoElement): Promise<boolean> {
    return new Promise((res, rej) => {
      (navigator as any).getUserMedia =
        navigator.getUserMedia ||
        (navigator as any).webkitGetUserMedia ||
        (navigator as any).mozGetUserMedia ||
        (navigator as any).msGetUserMedia;

      navigator.getUserMedia(
        {
          video: true
        },
        stream => {
          res(true);
          video.srcObject = stream;
          video.play();
        },
        err => {
          res(false);
          console.error(err, status);
        }
      );
    });
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  drawImage(
    video: HTMLVideoElement,
    hidden_canvas: HTMLCanvasElement
  ): CameraPhoto {
    const width = video.videoWidth,
      height = video.videoHeight,
      context = hidden_canvas.getContext('2d');

    hidden_canvas.width = width;
    hidden_canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    const img = hidden_canvas.toDataURL('image/png');

    const source = this.dataURItoBlob(img);

    const photo = {
      img,
      source
    };
    return photo;
  }

  generateCameraImageFromInput(event): Promise<CameraPhoto> {
    return new Promise((res, reject) => {
      const reader = new FileReader();
      reader.onload = function() {
        const img       = reader.result as string;
        const source    = event.target.files[0];
        const typeDocs  = event.target.id;

        const photo = {
          img,
          source
        };
        res(photo);
      };
      reader.readAsDataURL(event.target.files[0]);
    });
  }
}
