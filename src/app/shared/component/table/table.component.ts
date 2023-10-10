import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { Table } from 'src/app/model/component/table';
import { Label } from 'src/app/config/label';
import { CommonModule } from '@angular/common';
import { Table as mTable } from '../../module/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ...mTable],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() settingTable: Table = {};
  @Output() showActionEvent = new EventEmitter<any>();
  @Output() changePageIndex = new EventEmitter<any>();
  @Output() changePageSize = new EventEmitter<any>();
  @Output() changeSort = new EventEmitter<any>();
  @Output() changeSelection = new EventEmitter<any>();
  @Output() changeUnselection = new EventEmitter<any>();
  @Output() changeSelectionAll = new EventEmitter<any>();
  @Output() clickLinkRow = new EventEmitter<any>();

  @ViewChild('paginator', { static: false }) public paginator!: any;
  @ViewChild('table') public table!: any;

  LABEL: any;
  showGlobal = true;
  dataTable: any;
  countHeaders: any;
  no = 0;
  dataKey = '';
  constructor() {
    this.LABEL = Label;
  }

  ngOnInit(): void {
    this.dataKey = this.settingTable.datakey ? this.settingTable.datakey : 'id';
    // this.skeletonData(this.settingTable.config.loading);
    this.countHeaders = this.settingTable.headers.length + 2;
    this.settingTable.config.numbering =
      typeof this.settingTable.config.numbering !== 'undefined'
        ? this.settingTable.config.numbering
        : true;
    this.settingTable.config.isPaging =
      typeof this.settingTable.config?.isPaging !== 'undefined'
        ? this.settingTable.config?.isPaging
        : true;
  }

  ngOnChanges(changes: any): void {
    if (this.settingTable.config?.page === 1) {
      this.no = 0;
      if (this.paginator && this.paginator?.paginatorState?.page + 1 !== this.settingTable.config?.page) {
        this.paginator.changePage(0);
      }
    }

    if (this.settingTable.config?.clearAll) {
      if (this.table) {
        this.table.selection = [];
      }
    }

    if (this.settingTable.config?.loading) {
      this.skeletonData();
    }
  }

  skeletonData(): void {
    for (let i = 0; i < 10; i++) {
      this.settingTable.column.push({});
    }
  }

  global(action: string, data?: any, col?: any): void {
    this.showGlobal = false;
    this.dataTable = {
      showGlobal: this.showGlobal,
      actions: action,
      dataIndex: data,
      colName: col ? col : '',
    };
    this.showActionEvent.emit(this.dataTable);
  }

  pageIndexChange($event: any): void {
    this.no = $event.first;
    this.changePageIndex.emit($event);
  }

  getToolTip(value: any): string {
    let result = '';
    if (value === 'EDIT') {
      result = 'pi pi-pencil';
    }
    if (value === 'DETAIL') {
      result = 'pi pi-eye';
    }
    return result;
  }

  getWidth($event: any): string {
    let result = '';
    if (!this.settingTable.column.length && this.settingTable.responseIfNull) {
      result = 'isNull';
    }
    if (this.settingTable.column.length && this.settingTable.smallWidth) {
      result = 'responsive-column-sm';
    }
    if (this.settingTable.column.length && !this.settingTable.smallWidth && !this.settingTable.calendarTable) {
      result = 'responsive-column-md';
    }
    if (this.settingTable.column.length && this.settingTable.calendarTable) {
      if ($event?.value === this.LABEL.process || $event?.value === this.LABEL.prev_process) {
        result = 'responsive-calendar-table-md';
      } else {
        result = 'responsive-calendar-table-sm';
      }
    }
    return result;
  }

  pageSizeChange($event: any): void {
    this.changePageSize.emit($event);
  }

  sortChange($event: any): void {
    this.changeSort.emit($event);
  }

  onRowSelect($event: any): void {
    this.changeSelection.emit($event);
  }

  onRowUnselect($event: any): void {
    this.changeUnselection.emit($event);
  }

  onHeaderCheckbox($event: any): void {
    this.changeSelectionAll.emit($event);
  }

  onClickedRowLink(selected: any, f: any): void {
    this.clickLinkRow.emit({ data: selected, field: f });
  }

  counter(i: number): any {
    return new Array(i);
  }
}
