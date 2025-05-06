import { updateTotalDays } from "../slices/userRoutineSlice";
import React, { useEffect, useState } from "react";
import { Sparkles, Droplet } from "lucide-react"; // optional icon library
import clsx from "clsx";

const UserRoutine = ({ userID }) => {
    const [dayCheck, setDayCheck] = useState([false, false, false, false, false, false, false]);
    const [streak, setStreak] = useState(0);
    const [weeklyStreakValue,setWeeklyStreakValue] = useState(0)
    const [msg, setMsg] = useState("")
    const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'; 
    
    // Weekdays array
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const weeklyStreak = () => {
        const todayIndex = new Date().getDay();
        for (let index = 0; index < dayCheck.length; index++) {
            if (!dayCheck[index]) {
                setWeeklyStreakValue(index - 1);  // Set value when a false condition is found
                if(index<todayIndex) setMsg("Streak Missed Mid-week 😢");
                else setMsg("")
                return;  // Exit the loop after the first false condition is found
            }
        }
    };

    useEffect(() => {
        if (!userID) return;
    
        const fetchData = async () => {
            try {
                const res = await fetch(`${backendURL}/api/user/streak/${userID}`, {
                    method: 'GET', 
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const data = await res.json();
                setStreak(data.streakCount)
                setDayCheck(data.dayCheck)
                weeklyStreak()
            } catch (error) {
                console.log("Fetch error:", error);
            }
        };
    
        fetchData();
    }, [userID]);

    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-column items-center p-6 rounded-lg bg-yellow-600 text-white font-bold">
            <h1 className="text-6xl">{streak}</h1>
            <p className="text-2xl mb-4">day streak!</p>
        </div>
        <div className="d-flex flex-column w-100">
            <div className="d-flex flex-row justify-content-between px-1">
                {
                    weekdays.map((day, index) => (
                        <span key={index}>{day}</span>
                    ))
                }
            </div>
            <div> 
            <input type="range" min="0" max="6" value={weeklyStreakValue} disabled   className="w-100 mt-2" />
            </div>
        </div>
        <div>
            {
                msg!=="" && (
                    <div>{msg}</div>
                )
            }
        </div>
    </div>
    );
};

export default UserRoutine;
