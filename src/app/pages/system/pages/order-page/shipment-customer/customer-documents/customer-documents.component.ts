import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IFile, documentTypes } from '../../../../../../core/services/add-car.service';
import { CameraPhoto } from '../../../../../../core/services/photo.service';
import { Subject, merge } from 'rxjs';
import { mergeMapTo, filter, map } from 'rxjs/operators';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../../../core/store/rootStore';
import { ApiService } from '../../../../../../core/http/api.service';
import { SAVE_DOCUMENTS } from '../../../../../../core/store/add-documents/add-documents.actions';

@Component({
  selector: 'app-customer-documents',
  templateUrl: './customer-documents.component.html',
  styleUrls: ['./customer-documents.component.scss']
})
export class CustomerDocumentsComponent implements OnInit {

  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner;

  @Output() weighNext = new EventEmitter();

  userDocuments  : IFile[] = [];

  areFilled         : boolean = false;
  areDocumentSended : boolean = false;

  filesChanged = new Subject();

  generateFile = (data, source: IFile[]) => {

    const file = {
      name  : data.result.source.name,
      url   : data.result.img,
      type  : 0,
      source: data.result.source,
      document_type : data.key
    };

    source.push(file);
    this.filesChanged.next();
  }

  sendDocs = () => {
    console.log(this.userDocuments)
    const data = {
      type : documentTypes.order,
      documents : [
        ...this.userDocuments
      ]
    }

    const arrOfKeys = [];

    for (let element in data.documents) {
      arrOfKeys.push(data.documents[element].document_type)
    }

    data['keys'] = arrOfKeys;

    this.ngRedux.dispatch({ type : SAVE_DOCUMENTS, payload : data })
    this.areDocumentSended = true;
  }

  nextWeigh = () => this.weighNext.emit(1)

  individualEntity = () => this.pickedPartner.pipe(filter((res: any) => res && res.type === 0));

  orderInividual = () => {
    return this.filesChanged.pipe(
      map(res => !!this.userDocuments.length
      )
    );
  };

  areDocumentOrdrer = () => merge (
    this.orderInividual()
  )

  deletePhoto = (index: number, source: IFile[]) => {
    source.splice(index, 1);
    this.filesChanged.next();
  }

  constructor(private apiService : ApiService, private ngRedux : NgRedux<IAppState>) { }

  ngOnInit() {
    this.areDocumentOrdrer().subscribe((res: boolean) => {
      this.areFilled = res;
    });
  }

}
