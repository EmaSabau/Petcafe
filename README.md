# Pet Café  

Pet Café is a web application designed to manage a pet-friendly café that integrates community features with animal adoption services. The system provides customers with a seamless experience for browsing products, reserving tables, exploring adoptable animals, and participating in events and workshops.  


![alt text](<Screenshot 2025-09-29 122817.png>)![alt text](<Screenshot 2025-09-29 123109.png>) ![alt text](<Screenshot 2025-09-29 123052-1.png>)
![alt text](<Screenshot 2025-09-29 123052.png>)

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