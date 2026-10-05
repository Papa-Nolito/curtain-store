import {useProducts} from "../context/ProductContext";

import "../styles/ProductSearch.css";



function ProductSearch(){


const {

search,

setSearch,

category,

setCategory

}=useProducts();




return(

<div className="search-box">


<input

type="text"

placeholder="Search curtains..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>




<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

>


<option>
All
</option>


<option>
Luxury
</option>


<option>
Modern
</option>


<option>
Classic
</option>


</select>


</div>


);


}



export default ProductSearch;