'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useAppSelector } from "./redux/hook/hook";
import AllFeedbackList from "./component/Feedback";
import Navbar from "./component/navbar";

export default function Home() {

  return (
    <>
    <Navbar/>
   <AllFeedbackList/>
   </>
  );
}
