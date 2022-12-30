import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular14';

  displayedColumns: string[] = ['productName', 'category','date','freshness', 'price', 'Comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private api: ApiService) {}
  ngOnInit(): void {
   this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'45%'
    // const dialogRef = this.dialog.open(DialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:(Error)=>{
        alert("Error While Fetching the Records!!")
      }
    })
  }
  
editProduct(row : any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
    
    
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllProducts();
    }
  })
}
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res:number)=>{
        alert("product Deleted Successfully")
      },
      error:()=>{
        alert("Error while deleting the")
      }
      
    })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
