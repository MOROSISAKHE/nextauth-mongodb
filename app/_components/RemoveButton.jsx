'use client';
import React from 'react';
import { ImBin } from "react-icons/im";
import  {useRouter}  from 'next/navigation';
export default function RemoveButton({ticketID, isBtnDisabled}) { 
  const removeTicket = async () => {
   const confirmation = confirm("Are you sure you want to delete this ticket?");
   if(confirmation){
    const deleteResponse = await fetch(`http://localhost:3000/api/ticketCrud?id=${ticketID}`,{
      method: "DELETE",
    });
    if(deleteResponse.status==201){
      window.location.reload();
    }
   }
  }
  
  return (
    <div className='mt-3'>
      <button disabled={isBtnDisabled} data-tooltip-target="tooltip-animation" className={`rounded-lg bg-red-400 p-2 hover:bg-red-600 ${isBtnDisabled? 'cursor-not-allowed':'hover:bg-red-600'}`} onClick={removeTicket}><ImBin /></button> 
    </div>
  )
}
