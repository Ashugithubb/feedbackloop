'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../component/navbar";
import AllFeedbackList from "../component/Feedback";
import SearchComponent from "../component/Serach";
import TagSelector from "../component/AddTag";



export default function Home() {
  return (
    <>
    <Navbar/>
    <SearchComponent/>
   <AllFeedbackList/>
   <TagSelector/>
   </>
  );
}
