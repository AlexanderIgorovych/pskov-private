import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  PhotoService,
  CameraPhoto
} from '../../../core/services/photo.service';

export enum cameraMode {
  capturing,
  captured
}

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private photoService: PhotoService) {}

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('image') image: ElementRef<HTMLImageElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  @Output() captured = new EventEmitter();

  state: cameraMode.capturing | cameraMode.captured = cameraMode.capturing;
  photo: CameraPhoto;
  cameraStatus: boolean;

  ngOnInit() {}

  accessCamera() {
    this.photoService.accessCamera(this.video.nativeElement).then(res => {
      this.cameraStatus = res;
    });
  }

  ngAfterViewInit() {
    this.accessCamera();
  }

  makePhoto() {
    this.photo = this.photoService.drawImage(
      this.video.nativeElement,
      this.canvas.nativeElement
    );
    this.destroyCameraStreams();
    this.state = cameraMode.captured;
  }

  savePhoto() {
    this.captured.emit(this.photo);
  }

  reCapture() {
    this.photo = undefined;
    this.state = cameraMode.capturing;
    setTimeout(() => {
      this.accessCamera();
    }, 200);
  }

  destroyCameraStreams() {
    if (
      this.video &&
      this.video.nativeElement &&
      this.video.nativeElement.srcObject
    ) {
      (this.video.nativeElement.srcObject as MediaStream)
        .getVideoTracks()
        .forEach(track => track.stop());
    }
  }

  ngOnDestroy() {
    this.destroyCameraStreams();
  }
}
