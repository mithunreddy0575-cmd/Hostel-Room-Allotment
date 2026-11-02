# 🏠 Hostel Room Allotment & Mess Billing Engine

A web-based hostel management system designed to simplify student registration, room allocation, room occupancy tracking and monthly mess billing.

🌐 **Live Demo:** [Open Hostel Management System](https://mithunreddy0575-cmd.github.io/Hostel-Room-Allotment/)

---

## 📌 Project Overview

The Hostel Room Allotment & Mess Billing Engine is a simple web application built using HTML, CSS and JavaScript.

It helps hostel administrators manage student details, allocate rooms based on availability and gender restrictions, record monthly meal counts and automatically calculate hostel bills.

## ✨ Features

* 👨‍🎓 Add, search and delete student records.
* 🏠 Allocate Single, Double and Triple-sharing rooms.
* 🚻 Separate room allocation for boys and girls.
* 🛏️ Track room occupancy and available beds.
* 🍽️ Record monthly meals for students.
* 💰 Automatically calculate mess charges and room rent.
* 🧾 Generate individual student bills.
* 📊 View total monthly billing information.
* 📄 Print bills or save them as PDF.
* 📱 Responsive interface for different screen sizes.

## 🛠️ Technologies Used

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| HTML5        | Website structure             |
| CSS3         | Styling and responsive design |
| JavaScript   | Application logic             |
| LocalStorage | Browser-based data storage    |
| GitHub Pages | Website hosting               |

## 💵 Billing Calculation

The monthly bill is calculated using:

**Total Bill = (Meals × ₹45) + ₹500 + Room Rent**

### Monthly Room Rent

| Room Type      | Monthly Rent |
| -------------- | -----------: |
| Single Sharing |       ₹6,000 |
| Double Sharing |       ₹4,000 |
| Triple Sharing |       ₹3,000 |

The fixed mess charge is ₹500 per month.

## 📂 Project Structure

```text
Hostel-Room-Allotment/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run Locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in your browser.
4. Alternatively, use the Live Server extension in VS Code.

No additional installation is required.

## 💾 Data Storage

The application uses browser LocalStorage to save student information, room allocation and meal records.

**Note:** Data is stored locally in the browser and is not shared between different users or devices.

## 🔮 Future Improvements

* Admin and student login system.
* Database integration using Firebase or MySQL.
* Student attendance management.
* Online payment integration.
* Monthly financial reports.
* Hostel complaint management.

## 👨‍💻 Developer

**Mithun Reddy**

Project: Hostel Room Allotment & Mess Billing Engine

GitHub: [View Source Code](https://github.com/mithunreddy0575-cmd/Hostel-Room-Allotment)

