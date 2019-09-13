import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import {
  IFile,
  AddCarService,
  documentTypes
} from '../../../../../../core/services/add-car.service';
import { CameraPhoto } from '../../../../../../core/services/photo.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SkipDocumentsComponent } from '../../../../../../shared/components/skip-documents/skip-documents.component';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../../core/store/rootStore';
import {
  filter,
  mapTo,
  mergeMapTo,
  tap,
  map,
  defaultIfEmpty
} from 'rxjs/operators';
import { merge, Subject, of } from 'rxjs';
import { unsubscribeAll } from '../../../../../../core/untils';
import {
  SaveDocuments,
  SAVE_DOCUMENTS,
  SaveDocumentsStore
} from '../../../../../../core/store/add-documents/add-documents.actions';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  filesTtn: IFile[] = [];
  files: IFile[] = [];
  filesForeign: IFile[] = [];
  filesRegistration: IFile[] = [];
  areFilled = false;
  subscriptions = [];
  isDocumentSended : boolean = false;

  skipDialog: MatDialogRef<SkipDocumentsComponent>;
  constructor(
    protected carService: AddCarService,
    private dialog: MatDialog,
    private ngRedux: NgRedux<IAppState>
  ) {}
  @Output() nextStep = new EventEmitter();
  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner;
  filesChanged = new Subject();

  legalEntity() {
    const self = this;
    return this.filesChanged.pipe(
      mergeMapTo(
        this.pickedPartner.pipe(
          filter((res: any) => res && res.type === 1),
          map(res => !!self.filesTtn.length)
        )
      )
    );
  }

  individualEntity() {
    return this.pickedPartner.pipe(filter((res: any) => res && res.type === 0));
  }

  localIndividual() {
    const self = this;
    return this.filesChanged.pipe(
      mergeMapTo(
        this.individualEntity().pipe(
          filter((res: any) => {
            return res && res.local === true;
          }),
          map(res => {
            return !!self.files.length;
          })
        )
      )
    );
  }

  foreignIndividual() {
    const self = this;
    return this.filesChanged.pipe(
      mergeMapTo(
        this.individualEntity().pipe(
          filter((res: any) => {
            return res && res.local === false;
          }),
          map(res => {
            return (
              !!self.filesForeign.length && !!self.filesRegistration.length
            );
          })
        )
      )
    );
  }

  areDocumentsFilled() {
    const self = this;
    return merge(
      this.legalEntity.call(self),
      this.localIndividual.call(self),
      this.foreignIndividual.call(self)
    );
  }

  generateFile(data, source) {
    const file = {
      name: data.result.source.name,
      url: data.result.img,
      type: 0,
      document_type : data.key,
      source: data.result.source
    };

    source.push(file);
    this.filesChanged.next();
  }
  deletePhoto(index: number, source: IFile[]) {
    source.splice(index, 1);
    this.filesChanged.next();
  }

  invokeSkipModal() {
    this.skipDialog = this.dialog.open(SkipDocumentsComponent);
    this.skipDialog.componentInstance.cancel.subscribe(_ => {
      this.skipDialog.close();
    });
    this.skipDialog.componentInstance.skip.subscribe(_ => {
      this.skipDialog.close();
      this.nextStep.emit();
    });
  }

  nextStepHandle = () => this.nextStep.emit();

  sendDocuments() {
    const data = {
      type: documentTypes.partner,
      documents: [
        ...this.files,
        ...this.filesTtn,
        ...this.filesForeign,
        ...this.filesRegistration
      ],
    };

    const arrOfkeys = [];

    for (let element in data.documents ){
      arrOfkeys.push(data.documents[element].document_type)
    };

    data['keys'] = arrOfkeys;

    const savePayloadDocs = {
      international_passport : [...this.filesForeign],
      ttn      : [...this.filesTtn],
      photo    : [...this.filesRegistration],
      passport : [...this.files]
    }

    new Promise(resolve => {
      this.ngRedux.dispatch({ type: SAVE_DOCUMENTS, payload: data });
      this.ngRedux.dispatch(new SaveDocumentsStore(savePayloadDocs).createAction());
      resolve();
    })
    .then(() => this.isDocumentSended = true);

  }

  ngOnInit() {
    const change = this.areDocumentsFilled().subscribe((res: boolean) => {
      this.areFilled = res;
    });
    this.subscriptions.push(change);
  }

  ngOnDestroy() {
    unsubscribeAll(this.subscriptions);
  }
}
