import { Component,Inject, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import{MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
  
})
export class DialogComponent implements OnInit {

  freshnessList =["New Brand", "Second hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn : string = "save"

  constructor(private formBuilder : FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private api:ApiService,private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['', Validators.required],
      price: ['',Validators.required],
      Comment: ['',Validators.required],
      date : ['',Validators.required]
    });
    // console.log(this.editData)
    if(this.editData){
      this.actionBtn= "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
      this.productForm.controls['data'].setValue(this.editData.data);
      
    }
  }

  addProduct(){
    if(!this.editData){
      
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the product")
        }
      })
    }
 
    } else{
      this.updateProduct()
    }
   }
   updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
    
   }
}
