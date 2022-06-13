import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";

export const SearchBar = (props) => {


  const onChangeHandler = () => {
    props.setPlace(...props.place, {
      title: "changed by search bar component",
    });
  }

  return (
    <div>

    </div>
  );
}