**Prerequisites**:
1. Code editor (VS Code)
2. MongoDB compass

**How to run this project**:
1. clone this repository to the local environment
2. Install npm using ```npm init```
3. Run ```npm start``` in the main directory to start the frontend.
4. Open another terminal and move to the server directory using ```cd server```
5. Run ```npm start``` or ```node server.js``` in the server directory to start the back-end.

**Approach**:

-> Built a library called ```useTracking```as a hook.
-> Imported the library hook in the react application with just 2 pages (Home, About) as a demo.
-> Click events are stored in the MongoDB database
-> Displayed user interactions on the dashboard page along with maximum time page

**Database:**

![image](https://github.com/vaishnavikrottapalli/ramco-assignment-tracking-app/assets/74494413/00f2cd9c-8ef3-44c4-adde-7d5ae48fa04a)


**Output**:

Bar Chart that shows number of click events that occurred on the pages `Home` and `About`:

![image](https://github.com/vaishnavikrottapalli/ramco-assignment-tracking-app/assets/74494413/5e552428-6919-4f8d-ab51-afeb2f342ed2)

![image](https://github.com/vaishnavikrottapalli/ramco-assignment-tracking-app/assets/74494413/4acd85da-ddf0-48f6-ba13-279b358d9a04)


Maximum time spent on page:

![image](https://github.com/vaishnavikrottapalli/ramco-assignment-tracking-app/assets/74494413/f7e57578-b5c7-4892-bf96-b82101343129)


**Sequence Diagram:
**
![image](https://github.com/vaishnavikrottapalli/ramco-assignment-tracking-app/assets/74494413/b90f7103-2f8b-4f48-8f06-1163dc0b9df1)




