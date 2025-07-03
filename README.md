🗓 Timetable Management System – Step-by-Step Setup
✅ Step 1: Backend Setup (.NET Core in Visual Studio 2022)


🔧 Prerequisites
       Visual Studio 2022

    ▶ How to Run

       1. Open Visual Studio 2022.

       2. Open the file: Timetablegenerator.sln.

       3. Open appsettings.json and update the database connection string:

     appsetting.json file in the backend folder
 
    "ConnectionStrings": {
           "DefaultConnection": "Host=localhost;Port=5432;Database=timetablegenerator;Username=postgres;Password=your_Db password"
        }



                              Press F5 or click the ▶ Run button.

                              Swagger UI will open automatically at:

                                                        https://localhost:7244/swagger

🗃 Step 2: PostgreSQL Setup (via pgAdmin)
 📝 Instructions
        Open pgAdmin.

                Connect to your PostgreSQL server.

               Create a new database named:
                                           
                               1. Edit : timetablegenerator
 
                               2. Open the file pgdbquery.txt in the backend folder.

                               3. Paste its contents into the Query Tool in pgAdmin.

                               4. Click the ⚡ Execute button.

              ✅ This will create all necessary tables and insert the default user data.



🌐 Step 3: Frontend Setup (React + Vite)
🔧 Prerequisites
             npm

               ▶ How to Run


                     1. Open terminal or command prompt.

                     2. Navigate to the frontend folder:

                                                  cd TimeTable1

                                                   npm install

                                                   npm run dev

                                                  http://localhost:5173

🔐 Step 4: Default Login Credentials

Role     	Username	Password
Admin	        ADMIN	        admin@123
CSE     	CSE	        cse123