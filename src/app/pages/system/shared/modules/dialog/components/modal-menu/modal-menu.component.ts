import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { OrderActions } from '../../../../../../../core/store/order/order.actions';
import { ActivatedRoute, Router } from '@angular/router';

interface IMenuSubItem {
  type: number;
  label: string;
}

interface IModalMenuItem {
  label: string;
  type?: number;
  subitems?: IMenuSubItem[];
}

const MENU_ITEMS: IModalMenuItem[] = [
  {
    label: 'ПРИЁМКА ОТ ЛОМОСДАТЧИКА',
    subitems: [
      { label: 'ОТВЕТСТВЕННОЕ ХРАНЕНИЕ', type: 0 },
      { label: 'ОФОРМЛЕНИЕ ПСА', type: 1 }
    ]
  },
  { label: 'ПРИЁМКА ПРИ ВНУТРЕННЕМ ПЕРЕМЕЩЕНИИ', type: 2 },
  { label: 'ОТГРУЗКА ПРИ ВНУТРЕННЕМ ПЕРЕМЕЩЕНИИ', type: 3 },
  { label: 'ОТГРУЗКА ПОКУПАТЕЛЮ', type: 4 },
  { label: 'ПЕРЕРАБОТКА НА СТОРОНУ', type: 5 },
  { label: 'ПЕРЕРАБОТКА/СОРТИРОВКА ЛОМА', type: 6 },
  { label: 'ПЕРЕРАБОТКА АЦ', type: 7 },
  { label: 'ИНВЕНТАРИЗАЦИЯ', type: 8 }
];

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent {
  menuItems: IModalMenuItem[] = MENU_ITEMS;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private orderActions: OrderActions,
    public dialogRef: MatDialogRef<ModalMenuComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose(data?) {
    this.dialogRef.close();
  }

  onMenuItemClick(type) {
    this.dialogRef.close(type);
    this.ngRedux.dispatch(this.orderActions.changeOrderType(type));
  }
}
