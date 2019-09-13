import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { SaveReasonsType } from '../../../../../../../core/store/responsible-save/responsible-save.actions';
import { ResponsibleSaveService } from '../../../../../shared/services/responsible-save.service';

@Component({
  selector: 'app-reason-component',
  templateUrl: './reason-component.component.html',
  styleUrls: ['./reason-component.component.scss']
})
export class ReasonComponentComponent implements OnInit {

  @Output() nextStep = new EventEmitter();

  isChecked = false;
  isButtonValid = false;

  reasonsList = [
    {
      name  : 'Отсутствие ломосдатчика',
      value : false
    },
    {
      name  : `Отсутствие документов у ломосдатчика`,
      value : false,
    },
    {
      name  : 'Некачественный лом',
      value : false
    },
    {
      name  : 'Радиация',
      value : false,
    },
    {
      name  : 'Наличие взрывоопасного лома военного происхождения',
      value : false
    },
    {
      name  : 'Иное',
      value : false
    }
  ]

  constructor(private ngRedux : NgRedux<IAppState>, private responsibleService : ResponsibleSaveService) { }

  onChangeCheckbox = e => {

    this.isChecked = !this.isChecked;

    this.reasonsList[e] = {
      ...this.reasonsList[e],
      value : !this.reasonsList[e].value
    }

    const isCheckedBool = this.reasonsList.map(element => element.value);

    isCheckedBool.indexOf(true) !== -1 ? this.isButtonValid = true : this.isButtonValid = false;
  }

  onSubmitReasons = () => {

    const mappedReason = this.reasonsList
      .map((reason, i) => reason.value === true ? i : null)
      .filter((answer) => answer !== null)

    this.isButtonValid = mappedReason.indexOf(null) !== -1 ? false : true

    // this.responsibleService.sendReasonsTypes(mappedReason)
    //   .subscribe(() => this.ngRedux.dispatch(new SaveReasonsType(mappedReason).createAction()))

    this.nextStep.emit();
  }

  ngOnInit() {
  }

}
