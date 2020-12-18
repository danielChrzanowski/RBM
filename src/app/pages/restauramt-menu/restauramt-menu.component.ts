import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order-model/order-model';
import { DishService } from 'src/app/services/dish-service/dish.service';

@Component({
  selector: 'app-restauramt-menu',
  templateUrl: './restauramt-menu.component.html',
  styleUrls: ['./restauramt-menu.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class RestauramtMenuComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Order>;

  tableDef: Array<any> = [
    {
      key: 'danie_id',
      header: 'ID'
    }, {
      key: 'nazwa',
      header: 'Nazwa'
    },
    {
      key: 'kategoria',
      header: 'Kategoria'
    },
    {
      key: 'cena',
      header: 'Cena'
    }
  ];
  columnsToDisplay = ['danie_id', 'nazwa', 'kategoria', 'cena'];
  expandedElement: Order | null;

  constructor(
    private dishService: DishService) {
  }

  ngOnInit() {
    this.findAllDishes();
  }

  findAllDishes() {
    this.dishService.findAllDishes()
      .subscribe(
        data => {
          // console.log(data);
          this.dataSource = new MatTableDataSource<Order>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => console.log(error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [
    { data: [121, 184, 218, 91, 48, 55, 116, 78], label: 'Nazwa labelki' }
  ];
  public chartLabels: Array<any> = ['Mięso drobiowe', 'Mięso wołowe', 'Mięso wieprzowe', 'Wege', 'Zupa', 'Owoce', 'Warzywa'];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(101, 186, 105, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        ' rgba(101, 186, 105, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "white",
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: "white",
        }
      }]
    }
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
