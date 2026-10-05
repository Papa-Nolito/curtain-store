import {useAuth} from "../context/AuthContext";

import "../styles/Orders.css";



function Orders(){


const {user}=useAuth();



const orders = JSON.parse(

localStorage.getItem(

`${user.email}_orders`

)

) || [];





return (

<div className="orders">


<h2>

My Orders

</h2>



{

orders.length===0 ?


<p>
No orders yet
</p>


:


orders.map((order,index)=>(


<div 
className="order-card"
key={index}
>


<h3>

Order #{index+1}

</h3>


<p>

Items: {order.items.length}

</p>


<p>

Total: ${order.total}

</p>



</div>


))


}


</div>

);


}



export default Orders;