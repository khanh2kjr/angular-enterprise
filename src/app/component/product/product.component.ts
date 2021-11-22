import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productDetail !: FormGroup
  productObj: Product = new Product()
  productList: Product[] = []
  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProduct()
    this.productDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: ['']
    })
  }

  addProduct() {
    this.productObj.id = this.productDetail.value.id
    this.productObj.name = this.productDetail.value.name
    this.productObj.description = this.productDetail.value.description
    this.productObj.price = this.productDetail.value.price

    this.productService.addProduct(this.productObj)
      .subscribe(res => {
        console.log(res)
        this.getAllProduct()
      }, err => {
        console.log(err)
      })
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(res => {
      this.productList = res
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  getProductDetail(product: Product) {
    this.productDetail.controls['id'].setValue(product.id)
    this.productDetail.controls['name'].setValue(product.name)
    this.productDetail.controls['description'].setValue(product.description)
    this.productDetail.controls['price'].setValue(product.price)
  }

  editProduct() {
    this.productObj.id = this.productDetail.value.id
    this.productObj.name = this.productDetail.value.name
    this.productObj.description = this.productDetail.value.description
    this.productObj.price = this.productDetail.value.price

    this.productService.editProduct(this.productObj)
    .subscribe(res => {
      console.log(res)
      this.getAllProduct()
    }, err => {
      console.log(err)
    })
  }
  btnDeleteClick(product: Product) {
    const isDelete = window.confirm('Ban co chac chan muon xoa san pham nay khong?')
    if (isDelete) {
      this.productService.deleteProduct(product)
    .subscribe(res => {
      console.log(res)
      this.getAllProduct()
    }, err => {
      console.log(err)
    })
    }
  }
}
