"use client";
import {useState,useEffect} from "react";

type ConsentGateProps = { children?: React.ReactNode; kind?: string };

export default function ConsentGate({children}:ConsentGateProps){
	const [ok,setOk]=useState(false);
	useEffect(()=>{setOk(localStorage.getItem("hm-consent")==="yes")},[]);
	if(!ok){
		return(
			<div className="p-6 border rounded">
				<p className="mb-4">This area is for members. Do you consent to enter?</p>
				<button className="px-3 py-2 bg-black text-white rounded" onClick={()=>{localStorage.setItem("hm-consent","yes");location.reload();}}>Enter</button>
			</div>
		)
	}
	return <>{children}</>
}
