import React from "react";
import { MyNotes } from "./MyNotes";

export function HomePage({title}) {

  return (
    <>
      <MyNotes title={title}/>
    </>
  )
}