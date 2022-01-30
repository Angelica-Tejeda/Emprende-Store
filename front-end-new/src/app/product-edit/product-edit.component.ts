import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  categorias: Array<string> = [
    "Comestibles",
    "Aperitivos",
    "Postres",
    "Vegano",
    "Vegetarieno",
    "Sin gluten",
    "Saludable",
    "Comida rápida",
    "Pan y harinas",
    "Pastas",
    "Ensaladas",
    "Bebidas",
    "Lacteos",
    "Artesanias",
    "Otros",
    "Frutas",
    "Vegetales",
    "Mascotas"
  ];
  fotos: Array<string> = ["https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg", "https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg","http://www.asturiasmundial.com/noticias/fotos/119622_1_thumb.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9ZjkYuQ9PBi6MH0NuE5ZcfPG_Iud_YnNHA&usqp=CAU"];
  productForm = new FormGroup({
    tipo: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categorias: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descuento: new FormControl('', Validators.required),
  });
  constructor() { }

  onSubmit() { }

  onChange() {
    /*var option = $("#tipo").val();
    if (option == "true") {
      $(".servicioCats").removeClass("activate");
      $(".productoCats").removeClass("activate");
      $(".servicioCats").addClass("activate");
    } else {
      $(".servicioCats").removeClass("activate");
      $(".productoCats").removeClass("activate");
      $(".productoCats").addClass("activate");
    }*/
  }

  ngOnInit(): void {
  }

  /*drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fotos, event.previousIndex, event.currentIndex);
  }*/
  removePhoto(pos:number){
    
  }
  publicar(){

  }
  subirFoto(){
    
  }
}
