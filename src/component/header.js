import React, { useEffect } from 'react'
import "./style.css"
const Header = () => {
    function getdata(){
        const localdata=localStorage.getItem("todolist");
        if(localdata){
            return JSON.parse(localdata);
        }
        else{
            return [];
        }
    }
    const [inputdata,setInputdata]=React.useState("");
    const [item,setItem]=React.useState(getdata());
    const [togglebutton,setTogglebutton]=React.useState(false);
    const [updatedItem,setUpdateItem]=React.useState();
    function additem(){
        if(!inputdata){
            alert('first enter the data');
        }
        else if(inputdata&&togglebutton===true){
         
          setItem(item.map((current)=>{
            if(current.id===updatedItem){
                return {...current,name:inputdata}
            }
            return current;
          }))
          setInputdata("");
          setTogglebutton(false);
          setUpdateItem();
          

        }
        else{
            // we give object in item
            const obj={
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItem([...item,obj]);
            setInputdata("");
        }
    }


    function deleteItem(elemId){
     const newitems=item.filter((current)=>{
        return elemId!==current.id;
     })
     setItem(newitems);
    }

    function editItem(elemid){
const data=item.find((cur)=>{
   return cur.id===elemid;

})

setInputdata(data.name);
setTogglebutton(true);
setUpdateItem(elemid);

    }

    useEffect(()=>{
    localStorage.setItem("todolist",JSON.stringify(item));
    },[item])
  return (
    <>
    <div id="first-div">
<div className='figure-container'>
<img src='https://play-lh.googleusercontent.com/vSNQds6F5roxdN4-a16JnQ9dWQVSZZ8OH4-iMAcNLaFQd3ItZWU8rOPOql4Ew5Hh1esX' alt=''>

</img>

<figcaption>Type Your Notes</figcaption>

</div>

<div className='input-div'>
    <input placeholder='📝 write your notes'
    value={inputdata}
    onChange={(event)=>{
        setInputdata(event.target.value)
    }}
    ></input>
 
 <span className='left margin-right'>
    {togglebutton?(<i class="fa-solid fa-pen-to-square green" onClick={additem}></i>):
    (<i class="fa-solid fa-plus green" onClick={additem}></i>)}
 
 </span>
</div>

<div  className='list-item'>
   {item.map((elem)=>{
    return(
        <div className='item'>
        <span className='content text-center'>
            {elem.name}
        </span>
        <span className='left span-padding'>
        <i class="fa-solid fa-pen-to-square green" onClick={()=>{editItem(elem.id)}}></i>
        </span>

        <span className='left margin-right span-padding'>
        <i class="fa-solid fa-trash-can-arrow-up red" onClick={()=>{deleteItem(elem.id)}}></i>
        </span>
    </div>
    )
   })}
    
</div>

    </div>


    

    </>
  )
}

export default Header