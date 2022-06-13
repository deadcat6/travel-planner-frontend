import {useState} from "react";

export const PlanView = () => {
  const [plan, setPlan] = useState({
    id: '',
    title: '',
    owner: [],
    days: [],
    planDuration: {
      startDay: '',
      endDay: '',
    },
    note: '',
    //p1
    desc: '',
    tag: [],
    likes: 0,
  });


  return (
    <div>
      plan view page
    </div>
  )
}