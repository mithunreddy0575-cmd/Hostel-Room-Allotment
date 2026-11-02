# Hostel Room Allotment & Mess Billing Engine

A web version of my Core Java hostel project, built with plain HTML, CSS and JavaScript. No installs needed.

![Website preview](screenshot.png)

**Live demo:** https://mithunreddy0575-cmd.github.io/Hostel-Room-Allotment/

## Features
- Add, search and delete students
- Room allotment with Single, Double and Triple rooms
- One room per student, full rooms are blocked, and boys and girls never share a room
- Record monthly meals and generate a bill
- Bill table for all students with the total to collect
- Print or save any bill as PDF
- Dashboard with live stats

## Bill rule
Bill = (meals × ₹45) + ₹500 fixed mess charge + room rent

Rent per month: Single ₹6000, Double ₹4000, Triple ₹3000.

## Files
- `index.html`: page structure (tabs, forms, tables)
- `style.css`: the look (black background, white text, cobalt blue highlights)
- `script.js`: the logic (allot rooms, record meals, calculate bills)

## Run it locally
Open the folder in VS Code, install the **Live Server** extension, then right-click `index.html` and choose **Open with Live Server**. You can also just double-click `index.html`.

## Note
Data is saved in your own browser (localStorage), so each visitor sees their own data.

## Future ideas
- Warden and student login
- Real database (Firebase / Supabase or Node.js + MySQL)
- Daily meal attendance
