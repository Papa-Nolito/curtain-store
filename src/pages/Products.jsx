import {
useProducts
} from "../context/ProductContext";


import ProductCard from "../components/ProductCard";

import ProductSearch from "../components/ProductSearch";


function Products(){


const {

filteredProducts

}=useProducts();



return(

<div>


<ProductSearch/>




<div className="products-grid">


{

filteredProducts.map(product=>(


<ProductCard

key={product.id}

product={product}

/>


))


}


</div>


</div>


);


}



export default Products;