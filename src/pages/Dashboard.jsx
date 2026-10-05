import {useAuth} from "../context/AuthContext";


import {Link} from "react-router-dom";

import "../styles/Dashboard.css";



function Dashboard(){


const {user}=useAuth();

const {cart}=useCart();



return (

<div className="dashboard">


<h2>

Welcome {user.name}

</h2>



<div className="dashboard-cards">


<div className="dashboard-card">


<h3>
Cart Items
</h3>


<p>
{cart.length}
</p>


<Link to="/cart">

View Cart

</Link>


</div>





<div className="dashboard-card">


<h3>
Orders
</h3>


<Link to="/orders">

Order History

</Link>


</div>



</div>


</div>


);


}


export default Dashboard;