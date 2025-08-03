import { useState, useEffect } from "react";
import './Calendar.css';

/**
 * Calendar Component
 *
 * A customizable calendar popover or inline element used for selecting dates.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.active=false] - Determines whether the calendar is visible or not.
 * @param {Function|null} [props.onCancel=null] - Optional callback function triggered when the calendar is canceled.
 * @param {Function|null} [props.onSelect=null] - Optional callback function triggered when a date is selected. Receives the selected date as an argument.
 * @param {Date|null} [props.initialDate=null] - Optional initial date to set the calendar to.
 *
 * @returns {JSX.Element} The rendered calendar component.
 */
export default function Calendar({ active = false, initialDate = null, onCancel = null, onSelect = null }) {

  const currentDate = new Date();
  const YEARS= 15;

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(1970, 0, 4 + i); // Jan 4, 1970 is a Sunday
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).toUpperCase();
  });

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  });
  
  const [isActive, setIsActive] = useState(false);
  const [month, setMonth] =  useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [calendar, setCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState({ date:0, month, year });
  const [startYear, setStartYear] = useState(year - Math.floor(YEARS / 2));

  const initialize =()=>{
    if (initialDate) {
      setMonth(initialDate.month? initialDate.month : month);
      setYear(initialDate.year? initialDate.year : year);
      const date = initialDate.date? initialDate.date : 0;
      setSelectedDate({ date, month, year });     
    }  
  }

  useEffect(() => {
    setIsActive(active);
    initialize();   
  }, [active, initialDate]);
 

  const select =()=>{
    if(onSelect){
      onSelect(selectedDate.date ? selectedDate : null);
    }
    cancel(); 
  }

  const cancel = () => {
    setIsActive(false);
    if (onCancel) {
      onCancel(false);
    }
    initialize();
  }

  const nextMonth = () => {   
    const m = (month + 1) % 12;
    setMonth(m);

    if(m == 0){
      setYear(year + 1);
    } 
  }
  
  const prevMonth = () => {  
    const m = month - 1;
    setMonth(m >= 0 ? m : 11);

    if(m < 0){
      setYear(year - 1);
    }
  }

  const nextYear = () => {   
    setStartYear(startYear + YEARS);
  }
  
  const prevYear = () => {  
    setStartYear(startYear - YEARS);
  }

  const selectYear = ()=>{
    setSelectedDate({ date: 0, month , year})
    setCalendar(true);
  }

  const generateYears = () => {    
     
    let years = [];

    for(let i = 0; i < YEARS; i++){
      if(i % 3 == 0)
        years.push([]);      

      years[years.length - 1].push(startYear + i);
    }

    return (
      <table className="years-table">
        <tbody>
          {years.map((row, indRow) => {
            return (
              <tr key={indRow}>
                {row.map((y, ind) => {

                  if(year == y){
                    return <td key={ind}><a className="is-selected" onClick={()=>setYear(selectedDate.year)}>{y}</a></td>
                  }

                  return <td key={ind}><a onClick={()=>setYear(y)}>{y}</a></td>

                })}
              </tr>
            );   
          })}
        </tbody>
      </table>
    );
  }

  const generateCalendar = () => {

    let daysByMonth = new Date(year, month + 1, 0).getDate();
    let previousMonthDays = new Date(year, month, 0).getDate();

    let days = [];
    const firstDayOfMonth = new Date(year, month, 1);

    for (let i = 1; i <= daysByMonth; i++)
      days.push(i);    

    for (let i = 0; i < firstDayOfMonth.getDay(); i++)
      days.unshift(previousMonthDays--);

    let i = 1;
    while (days.length % 7 != 0)
        days.push(i++);

    let weeks = [];
    days.forEach((d, index) => {
        if (index % 7 == 0)
            weeks.push([]);

        weeks[weeks.length - 1].push(d);
    });

    return (
      <table className="dates-table">
        <thead>
          <tr>
          {daysOfWeek.map((d, ind) => {return <th key={ind}>{d}</th>;})}
          </tr> 
        </thead>
        <tbody>
          {weeks.map((week, indWeek) => {
            return (
              <tr key={indWeek}>
                {week.map((date, ind) => {                  

                  if((indWeek == 0 && date > 7)||(date < 8 && indWeek == weeks.length-1)){
                    return <td key={ind}><span>{date}</span></td>
                  }

                  if(date == selectedDate.date && month == selectedDate.month && year == selectedDate.year){
                    return <td key={ind}><a className="is-selected" onClick={()=>setSelectedDate({})}>{date}</a></td>
                  }                 

                  return <td key={ind}><a onClick={()=>setSelectedDate({ date, month, year })}>{date}</a></td>

                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } 

  return (
    <div className={`calendar-component ${isActive ? "is-active" : ""}`}>
      <div className="calendar-component-header">
        {calendar && (
          <a onClick={() => setCalendar(false)}>
            Year<i className="fa-solid fa-calendar-days"></i>
          </a>
        )}
        <p>{`${months[month]} ${selectedDate.year}`}</p>
      </div>
      <div className="calendar-component-container">
        <ul>
          <li>
            <a onClick={() => (calendar ? prevMonth() : prevYear())}>
              <i className="fa-solid fa-angle-left"></i>
            </a>
          </li>
          <li>
            <a onClick={() => (calendar ? nextMonth() : nextYear())}>
              <i className="fa-solid fa-angle-right"></i>
            </a>
          </li>
        </ul>
        {calendar ? generateCalendar() : generateYears()}
      </div>
      <div className="calendar-component-footer">
        <a onClick={() => (calendar ? cancel() : setCalendar(true))}>Cancel</a>
        <a onClick={()=>(calendar?select(): selectYear())}>Ok</a>
      </div>
    </div>
  );
}
