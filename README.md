# Pet Café  

Pet Café is a web application designed to manage a pet-friendly café that integrates community features with animal adoption services. The system provides customers with a seamless experience for browsing products, reserving tables, exploring adoptable animals, and participating in events and workshops.  
<img width="1916" height="913" alt="Screenshot 2025-09-29 122817" src="https://github.com/user-attachments/assets/b5ff0926-9bc5-4f68-82b9-420be9d86d91" />
<img width="1904" height="959" alt="Screenshot 2025-09-29 123052" src="https://github.com/user-attachments/assets/c760f5cc-354e-4cd8-9514-f8b6a1898d8d" />
<img width="1787" height="982" alt="Screenshot 2025-09-29 123015" src="https://github.com/user-attachments/assets/d286d705-9453-4c37-bce4-763cffde4e73" />
<img width="1611" height="942" alt="Screenshot 2025-09-29 123109" src="https://github.com/user-attachments/assets/0fd87521-b559-4826-9dba-99af018f755c" />

## Features  
- **Product Management**: View a list of café products with details (name, type, price, image).  
- **Animal Adoption**: Browse adoptable animals and submit adoption requests.  
- **Reservations**: Reserve tables by selecting date, time, and table.  
- **Role-Based Access Control**: Different permissions for administrators and customers.  
- **Pet-match**: It matches a pet for adoption based on the user's preferences.

## Technical Details  
- **Backend**: Spring Boot  
- **Frontend**: Thymeleaf + React (npm start)  
- **UI/Styling**: Bootstrap for a responsive and user-friendly interface  
- **Design Patterns**: Observer pattern used for adoption request notifications  
- **Database**: JPA with repositories for persistence  
- **Testing**: Unit tests for service-layer methods  

## Non-Functional Requirements  
- **Performance**: Product and animal lists load within 2 seconds for standard datasets.  
- **Scalability**: Supports large datasets without performance degradation.  
- **Security**: Role-based access to protect against unauthorized modifications.  

## Future Improvements  
- Donations module to support the café’s mission.  
- Reviews and ratings for adoptable animals.  
- Real-time notifications for events and adoptions.  

## Getting Started  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/username/pet-cafe.git
   cd pet-cafe
   ```  

2. **Run the backend (Spring Boot)**  
   - Open the `backend` folder in your IDE (IntelliJ / Eclipse).  
   - Build and run the Spring Boot application.  
   - By default, it will be available at: `http://localhost:8080/`  

3. **Run the frontend**  
   ```bash
   cd frontend
   npm install
   npm start
   ```  

4. **Access the application**  
   - Frontend: [http://localhost:3000/](http://localhost:3000/)  
   - Backend API: [http://localhost:8080/](http://localhost:8080/)  

## License  
This project was developed as part of an academic assignment and is intended for educational purposes.
