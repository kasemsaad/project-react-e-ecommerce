// import { render } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

function AppFunction(){
    const[name,setName] = useState("kasem");
    const[info,infodata] = useState("kasem");

useEffect(()=>{
console.log("did mount");
},[])

useEffect(()=>{
    console.log("did mount update");
    },[name])

return(
<>
<h1>name:{name}</h1>  
<h1>{info.name}</h1>  
{/* {info.isAdmin && <button className="" onClick={}>change </button>
} */}
</>    
); 
    

}
export default AppFunction;